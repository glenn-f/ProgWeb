(function () {
  // Configuração Inicial //
  const initVidas = 5;
  const initValorFPS = 1;
  const initValorCrescFPS = 0.2;
  const initTempoParaDevastar = 2000;
  const initIntervCrescFPS = 60000;
  // Constantes Globais //
  const arvoreDimensions = [100, 54];
  const reservaDimensions = [1243, 960];
  const lagosArea = [ [690,0,1062,186],
                    [60,566,211,776] ];
  const dadosIncendio = {
    fogo:    {     classe: "fogo", dimensaoX: 100, dimensaoY: 130, offsetX: -12, offsetY: 25,
                tamanhoDevastacao: 130, arvores: 1, minSeg: 1,maxSeg: 4},
    caveira: {  classe: "caveira", dimensaoX: 120, dimensaoY: 136, offsetX: -40, offsetY: -20,
                tamanhoDevastacao: 200, arvores: 2, minSeg: 5, maxSeg: 20},
  }
  // Objetos Globais //
  let focos = [];
  let arvores = [];
  let placar;
  let screenMessage;
  // Variáveis Globais //
  let msgBool = true, paused = true;
  let FPS, initFPS, vidas, aumentoFPS, FPSLoopInterval, tempoDevastar;
  let caveiraLoopID, fogoLoopID, FPSLoopID, msgLoopID;
  let pauseTime, FPSTime;

  class Arvore {
    constructor(pos) {
      this.element = document.createElement("div");
      this.element.className = "arvore";
      this.element.style.left = `${pos * arvoreDimensions[0]}px`;
      document.body.appendChild(this.element);
    }
  }

  class Placar {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "placar";
      this.pontos = 0;
      this.element.innerHTML = "00000";
      document.body.appendChild(this.element);
    }
    pontuar(qntd) {
      this.pontos += qntd;
      this.element.innerHTML = ("00000" + this.pontos).slice(-5);
    }
    zerar () {
      this.pontos = 0;
      this.element.innerHTML = "00000";
    }
  }

  class Reserva {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "reserva";
      this.element.style.top = `${arvoreDimensions[1]+3}px`;
      document.body.appendChild(this.element);
    }
  }

  class TextoNaTela {
    constructor (text) {
      this.element = document.createElement("div");
      this.element.className = "texto";
      if (text !== undefined) this.element.innerHTML = text;
      document.body.appendChild(this.element);
    }
    looper (bool) {
      return setInterval(() => {
        if (bool) {
          this.element.className = "texto";
        } else {
          this.element.className = "texto toggle";
        }
        bool = !bool;
      }, 1000);
    }
    write (text) {
      this.element.innerHTML = text;
    }
  }

  class Incendio {
    constructor (tipo) {
      this.element = document.createElement("div");
      this.tipo = tipo;
      this.element.className = dadosIncendio[tipo].classe;
      do {
        this.x = Math.floor((Math.random() * (reservaDimensions[0]-dadosIncendio[tipo].dimensaoX)));
        this.y = Math.floor((Math.random() * (reservaDimensions[1]-dadosIncendio[tipo].dimensaoY)));
      } while (estaNoLago(this.x, this.y, dadosIncendio[tipo].dimensaoX, dadosIncendio[tipo].dimensaoY));
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y+arvoreDimensions[1]}px`;
      this.arvores = dadosIncendio[tipo].arvores;
      this.arrayIndex = focos.length;
      this.tempoDevastar = tempoDevastar/FPS;
      this.ms = (new Date).getTime();
      this.element.onclick = (() => {
        if (!paused) {
          placar.pontuar(10);
          document.body.removeChild(this.element);
          clearTimeout(this.timeout);
          delete focos[this.arrayIndex];
        }
      }).bind(this);
      this.devastar = (() => {
        if (!paused) {
          document.body.removeChild(this.element);
          new Devastacao(this.x, this.y, dadosIncendio[this.tipo].tamanhoDevastacao, dadosIncendio[this.tipo].offsetX, dadosIncendio[this.tipo].offsetY);
          delete focos[this.arrayIndex];
        }
        if (arvores.length > this.arvores) {
          for (let i = 0; i < this.arvores; i++) document.body.removeChild(arvores.pop().element);
        } else {
          while (arvores.length > 0) document.body.removeChild(arvores.pop().element);
          if (!paused) GameOver();
        }
      }).bind(this);
      this.timeout = setTimeout(this.devastar, this.tempoDevastar);
      focos.push(this);
      document.body.appendChild(this.element);
    }
    restartTimer () {
      this.tempoDevastar -= this.ms;
      this.timeout = setTimeout(this.devastar, Math.max(this.tempoDevastar, tempoDevastar/(4*FPS)));
      this.ms = (new Date).getTime();
    }
  }

  class Devastacao {
    constructor (x, y, tamanho, offsetX, offsetY) {
      this.element = document.createElement("div");
      this.element.className = "devastacao";
      this.element.style.width = `${tamanho}px`;
      this.element.style.height = `${tamanho}px`;
      this.element.style.left = `${x+offsetX}px`;
      this.element.style.top = `${y+offsetY+arvoreDimensions[1]}px`;
      document.body.appendChild(this.element);
    }
  }

  function estaNoLago(x, y, itemX, itemY) {
    for (let i = 0; i < lagosArea.length; i++) {
      const lago = lagosArea[i];
      if (x >= lago[0]-itemX && x <= lago[2] && y >= lago[1]-itemY && y <= lago[3]) {
        return true;
      }
    }
    return false;
  }

  function startHandler(e) {
    if (e.key === 's' || e.key === 'S') {
      GameStart();
    }
  }

  function restartHandler(e) {
    if (e.key === 's' || e.key === 'S') {
      resetGlobals()
      initConfig();
      GameStart();
    }
  }

  function pauseHandler(e) {
    if (e.key === 'p' || e.key === 'P') {
      if (paused) {
        UnPauseGame();
      } else {
        PauseGame();
      }
      paused = !paused;
    }
  }

  function initConfig() {
    for (let i = 0; i < vidas; i++) arvores.push(new Arvore (i));
    placar = new Placar;
    reserva = new Reserva;
    screenMessage = new TextoNaTela;
  }

  function resetGlobals() {
    msgBool = true;
    FPS = initFPS;
    focos.length = 0;
    arvores.length = 0;
    document.body.innerHTML = "";
  }

  function init() {
    vidas = initVidas;
    tempoDevastar = initTempoParaDevastar;
    FPS = initValorFPS;
    initFPS = initValorFPS;
    aumentoFPS = initValorCrescFPS;
    FPSLoopInterval = initIntervCrescFPS;
    initConfig();
    window.addEventListener("keydown", startHandler);
    screenMessage.write("Pressione <span>S</span> para começar o jogo!!");
    msgLoopID = screenMessage.looper(msgBool);
  }

  function GameStart() {
    paused = false;
    screenMessage.write("");
    clearInterval(msgLoopID);
    incendioLoop("caveira", updateCaveira);
    incendioLoop("fogo", updateFogo);
    FPSLoop(false, 0);
    window.removeEventListener("keydown", startHandler);
    window.removeEventListener("keydown", restartHandler);
    window.addEventListener("keydown", pauseHandler);
  }

  function GameOver() {
    paused = true;
    clearTimeout(caveiraLoopID);
    clearTimeout(fogoLoopID);
    clearTimeout(FPSLoopID);
    window.addEventListener("keydown", restartHandler);
    window.removeEventListener("keydown", pauseHandler);
    screenMessage.write("Game Over! :(<br>Pressione <span>S</span> para recomeçar o jogo!");
    msgLoopID = screenMessage.looper(msgBool);
  }

  function PauseGame() {
    pauseTime = (new Date).getTime();
    focos.forEach((e) => {
        if (e !== undefined) {
          e.ms = pauseTime - e.ms;
          clearTimeout(e.timeout);
        }
      });
    clearTimeout(caveiraLoopID);
    clearTimeout(fogoLoopID);
    clearTimeout(FPSLoopID);
    FPSTime = FPSLoopInterval - Math.max((pauseTime - FPSTime),0);
    screenMessage.write("Jogo Pausado!<br>Pressione <span>P</span> para despausar!");
    msgLoopID = screenMessage.looper(msgBool);
  }

  function UnPauseGame() {
    clearInterval(msgLoopID);
    screenMessage.write("");
    focos.forEach((e) => {
      if (e !== undefined) {
        e.restartTimer();
      }
    });
    incendioLoop("caveira", updateCaveira);
    incendioLoop("fogo", updateFogo);
    FPSLoop(true, FPSTime);
  }

  function FPSLoop(boolPause, valor) {
    if (!boolPause) {
      valor = FPSLoopInterval;
    }
    FPSLoopID = setTimeout(() => {
      FPS += aumentoFPS;
      FPSLoop(false, 0);
    }, valor);
    FPSTime = (new Date).getTime();
  }

  function incendioLoop(tipo, update) {
    let qntdValores = dadosIncendio[tipo].maxSeg - dadosIncendio[tipo].minSeg;
    let valorMinimo = dadosIncendio[tipo].minSeg;
    let tempoMS = (Math.floor(Math.random() * qntdValores) + valorMinimo) * 1000 / FPS;
    let loopID = setTimeout(() => {
      new Incendio(tipo);
      incendioLoop(tipo, update);
    }, tempoMS);
    update(loopID);
  }

  function updateFogo(loopID) {
    fogoLoopID = loopID;
  }

  function updateCaveira(loopID) {
    caveiraLoopID = loopID;
  }

  init();

})();
