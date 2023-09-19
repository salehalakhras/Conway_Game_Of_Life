const gridContainer = document.getElementById(`mainGrid`);
const mainGrid = [];
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

const xCells = Math.floor(windowWidth / 10);
const yCells = Math.floor(windowHeight / 10);

// initialize the grid
function init() {
  for (let y = 0; y < yCells; y++) {
    mainGrid[y] = [];
    for (let x = 0; x < xCells; x++) {
      const cell = {
        html: document.createElement(`span`),
        alive: false,
        mark: false,
      };
      cell.html.addEventListener(`click`, (e) => {
        cell.alive = !cell.alive;
        cell.mark = cell.alive;
        draw();
      });
      mainGrid[y][x] = cell;
      gridContainer.appendChild(cell.html);
    }
  }
  gridContainer.style.gridTemplateColumns = `repeat(${xCells},1fr)`;
}

function draw() {
  for (let y = 0; y < yCells; y++) {
    for (let x = 0; x < xCells; x++) {
      if (mainGrid[y][x].mark) {
        mainGrid[y][x].alive = true;
        mainGrid[y][x].style = ``;
        mainGrid[y][x].html.style = `background-color: #ddd;`;
      } else {
        mainGrid[y][x].alive = false;
        mainGrid[y][x].style = ``;
        mainGrid[y][x].html.style = `background-color: #222;`;
      }
    }
  }
}

function start() {
  for (let y = 0; y < yCells; y++) {
    for (let x = 0; x < xCells; x++) {
      const nearby = checkNearby(y, x);
      if (nearby < 2 && mainGrid[y][x].alive) {
        mainGrid[y][x].mark = false;
      } else if (nearby >= 2 && nearby <= 3 && mainGrid[y][x].alive) {
        mainGrid[y][x].mark = true;
      } else if (nearby > 3 && mainGrid[y][x].alive) {
        mainGrid[y][x].mark = false;
      } else if (nearby == 3 && !mainGrid[y][x].alive) {
        mainGrid[y][x].mark = true;
      }
    }
  }
  draw();
}

function checkNearby(y, x) {
  let alive = 0;
  const up = (y - 1 + yCells) % yCells;
  const down = (y + 1 + yCells) % yCells;
  const right = (x + 1 + xCells) % xCells;
  const left = (x - 1 + xCells) % xCells;
  if (mainGrid[up][x].alive) alive++;
  if (mainGrid[down][x].alive) alive++;
  if (mainGrid[y][left].alive) alive++;
  if (mainGrid[y][right].alive) alive++;
  if (mainGrid[up][right].alive) alive++;
  if (mainGrid[up][left].alive) alive++;
  if (mainGrid[down][right].alive) alive++;
  if (mainGrid[down][left].alive) alive++;

  return alive;
}
const btn = document.getElementById(`start`);
btn.addEventListener(`click`, function () {
  for (let i = 0; i < 1000; i++) {
    setInterval(function () {
      start();
    }, 500);
  }
});
init();
draw();
