const gridContainer = document.getElementById('draw-space');

function makeGrid(height, width) {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.style.setProperty('grid-template-columns', `repeat(${width}, 1fr)`);
    grid.style.setProperty('grid-template-rows', `repeat(${height}, 1fr)`);
    for (let i = 0; i < width * height; ++i) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');

        grid.appendChild(cell);
    }
    return grid;
}

gridContainer.appendChild(makeGrid(16, 16));