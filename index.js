const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvasSize = 400;
playerSize = 10;
let loops = 0;

const player = {
  x: canvasSize / 2,
  y: canvasSize / 2,
  xSpeed: 3,
  ySpeed: -2,
  width: playerSize,
  height: playerSize,
  color: "white",
};

const blocks = [];

function gameLoop() {
  clearCanvas();
  checkBoundaries();
  checkBlockBoundaries();
  movePlayer();
  drawPlayer();
  if (loops % 100 === 0) randomBlock();
  drawBlocks();
  loops++;
  requestAnimationFrame(gameLoop);
}

function movePlayer() {
  player.x += player.xSpeed;
  player.y += player.ySpeed;
}

function randomBlock() {
  blocks.push({
    y: rng(canvasSize - 40),
    x: rng(canvasSize - 40),
    height: 40,
    width: 40,
  });
}

function checkBlockBoundaries() {
  {
    blocks.forEach((block) => {
      if (
        player.y > block.y &&
        player.y < block.y + block.height &&
        player.x > block.x &&
        player.x < block.x + block.width
      ) {
        if (rng(2) > 1) {
          player.xSpeed *= -1
        } else {
          player.ySpeed *= -1
        }
      }
    });
  }
}

function drawBlocks() {
  ctx.fillStyle = "gray";
  blocks.forEach((b) => {
    ctx.fillRect(b.x, b.y, b.width, b.height);
  });
}

function rng(num) {
  return Math.floor(Math.random() * num + 1);
}

function checkBoundaries() {
  xPositive = player.xSpeed > 0;
  yPositive = player.ySpeed > 0;
  if (player.x - player.width / 2 < 0) {
    player.xSpeed = xPositive ? player.xSpeed : -player.xSpeed;
  }
  if (player.x + player.width / 2 > canvasSize) {
    player.xSpeed = xPositive ? -player.xSpeed : player.xSpeed;
  }
  if (player.y - player.height / 2 < 0) {
    player.ySpeed = yPositive ? player.ySpeed : -player.ySpeed;
  }
  if (player.y + player.height / 2 > canvasSize) {
    player.ySpeed = yPositive ? -player.ySpeed : player.ySpeed;
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  var radius = Math.min(player.width, player.height) / 2;
  ctx.beginPath();
  ctx.arc(player.x, player.y, radius, 0, Math.PI * 2);
  ctx.fill();
}

document.addEventListener("keydown", (event) => {
  if (event.key === "w" && player.y > 0) {
    player.y -= 10;
  }
  if (event.key === "s" && player.y + player.height < canvasSize) {
    player.y += 10;
  }
  if (event.key === "a" && player.x > 0) {
    player.x -= 10;
  }
  if (event.key === "d" && player.x + player.width < canvasSize) {
    player.x += 10;
  }
});

gameLoop();
