const GRID_SIZE = 6;
const CELL_STATES = ["blank", "wall", "cheese", "gravel"];

//  Generate the game's cells
// ================================
const grid_container = document.querySelector("#grid-container");
for (let i = 0; i < GRID_SIZE; i++) {
    let grid_row = `<div class="grid-row" id="row-${i}">`;
    for (let j = 0; j < GRID_SIZE; j++) {
        grid_row += `
            <div class="cell blank" id="cell-${i.toString() + "-" + j.toString()}"></div>`;
    }
    grid_row += `</div>`;
    grid_container.insertAdjacentHTML("beforeend", grid_row);
}

//  Color corner cells
// ================================
const corner_indexes = [`0-0`, `0-${GRID_SIZE - 1}`, `${GRID_SIZE - 1}-${GRID_SIZE - 1}`, `${GRID_SIZE - 1}-0`];
for (let x of corner_indexes) {
    console.log(`#cell-${x}`);
    const corner = document.querySelector(`#cell-${x}`);
    console.log(corner);
    corner.classList += " corner";
}


// Set "click through" cell event handler
// ================================
function clickCell(cell_index) {
    const cell = document.querySelector(`#cell-${cell_index}`);
    const state_index = CELL_STATES.indexOf(cell.classList[1]);
    console.log(CELL_STATES[(state_index+1)%CELL_STATES.length]);
    cell.classList.replace(cell.classList[1], CELL_STATES[(state_index+1)%CELL_STATES.length]);
    console.log(cell);
}

const cells = document.querySelectorAll(".cell");
for (let cell of cells) {
    cell.onclick = () => { clickCell(cell.id.substring(5, 8)) };
}