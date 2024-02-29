const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvasSize = 400;
playerSize = 30;
let loopNumber = 0;

const player = {
  x: canvasSize / 2 - playerSize / 2,
  y: canvasSize / 2 - playerSize / 2,
  width: playerSize,
  height: playerSize,
  color: "white",
};

function gameLoop() {
  clearCanvas();
  drawPlayer();
  moveBelt();
  console.log("hello");
  requestAnimationFrame(gameLoop);
}

function moveBelt() {
  if (loopNumber < 300) {
    player.x -= 1;
  }
  loopNumber++;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
  ctx.fillStyle = "white";
  ctx.fillRect(player.x, player.y, player.width, player.height);
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
