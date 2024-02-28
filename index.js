const containerDiv = document.getElementById("game-container");
let player = {
    name: "Ryan",
    height: 30,
    width: 30,
    x: 0,
    y: 0,
}

function handleMouseMove(e) {
    player.x = e.clientX - player.width / 2;
    player.y = e.clientY - player.height / 2;
}

function renderPlayer() {
    Array.from(containerDiv.children).forEach(el => el.remove());
    containerDiv.innerHTML = `<div class="shadow" style="left: ${player.x}px; top: ${player.y}px; width: ${player.width}px; height: ${player.height}px"></div>`
}

function onMouseMove(e) {
    handleMouseMove(e);
    renderPlayer();
}


document.addEventListener("mousemove", onMouseMove);