function makeGrid(container, size) {
    const grid = document.createElement('div');
    grid.id = 'grid'
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    console.log(container.offsetWidth);
    const cellSize = container.offsetWidth / size;
    console.log(cellSize);

    for (let i = 0; i < size * size; ++i) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        cell.draggable = false;

        cell.addEventListener('mousedown', (event) => {
            if (!isDown) {
                isDown = true;
                event.preventDefault();
                paint(event.target);
            }
        });

        cell.addEventListener('mousemove', (event) => {
            if (isDown) {
                paint(event.target);
            }
        });

        cell.addEventListener('mouseup', () => {
            isDown = false;
        })
        grid.appendChild(cell);
    }
    container.childNodes.forEach(child => child.remove());

    container.appendChild(grid);
    return grid;
}

function paint(target) {
    if (rainbow) {
        target.style.backgroundColor = rainbowColor();
    }
    else {
        target.style.backgroundColor = getComputedStyle(root).getPropertyValue('--draw-color');
    }
}

function erase(target) {
    target.style.backgroundColor = getComputedStyle(root).getPropertyValue('var(--draw-bg-color)');
}

function setDrawColor(color) {
    root.style.setProperty('--draw-color', color);
}

function setDrawBgColor(color) {
    root.style.setProperty('--draw-bg-color', color);
}

function toggleGrid() {
    if (gridBorders) {
        root.style.setProperty('--grid-border', '1px solid var(--main-color)');
    }
    else {
        root.style.setProperty('--grid-border', 'none');
    }
}

function clear(container) {
    container.childNodes.forEach(node => erase(node));
}

function rainbowColor() {
    rainbowId = (rainbowId + 1) % 256;
    let red = Math.sin(0.2 * rainbowId) * 127 + 128;
    let green = Math.sin(0.2 * rainbowId + Math.PI / 2) * 127 + 128;
    let blue = Math.sin(0.2 * rainbowId + Math.PI) * 127 + 128;

    return `rgb(${Math.round(red)},${Math.round(green)},${Math.round(blue)})`;
}

let isDown = false;
let gridSize = 32;
let rainbowId = 0;

const root = document.documentElement;
const gridContainer = document.getElementById('draw-space');
let grid = makeGrid(gridContainer, gridSize);

const colorPicker = document.getElementById('color-picker');
setDrawColor(colorPicker.value);
colorPicker.addEventListener('change', () => setDrawColor(colorPicker.value));

const bgColorPicker = document.getElementById('bg-color-picker');
setDrawBgColor(bgColorPicker.value);
bgColorPicker.addEventListener('change', () => setDrawBgColor(bgColorPicker.value));

const gridSwitch = document.getElementById('grid-switch');
let gridBorders = gridSwitch.checked;
toggleGrid();
gridSwitch.addEventListener('change', () => {
    gridBorders = !gridBorders;
    toggleGrid();
});

const rainbowSwitch = document.getElementById('rainbow-switch');
let rainbow = rainbowSwitch.checked;
rainbowSwitch.addEventListener('change', () => {
    rainbow = !rainbow;
});

const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => clear(grid));