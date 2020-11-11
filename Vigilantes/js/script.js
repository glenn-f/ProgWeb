(function () {

  const FPS = 1; 
  let gameDimensions = [1243, 960];
  let focoDimensions = [100, 130];
  let probFoco = 25;
  let reserva;
  let focos = [];
  let gameLoop;

  function init() {
    reserva = new Reserva();
    gameLoop = setInterval(run, 1000/FPS);
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === 'o') {
      clearInterval(gameLoop);
    }
  })

  class Reserva {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "reserva";
      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.style.height = `${gameDimensions[1]}px`;
      document.body.appendChild(this.element);
    }
  }

  class FocoIncendio {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "foco-incendio";
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;
      this.element.style.left = `${Math.floor((Math.random() * (gameDimensions[0]-focoDimensions[0])))}px`;
      this.element.style.top = `${Math.floor((Math.random() * (gameDimensions[1]-focoDimensions[1])))}px`;
      reserva.element.appendChild(this.element);
    }
  }

  function run () {
    if (Math.random() * 100 < probFoco) {
      let foco = new FocoIncendio();
      focos.push(foco);
    }
  }

  init();
})();
