const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

ctx.imageSmoothingEnabled = false;

const ZOOM = 2;

let dino = { x: 50, y: 80, width: 22, height: 46, dy: 0, gravity: 0.6, jump: -10, grounded: false };

// Types d'obstacles (5 choix)
const TYPE_CACA = 0;
const TYPE_ETOILE = 1;
const TYPE_SMARTPHONE = 2;
const TYPE_VELO_CARGO = 3;
const TYPE_RACAILLE = 4;

let obstacle = {
  x: canvas.width / ZOOM,
  y: 112,
  width: 16,
  height: 14,
  type: TYPE_CACA,
  speed: 4
};

let frame = 0;

function sauter(e) {
  if (e.code === 'Space' && dino.grounded) {
    dino.dy = dino.jump;
    dino.grounded = false;
  }
}

document.addEventListener('keydown', sauter);

function reinitialiserObstacle() {
  obstacle.x = canvas.width / ZOOM;
  // Tirage aléatoire parmi les 5 obstacles
  obstacle.type = Math.floor(Math.random() * 5);

  if (obstacle.type === TYPE_CACA) {
    obstacle.width = 16;
    obstacle.height = 14;
    obstacle.y = 112;
  } else if (obstacle.type === TYPE_ETOILE) {
    obstacle.width = 15;
    obstacle.height = 16;
    obstacle.y = 110;
  } else if (obstacle.type === TYPE_SMARTPHONE) {
    obstacle.width = 20;
    obstacle.height = 28;
    obstacle.y = 98;
  } else if (obstacle.type === TYPE_VELO_CARGO) {
    obstacle.width = 38;
    obstacle.height = 26;
    obstacle.y = 100;
  } else if (obstacle.type === TYPE_RACAILLE) {
    obstacle.width = 18;
    obstacle.height = 30;
    obstacle.y = 96; // Posé au sol (96 + 30 = 126)
  }
}

function update() {
  dino.dy += dino.gravity;
  dino.y += dino.dy;

  if (dino.y >= 80) {
    dino.y = 80;
    dino.dy = 0;
    dino.grounded = true;
  }

  obstacle.x -= obstacle.speed;
  if (obstacle.x < -obstacle.width) {
    reinitialiserObstacle();
  }

  // Hitbox de collision
  let boxMargin = (obstacle.type === TYPE_VELO_CARGO) ? 6 : 0;

  if (
    dino.x < obstacle.x + obstacle.width - boxMargin &&
    dino.x + dino.width > obstacle.x + boxMargin &&
    dino.y < obstacle.y + obstacle.height &&
    dino.y + dino.height > obstacle.y
  ) {
    alert("Game Over !");
    document.location.reload();
  }

  frame++;
}

// Joueur principal
function drawBonhommeFin(x, y) {
  const p = 2;

  let legShift = 0;
  if (dino.grounded && Math.floor(frame / 8) % 2 === 0) {
    legShift = 2 * p;
  }

  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(x + 3*p, y, 7*p, 2*p);
  ctx.fillRect(x + 7*p, y + 2*p, 4*p, 1*p);

  ctx.fillStyle = '#ffcc99';
  ctx.fillRect(x + 4*p, y + 2*p, 5*p, 4*p);
  ctx.fillStyle = '#000';
  ctx.fillRect(x + 7*p, y + 3*p, 1*p, 1*p);

  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(x + 3*p, y + 6*p, 6*p, 7*p);

  ctx.fillStyle = '#ffcc99';
  ctx.fillRect(x + (1*p) + legShift, y + 7*p, 2*p, 5*p);
  ctx.fillRect(x + (9*p) - legShift, y + 7*p, 2*p, 5*p);

  ctx.fillStyle = '#34495e';
  ctx.fillRect(x + (3*p) - legShift, y + 13*p, 2*p, 10*p);
  ctx.fillRect(x + (7*p) + legShift, y + 13*p, 2*p, 10*p);
}

// Obstacle 1 : Caca
function drawCaca(x, y) {
  const p = 1;
  ctx.fillStyle = '#6e3b12';

  ctx.fillRect(x + 1*p, y + 10*p, 14*p, 4*p);
  ctx.fillRect(x + 3*p, y + 6*p, 10*p, 4*p);
  ctx.fillRect(x + 5*p, y + 3*p, 6*p, 3*p);
  ctx.fillRect(x + 7*p, y + 1*p, 3*p, 2*p);
  ctx.fillRect(x + 9*p, y, 2*p, 1*p);

  ctx.fillStyle = '#8d4e19';
  ctx.fillRect(x + 3*p, y + 11*p, 4*p, 2*p);
  ctx.fillRect(x + 4*p, y + 7*p, 3*p, 2*p);
}

// Obstacle 2 : Étoile
function drawEtoile(x, y) {
  const p = 1;
  ctx.fillStyle = '#f1c40f';

  ctx.fillRect(x + 7*p, y, 1*p, 1*p);
  ctx.fillRect(x + 6*p, y + 1*p, 1*p, 1*p);
  ctx.fillRect(x + 8*p, y + 1*p, 1*p, 1*p);
  ctx.fillRect(x + 5*p, y + 2*p, 1*p, 1*p);
  ctx.fillRect(x + 9*p, y + 2*p, 1*p, 1*p);
  ctx.fillRect(x + 4*p, y + 3*p, 1*p, 1*p);
  ctx.fillRect(x + 10*p, y + 3*p, 1*p, 1*p);
  ctx.fillRect(x + 3*p, y + 5*p, 1*p, 2*p);
  ctx.fillRect(x + 11*p, y + 5*p, 1*p, 2*p);
  ctx.fillRect(x + 2*p, y + 7*p, 1*p, 2*p);
  ctx.fillRect(x + 12*p, y + 7*p, 1*p, 2*p);
  ctx.fillRect(x + 1*p, y + 9*p, 1*p, 2*p);
  ctx.fillRect(x + 13*p, y + 9*p, 1*p, 2*p);
  ctx.fillRect(x + 1*p, y + 11*p, 13*p, 1*p);

  ctx.fillRect(x + 1*p, y + 4*p, 13*p, 1*p);
  ctx.fillRect(x + 1*p, y + 5*p, 1*p, 2*p);
  ctx.fillRect(x + 13*p, y + 5*p, 1*p, 2*p);
  ctx.fillRect(x + 2*p, y + 7*p, 1*p, 2*p);
  ctx.fillRect(x + 12*p, y + 7*p, 1*p, 2*p);
  ctx.fillRect(x + 3*p, y + 9*p, 1*p, 2*p);
  ctx.fillRect(x + 11*p, y + 9*p, 1*p, 2*p);
  ctx.fillRect(x + 4*p, y + 12*p, 1*p, 1*p);
  ctx.fillRect(x + 10*p, y + 12*p, 1*p, 1*p);
  ctx.fillRect(x + 5*p, y + 13*p, 1*p, 1*p);
  ctx.fillRect(x + 9*p, y + 13*p, 1*p, 1*p);
  ctx.fillRect(x + 6*p, y + 14*p, 1*p, 1*p);
  ctx.fillRect(x + 8*p, y + 14*p, 1*p, 1*p);
  ctx.fillRect(x + 7*p, y + 15*p, 1*p, 1*p);
}

// Obstacle 3 : Bonhomme Smartphone
function drawBonhommeSmartphone(x, y) {
  const p = 1;

  ctx.fillStyle = '#1b2631';
  ctx.fillRect(x + 13*p, y + 18*p, 4*p, 10*p);
  ctx.fillRect(x + 8*p, y + 18*p, 4*p, 10*p);

  ctx.fillStyle = '#8e44ad';
  ctx.fillRect(x + 8*p, y + 10*p, 10*p, 9*p);
  ctx.fillRect(x + 5*p, y + 6*p, 11*p, 5*p);

  ctx.fillStyle = '#ffcc99';
  ctx.fillRect(x + 3*p, y + 8*p, 6*p, 5*p);
  ctx.fillStyle = '#4a235a';
  ctx.fillRect(x + 3*p, y + 6*p, 7*p, 3*p);

  ctx.fillStyle = '#ffcc99';
  ctx.fillRect(x + 4*p, y + 14*p, 6*p, 3*p);

  ctx.fillStyle = '#111';
  ctx.fillRect(x + 2*p, y + 12*p, 3*p, 7*p);

  ctx.fillStyle = '#5ded8f';
  ctx.fillRect(x + 3*p, y + 13*p, 2*p, 5*p);
}

// Obstacle 4 : Vélo Cargo
function drawVeloCargo(x, y) {
  const p = 1;

  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(x + 3*p, y + 20*p, 6*p, 6*p);
  ctx.fillStyle = '#ecf0f1';
  ctx.fillRect(x + 5*p, y + 22*p, 2*p, 2*p);

  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(x + 28*p, y + 20*p, 6*p, 6*p);
  ctx.fillStyle = '#ecf0f1';
  ctx.fillRect(x + 30*p, y + 22*p, 2*p, 2*p);

  ctx.fillStyle = '#d35400';
  ctx.fillRect(x, y + 13*p, 16*p, 8*p);
  ctx.fillStyle = '#a04000';
  ctx.fillRect(x + 1*p, y + 17*p, 14*p, 1*p);

  ctx.fillStyle = '#27ae60';
  ctx.fillRect(x + 14*p, y + 18*p, 15*p, 2*p);
  ctx.fillRect(x + 22*p, y + 12*p, 2*p, 7*p);
  ctx.fillRect(x + 16*p, y + 10*p, 2*p, 9*p);

  ctx.fillStyle = '#7f8c8d';
  ctx.fillRect(x + 15*p, y + 9*p, 4*p, 2*p);

  ctx.fillStyle = '#2980b9';
  ctx.fillRect(x + 23*p, y + 13*p, 3*p, 8*p);

  ctx.fillStyle = '#16a085';
  ctx.fillRect(x + 22*p, y + 5*p, 7*p, 8*p);

  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(x + 26*p, y + 5*p, 8*p, 2*p);

  ctx.fillStyle = '#16a085';
  ctx.fillRect(x + 17*p, y + 8*p, 6*p, 2*p);

  ctx.fillStyle = '#ffcc99';
  ctx.fillRect(x + 20*p, y + 1*p, 6*p, 5*p);
  ctx.fillStyle = '#7e5109';
  ctx.fillRect(x + 19*p, y + 3*p, 3*p, 3*p);

  ctx.fillStyle = '#000';
  ctx.fillRect(x + 19*p, y + 2*p, 3*p, 1*p);

  ctx.fillStyle = '#e67e22';
  ctx.fillRect(x + 21*p, y, 6*p, 2*p);
}

// Obstacle 5 : Racaille en casquette à l'envers (grille 18x30, p=1)
function drawRacaille(x, y) {
  const p = 1;

  // Casquette noire à l'envers (visière qui dépasse vers la droite)
  ctx.fillStyle = '#111';
  ctx.fillRect(x + 3*p, y, 10*p, 4*p);
  ctx.fillRect(x + 12*p, y + 2*p, 5*p, 2*p); // Visière à l'envers

  // Tête (tournée vers la gauche/joueur)
  ctx.fillStyle = '#ffcc99';
  ctx.fillRect(x + 4*p, y + 4*p, 8*p, 5*p);
  ctx.fillStyle = '#000';
  ctx.fillRect(x + 5*p, y + 6*p, 2*p, 1*p); // Yeux/regard

  // Survêtement Lacoste / Doudoune noire & blanche
  ctx.fillStyle = '#2980b9'; // Veste bleue
  ctx.fillRect(x + 3*p, y + 9*p, 11*p, 10*p);
  ctx.fillStyle = '#ecf0f1'; // Bande blanche de survêt'
  ctx.fillRect(x + 3*p, y + 12*p, 11*p, 2*p);

  // Sacoche en bandoulière noire
  ctx.fillStyle = '#000';
  ctx.fillRect(x + 6*p, y + 13*p, 5*p, 5*p); // Sacoche
  ctx.fillStyle = '#7f8c8d';
  ctx.fillRect(x + 4*p, y + 9*p, 1*p, 5*p);  // Sangle

  // Bas de survêtement / Pantalon
  ctx.fillStyle = '#1b2631';
  ctx.fillRect(x + 4*p, y + 19*p, 4*p, 8*p);  // Jambe gauche
  ctx.fillRect(x + 10*p, y + 19*p, 4*p, 8*p); // Jambe droite

  // Baskets montantes (Sneakers blanches)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x + 2*p, y + 27*p, 6*p, 3*p);
  ctx.fillRect(x + 8*p, y + 27*p, 6*p, 3*p);
}

function draw() {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.scale(ZOOM, ZOOM);

  ctx.fillStyle = '#7f8c8d';
  ctx.fillRect(0, 126, canvas.width / ZOOM, 2);

  drawBonhommeFin(dino.x, dino.y);

  if (obstacle.type === TYPE_CACA) {
    drawCaca(obstacle.x, obstacle.y);
  } else if (obstacle.type === TYPE_ETOILE) {
    drawEtoile(obstacle.x, obstacle.y);
  } else if (obstacle.type === TYPE_SMARTPHONE) {
    drawBonhommeSmartphone(obstacle.x, obstacle.y);
  } else if (obstacle.type === TYPE_VELO_CARGO) {
    drawVeloCargo(obstacle.x, obstacle.y);
  } else if (obstacle.type === TYPE_RACAILLE) {
    drawRacaille(obstacle.x, obstacle.y);
  }

  ctx.restore();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

reinitialiserObstacle();
gameLoop();