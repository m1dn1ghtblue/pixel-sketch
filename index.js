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

        cell.addEventListener('mouseover', (event) => {
            if (isDown) {
                paint(event.target);
            }
        });

        grid.appendChild(cell);
    }
    root.addEventListener('mouseup', () => {
        isDown = false;
    });

    container.childNodes.forEach(child => child.remove());
    container.appendChild(grid);
    return grid;
}

function paint(target) {
    if (rainbow) {
        target.style.backgroundColor = rainbowColor(rainbowId);
        rainbowId = (rainbowId + 1) % 32;
        root.style.setProperty('--draw-hover-color', rainbowColor(rainbowId));
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

function clear() {
    grid.childNodes.forEach(node => erase(node));
}

function rainbowColor(rainbowId) {
    const frequency = 0.2;

    let red = Math.sin(frequency * rainbowId) * 127 + 128;
    let green = Math.sin(frequency * rainbowId + Math.PI / 2) * 127 + 128;
    let blue = Math.sin(frequency * rainbowId + Math.PI) * 127 + 128;

    return `rgb(${Math.round(red)},${Math.round(green)},${Math.round(blue)})`;
}

function resetGrid() {
    gridSize = sizeSlider.value;
    gridSizeLabel.innerText = `${gridSize}x${gridSize}`;
    grid = makeGrid(gridContainer, gridSize);
}

function toggleRainbow() {
    if (rainbow) {
        root.style.setProperty('--draw-hover-color', rainbowColor(rainbowId));
    }
    else {
        root.style.setProperty('--draw-hover-color', 'var(--draw-color)');
    }
}

let isDown = false;
let rainbowId = 0;

const root = document.documentElement;
const gridContainer = document.getElementById('draw-space');

// Pen color picker
const colorPicker = document.getElementById('color-picker');
setDrawColor(colorPicker.value);
colorPicker.addEventListener('change', () => setDrawColor(colorPicker.value));

// Background color picker
const bgColorPicker = document.getElementById('bg-color-picker');
setDrawBgColor(bgColorPicker.value);
bgColorPicker.addEventListener('change', () => setDrawBgColor(bgColorPicker.value));

// Grid toggle
const gridSwitch = document.getElementById('grid-switch');
let gridBorders = gridSwitch.checked;
gridSwitch.addEventListener('change', () => {
    gridBorders = !gridBorders;
    toggleGrid();
});

// Rainbow toggle
const rainbowSwitch = document.getElementById('rainbow-switch');
let rainbow = rainbowSwitch.checked;
rainbowSwitch.addEventListener('change', () => {
    rainbow = !rainbow;
    toggleRainbow();
});

// Grid size slider
const sizeSlider = document.getElementById('size-slider');
const gridSizeLabel = document.getElementById('grid-size-label');
let gridSize = sizeSlider.value;
sizeSlider.addEventListener('input', resetGrid);

// Clear button
const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
    clear();
});

let grid = makeGrid(gridContainer, gridSize);
toggleGrid();
toggleRainbow();
