const GRID_SIZE = 6;
const CORNER_INDICES = ["0-0", `0-${GRID_SIZE-1}`, `${GRID_SIZE-1}-${GRID_SIZE-1}`, `${GRID_SIZE-1}-0`];
const CELL_STATES = ["blank", "wall", "cheese", "gravel"];
const CORNER_CELL_STATES = ["blank", "player1-current", "player2-current", "player1-past", "player2-past"]
const PLAYER_1_SYMBOL = "M";
const PLAYER_2_SYMBOL = "C";

let cells_list = []

//  Generate the game's cells
// ================================
const grid_container = document.querySelector("#grid-container");
for (let i = 0; i < GRID_SIZE; i++) {
    let grid_row = `<div class="grid-row" id="row-${i}">`;
    for (let j = 0; j < GRID_SIZE; j++) {

        // Add a .cell div to the current .grid-row
        grid_row += `
            <div draggable="true" class="cell blank" id="cell-${i.toString() + "-" + j.toString()}"></div>`;

        // Add a cell object to the cells_list array
        let cell = { index: i.toString()+"-"+j.toString(), states: ["blank"], corner: false};
        cells_list.push(cell);
    }
    grid_row += `</div>`;
    grid_container.insertAdjacentHTML("beforeend", grid_row);
}

//  Color and update corner cells
// ================================
const corner_indexes = [`0-0`, `0-${GRID_SIZE - 1}`, `${GRID_SIZE - 1}-${GRID_SIZE - 1}`, `${GRID_SIZE - 1}-0`];
for (let x of corner_indexes) {
    const corner = document.querySelector(`#cell-${x}`);
    corner.classList += " corner";
    cells_list.filter(cell => cell.index === x)[0].corner = true;
}

// Set "click through" cell event handler
// ================================

// Decide if this is a corner cell of a non-corner cell
function clickCell(cell_index) {
    if (CORNER_INDICES.indexOf(cell_index) > -1) {
        clickCorner(cell_index);
        console.log("corner clicked");
    }
    else {
        clickNonCorner(cell_index);
        console.log("non-corner clicked");
    }
}

function clickCorner(cell_index) {

    // Get the cell_index cell object
    //const cell = document.querySelector(`#cell-${cell_index}`);
    const cell = cells_list.filter(c => c.index === cell_index)[0];

    // Get the index of the CELL_STATES array associated with the cell object's current state and new state
    const current_state_index = CORNER_CELL_STATES.indexOf(cell.states[0]);
    const new_state_index = (current_state_index+1)%CORNER_CELL_STATES.length;

    // Replace the state value in the cell object, and in the .cell div's class list
    cell.states.splice(0, 1); // remove the first state
    cell.states.unshift(CORNER_CELL_STATES[new_state_index]); // add a new first state
    const cell_div = document.querySelector(`#cell-${cell_index}`);
    cell_div.classList.replace(cell_div.classList[1], CORNER_CELL_STATES[new_state_index]);
}

function clickNonCorner(cell_index) {

    // Get the cell_index cell object
    //const cell = document.querySelector(`#cell-${cell_index}`);
    const cell = cells_list.filter(c => c.index === cell_index)[0];

    // Get the index of the CELL_STATES array associated with the cell object's current state and new state
    const current_state_index = CELL_STATES.indexOf(cell.states[0]);
    const new_state_index = (current_state_index+1)%CELL_STATES.length;

    // Replace the state value in the cell object, and in the .cell div's class list
    cell.states.splice(0, 1); // remove the first state
    cell.states.unshift(CELL_STATES[new_state_index]); // add a new first state
    const cell_div = document.querySelector(`#cell-${cell_index}`);
    cell_div.classList.replace(cell_div.classList[1], CELL_STATES[new_state_index]);
}

const cells = document.querySelectorAll(".cell");
for (let cell of cells) {
    // Use the end of the .cell div's id to get its index
    cell.onclick = () => { clickCell(cell.id.substring(5, 8)) };
}