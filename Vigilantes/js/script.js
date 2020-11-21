(function () {

  const FPS = 1; 
  let arvoreDimensions = [100, 54];
  let gameDimensions = [1243, 960];
  let focoDimensions = [100, 130];
  let focoAjustado = [90, 130];
  let caveiraDimensions = [120, 136];
  let lagoPos = [
    [690,0,1062,186],
    [60,566,211,776],
  ];
  let focos = [];
  let caveiras = [];
  let arvores = [];
  let caveiraLoopID;
  let focoLoopID;
  let vidas = 5;
  let reserva;
  let placar;
  let screenMessage;
  let paused;
  let pauseTime;

  class Placar {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "placar";
      this.pontos = 0;
      this.element.innerHTML = ("00000" + this.pontos).slice(-5);
      document.body.appendChild(this.element);
    }
    pontuar (qntd) {
      this.pontos += qntd;
      this.element.innerHTML = ("00000" + this.pontos).slice(-5);
    }
    zerar () {
      this.pontos = 0;
    }
  }

  class Reserva {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "reserva";
      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.style.height = `${gameDimensions[1]}px`;
      this.element.style.top = `${arvoreDimensions[1]+3}px`;
      document.body.appendChild(this.element);
    }
  }

  class Arvore {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "arvore";
      this.element.style.width = `${arvoreDimensions[0]}px`;
      this.element.style.height = `${arvoreDimensions[1]}px`;
      this.element.style.left = `${arvores.length * arvoreDimensions[0]}px`;
      this.element.style.top = "0px";
      document.body.appendChild(this.element);
      arvores.push(this.element);
    }
  }

  class FocoIncendio {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "foco-incendio";
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;
      do {
        this.x = Math.floor((Math.random() * (gameDimensions[0]-focoAjustado[0])));
        this.y = Math.floor((Math.random() * (gameDimensions[1]-focoAjustado[1])));
      } while (estaNoLago(this.x, this.y, focoAjustado));
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y+arvoreDimensions[1]}px`;
      this.arrayIndex = focos.length;
      this.fps = 2000/FPS;
      this.ms = (new Date).getTime();
      this.element.onclick = (() => {
        if (!paused) {
          placar.pontuar(10);
          document.body.removeChild(this.element);
          clearTimeout(this.timeout);
          delete focos[this.arrayIndex];
        }
      }).bind(this);
      this.timeout = setTimeout(() => {
        if (arvores.length > 1) {
          document.body.removeChild(arvores.pop());
          document.body.removeChild(this.element);
          new Devastacao(this.x, this.y, 130, -12, 25);
          delete focos[this.arrayIndex];
        } else {
          if (arvores.length > 0) {
            document.body.removeChild(arvores.pop());
            document.body.removeChild(this.element);
            new Devastacao(this.x, this.y, 130, -12, 25);
            delete focos[this.arrayIndex];
          }
          GameOver();
        }
      }, this.fps);
      focos.push(this);
      document.body.appendChild(this.element);
    }
    restartTimer () {
      this.fps -= this.ms;
      this.timeout = setTimeout(() => {
        if (arvores.length > 1) {
          document.body.removeChild(arvores.pop());
          document.body.removeChild(this.element);
          new Devastacao(this.x, this.y, 130, -12, 25);
          delete focos[this.arrayIndex];
        } else {
          if (arvores.length > 0) {
            document.body.removeChild(arvores.pop());
            document.body.removeChild(this.element);
            new Devastacao(this.x, this.y, 130, -12, 25);
            delete focos[this.arrayIndex];
          }
          GameOver();
        }
      }, Math.max(this.fps, 2000/(4*FPS)));
      this.ms = (new Date).getTime();
    }
  }

  class Caveira {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "caveira";
      this.element.style.width = `${caveiraDimensions[0]}px`;
      this.element.style.height = `${caveiraDimensions[1]}px`;
      do {
        this.x = Math.floor((Math.random() * (gameDimensions[0]-caveiraDimensions[0])));
        this.y = Math.floor((Math.random() * (gameDimensions[1]-caveiraDimensions[1])));
      } while (estaNoLago(this.x, this.y, caveiraDimensions));
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y+arvoreDimensions[1]}px`;
      this.arrayIndex = caveiras.length;
      this.ms = (new Date).getTime();
      this.fps = 2000/FPS;
      this.timeout = setTimeout(() => {
        if (arvores.length > 2) {
          document.body.removeChild(arvores.pop());
          document.body.removeChild(arvores.pop());
          document.body.removeChild(this.element);
          new Devastacao(this.x, this.y, 200, -40, -20);
          delete caveiras[this.arrayIndex];
        } else {
          if (arvores.length > 0) {
            document.body.removeChild(arvores.pop());
            document.body.removeChild(this.element);
            new Devastacao(this.x, this.y, 200, -40, -20);
            delete caveiras[this.arrayIndex];
          }
          if (arvores.length > 0) document.body.removeChild(arvores.pop());
          GameOver();
        }
      }, this.fps);
      this.element.onclick = (() => {
        if (!paused) {
          placar.pontuar(20);
          document.body.removeChild(this.element);
          clearTimeout(this.timeout);
          delete caveiras[this.arrayIndex];
        }
      }).bind(this);
      caveiras.push(this);
      document.body.appendChild(this.element);
    }
    restartTimer () {
      this.fps -= Number(this.element.getAttribute("name"));
      this.timeout = setTimeout(() => {
        if (arvores.length > 2) {
          document.body.removeChild(arvores.pop());
          document.body.removeChild(arvores.pop());
          document.body.removeChild(this.element);
          new Devastacao(this.x, this.y, 200, -40, -20);
          delete caveiras[this.arrayIndex];
        } else {
          if (arvores.length > 0) {
            document.body.removeChild(arvores.pop());
            document.body.removeChild(this.element);
            new Devastacao(this.x, this.y, 200, -40, -20);
            delete caveiras[this.arrayIndex];
          }
          if (arvores.length > 0) document.body.removeChild(arvores.pop());
          GameOver();
        }
      }, Math.max(this.fps, 2000/(4*FPS)));
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

  function startHandler(e) {
    if (e.key === 's' || e.key === 'S') {
      GameStart();
    }
  }

  function restartHandler(e) {
    if (e.key === 's' || e.key === 'S') {
      focos.length = 0;
      caveiras.length = 0;
      document.body.innerHTML = "";
      document.body.appendChild(screenMessage);
      reserva = new Reserva();
      placar = new Placar();
      for (let index = 0; index < vidas; index++) new Arvore();
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

  function init() {
    for (let index = 0; index < vidas; index++) new Arvore();
    reserva = new Reserva();
    placar = new Placar();
    screenMessage = document.createElement("div");
    screenMessage.className = "texto";
    screenMessage.innerHTML = "Pressione <span>S</span> para começar o jogo!!";
    document.body.appendChild(screenMessage);
    window.addEventListener("keydown", startHandler);
  }

  function GameStart() {
    screenMessage.innerHTML = "";
    placar.zerar();
    FocoLoop();
    CaveiraLoop();
    window.removeEventListener("keydown", startHandler);
    window.removeEventListener("keydown", restartHandler);
    window.addEventListener("keydown", pauseHandler);
    paused = false;
  }

  function GameOver() {
    clearTimeout(caveiraLoopID);
    clearTimeout(focoLoopID);
    screenMessage.innerHTML = "Game Over! :(<br>Pressione <span>S</span> para recomeçar o jogo!";
    window.addEventListener("keydown", restartHandler);
    window.removeEventListener("keydown", pauseHandler);
    paused = true;
  }

  function PauseGame () {
    pauseTime = (new Date).getTime();
    focos.forEach((e) => {
        if (e != "undefined") {
          e.ms = pauseTime - e.ms;
          clearTimeout(e.timeout);
        }
      });
    caveiras.forEach((e) => {
        if (e != "undefined") {
          e.ms = pauseTime - e.ms;
          clearTimeout(e.timeout);
        }
      });
    clearTimeout(caveiraLoopID);
    clearTimeout(focoLoopID);
    screenMessage.innerHTML = "Jogo Pausado!<br>Pressione <span>P</span> para despausar!";
  }

  function UnPauseGame () {
    focos.forEach((f) => {
        f.restartTimer();
      });
    caveiras.forEach((e) => {
        e.restartTimer();
      });
    FocoLoop();
    CaveiraLoop();
    screenMessage.innerHTML = "";
  }

  function FocoLoop() {
    focoLoopID = setTimeout(() => {
      new FocoIncendio;
      FocoLoop();
    }, Math.ceil(Math.random()*4)*1000/FPS);// de 1 a 4 segundos
  }

  function CaveiraLoop() {
    caveiraLoopID = setTimeout(() => {
      new Caveira;
      CaveiraLoop();
    }, (Math.ceil(Math.random()*16)+4)*1000/FPS);// de 5 a 20 segundos
  }

  function estaNoLago(x, y, item) {
    for (let i = 0; i < lagoPos.length; i++) {
      const lago = lagoPos[i];
      if (x >= lago[0]-item[0] && x <= lago[2] && y >= lago[1]-item[1] && y <= lago[3]) {
        return true;
      }
    }
    return false;
  }

  init();
})();
