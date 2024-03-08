const body = document.querySelector("body");
const clearBlocksButton = document.getElementById("clear-blocks");
const randomBlockButton = document.getElementById("random-block");
const speedButton = document.getElementById("change-speed");
const yInput = document.getElementById("y-speed");
const xInput = document.getElementById("x-speed");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvasSize = 400;
playerSize = 10;
let isMouseDown = false;

const player = {
  x: canvasSize / 2,
  y: canvasSize / 2,
  xSpeed: 3,
  ySpeed: 2,
  width: playerSize,
  height: playerSize,
  color: "white",
};

let blocks = [];

function gameLoop() {
  clearCanvas();
  checkBoundaries();
  checkBlockBoundaries();
  movePlayer();
  drawPlayer();
  drawBlocks();
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

function addBlock(e) {
  var mouseX = e.clientX - canvas.getBoundingClientRect().left;
  var mouseY = e.clientY - canvas.getBoundingClientRect().top;

  blocks.push({
    y: mouseY - 20,
    x: mouseX - 20,
    height: 40,
    width: 40,
  });
}

body.addEventListener("mousedown", function (e) {
  isMouseDown = true;
  addBlock(e);
});

canvas.addEventListener("mousemove", function (e) {
  if (isMouseDown) {
    addBlock(e);
  }
});

body.addEventListener("mouseup", function () {
  isMouseDown = false;
});

clearBlocksButton.addEventListener("click", clearBlocks);

randomBlockButton.addEventListener("click", randomBlock);

speedButton.addEventListener("click", changeSpeed);

function changeSpeed() {
  const y = parseInt(yInput.value);
  const x = parseInt(xInput.value);

  player.ySpeed = y;
  player.xSpeed = x;
}

function clearBlocks() {
  blocks = [];
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
        const top = player.y - block.y;
        const bottom = block.y + block.height - player.y;
        const left = player.x - block.x;
        const right = block.x + block.width - player.x;
        xPositive = player.xSpeed > 0;
        yPositive = player.ySpeed > 0;

        const smallest = findSmallestVariable(top, bottom, left, right);
        if (smallest === top)
          player.ySpeed = yPositive ? -player.ySpeed : player.ySpeed;
        if (smallest === bottom)
          player.ySpeed = yPositive ? player.ySpeed : -player.ySpeed;
        if (smallest === left)
          player.xSpeed = xPositive ? -player.xSpeed : player.xSpeed;
        if (smallest === right)
          player.xSpeed = xPositive ? player.xSpeed : -player.xSpeed;
      }
    });
  }
}

function findSmallestVariable(a, b, c, d) {
  let smallest = a;
  if (b < smallest) smallest = b;
  if (c < smallest) smallest = c;
  if (d < smallest) smallest = d;
  return smallest;
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
  if (event.key === " ") {
    randomBlock();
  }
  if (event.key === "c") {
    clearBlocks();
  }
});

gameLoop();
