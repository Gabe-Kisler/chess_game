import { render_board } from "./renderBoard.js";

/*setup default board state*/
export function setupBoard (user_color) {
    fetch(`/setup_game/${user_color}`)
        .then(response => response.json())
        .then(boardState => {
            render_board(boardState);
        });
}