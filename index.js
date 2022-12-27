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
}

function paint(target) {
    target.style.backgroundColor = getComputedStyle(root).getPropertyValue('--draw-color');
}

function setDrawColor(color) {
    root.style.setProperty('--draw-color', color);
}

function setDrawBgColor(color) {
    root.style.setProperty('--draw-bg-color', color);
}

function toggleGrid() {
    gridBorders = !gridBorders;

    if (gridBorders) {
        root.style.setProperty('--grid-border', '1px solid var(--main-color)');
    }
    else {
        root.style.setProperty('--grid-border', 'none');
    }
}


let isDown = false;
let gridBorders = false;

const root = document.documentElement;
const gridContainer = document.getElementById('draw-space');
makeGrid(gridContainer, 32);

const colorPicker = document.getElementById('color-picker');
setDrawColor(colorPicker.value);
colorPicker.addEventListener('change', () => setDrawColor(colorPicker.value));

const bgColorPicker = document.getElementById('bg-color-picker');
setDrawBgColor(bgColorPicker.value);
bgColorPicker.addEventListener('change', () => setDrawBgColor(bgColorPicker.value));

const gridSwitch = document.getElementById('grid-switch');
gridSwitch.addEventListener('change', toggleGrid)