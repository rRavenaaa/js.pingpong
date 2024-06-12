//bolinha
let xBolinha = 400;
let yBolinha = 300;
let diametro = 30;
let raio = diametro / 2;

//velocity move
let velocidadeXo = 7;
let velocidadeYo = 7;

//raquete
let xRaquete = 10;
let yRaquete = 250;
let RaqueteL = 15;
let RaqueteH = 120;

//oponente
let xOponente = 775;
let yOponente = 250;
let velocidadeYv;
let chanceDeErrar = 0;

//placar
let Me = 0;
let Vs = 0;

//sons
let raquetada;
let ponto;
let trilha;

let colide = false;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  trilha.loop();
  createCanvas(800, 600);
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete();
  colideRaquete(xRaquete, yRaquete);
  mostraRaquete(xOponente, yOponente);
  movimentaOponente();
  colideRaquete(xOponente, yOponente);
  incluiPlacar();
  pontos();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXo;
  yBolinha += velocidadeYo;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXo *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYo *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, RaqueteL, RaqueteH);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
  if (
    xBolinha - raio < xRaquete + RaqueteL &&
    yBolinha - raio < yRaquete + RaqueteH &&
    yBolinha + raio > yRaquete
  ) {
    velocidadeXo *= -1;
    raquetada.play();
  }
}

function colideRaquete(x, y) {
  colide = collideRectCircle(
    x,
    y,
    RaqueteL,
    RaqueteH,
    xBolinha,
    yBolinha,
    raio
  );
  if (colide) {
    velocidadeXo *= -1;
    raquetada.play();
  }
}

function movimentaOponente() {
  velocidadeYv = yBolinha - yOponente - RaqueteL / 2 - 30;
  yOponente += velocidadeYv + chanceDeErrar + 5;
  calculaChanceDeErrar();
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(30);
  fill(color("#ffa500"));
  rect(240, 20, 70, 40);
  fill(255);
  text(Me, 275, 50);
  fill(color("#ffa500"));
  rect(490, 20, 70, 40);
  fill(255);
  text(Vs, 525, 50);
}

function pontos() {
  if (xBolinha > 785) {
    Me += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    Vs += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (Vs >= Me) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 42) {
      chanceDeErrar = 43;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 38) {
      chanceDeErrar = 38;
    }
  }
}

function bolinhaNaoFicaPresa() {
  if (XBolinha - raio < 0) {
    XBolinha = 23;
  }
}
