def setup_board(user_color):
    if user_color == 'black':
        return {
            "1a": "bR", "1b": "bN", "1c": "bB", "1d": "bQ", "1e": "bK", "1f": "bB", "1g": "bN", "1h": "bR",
            "2a": "bP", "2b": "bP", "2c": "bP", "2d": "bP", "2e": "bP", "2f": "bP", "2g": "bP", "2h": "bP",
            "7a": "wP", "7b": "wP", "7c": "wP", "7d": "wP", "7e": "wP", "7f": "wP", "7g": "wP", "7h": "wP",
            "8a": "wR", "8b": "wN", "8c": "wB", "8d": "wQ", "8e": "wK", "8f": "wB", "8g": "wN", "8h": "wR"
        }
    else:
        return {
            "1a": "wR", "1b": "wN", "1c": "wB", "1d": "wQ", "1e": "wK", "1f": "wB", "1g": "wN", "1h": "wR",
            "2a": "wP", "2b": "wP", "2c": "wP", "2d": "wP", "2e": "wP", "2f": "wP", "2g": "wP", "2h": "wP",
            "7a": "bP", "7b": "bP", "7c": "bP", "7d": "bP", "7e": "bP", "7f": "bP", "7g": "bP", "7h": "bP",
            "8a": "bR", "8b": "bN", "8c": "bB", "8d": "bQ", "8e": "bK", "8f": "bB", "8g": "bN", "8h": "bR"
    }

def update_board(square_from, square_to, board_state):
    ## function to update board after move is made

    piece_to_move = board_state.get(square_from)
    if not piece_to_move:
        return board_state

    new_board_state = board_state.copy()
    square_to = str(square_to)
    new_board_state[square_to] = piece_to_move
    del new_board_state[square_from]
    print ('new board state after update:', new_board_state)
    return new_board_state

