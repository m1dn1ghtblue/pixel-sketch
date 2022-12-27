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
                paint(event.target, drawColor);
            }
        });

        cell.addEventListener('mousemove', (event) => {
            if (isDown) {
                paint(event.target, drawColor);
            }
        });

        cell.addEventListener('mouseup', () => {
            isDown = false;
        })

        grid.appendChild(cell);
    }
    container.appendChild(grid);
}

function paint(target, color) {
    target.style.backgroundColor = color;
}

let drawColor = '#000000';
let isDown = false;

const gridContainer = document.getElementById('draw-space');
makeGrid(gridContainer, 32);