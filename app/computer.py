from .check import is_king_in_check
from .chess_rules import get_valid_turns;
import random, copy

rows = ['1', '2', '3', '4', '5', '6', '7', '8']
columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

def get_computer_move (board_state, color):
    legal_moves = get_all_computer_moves (board_state, color)

    if legal_moves:    
        from_square, to_square = random.choice (legal_moves)
        print (from_square, to_square)
        return {'from': from_square, 'to': to_square}
    return {'from': None, 'to': None}

def get_all_computer_moves (board_state, color):
    if color == 'black':
        color_char = 'b'
    elif color == 'white':
        color_char = 'w'

    valid_moves = []
    legal_moves = []

    is_check = is_king_in_check

    for column in columns:
        for row in rows:
            square = row + column
            piece_c = board_state.get(square, None)
            if piece_c:
                piece_color = piece_c[0]
                if piece_color == color_char:
                    moves = get_valid_turns(board_state, color, square, 'computer')
                    for move in moves:
                        if move:
                            legal_moves.append ((square, move))

    return legal_moves


def computer_move_medium(board_state, color):
    # Piece values
    piece_values = {
        'P': 1,
        'N': 3,
        'B': 3,
        'R': 5,
        'Q': 10,
        'K': 30
    }

    legal_moves = get_all_computer_moves(board_state, color)
    print('medium computer moves, all moves', legal_moves)

    best_move_score = 0
    best_move = None

    for move in legal_moves:
        square_from, square_to = move
        piece = board_state.get(square_to)
        if piece:
            piece_type = piece[1]
            move_score = piece_values.get(piece_type, 0)
            print('in legal_moves, square_to:', square_to, 'piece', piece_type)

            if move_score > best_move_score:
                best_move_score = move_score
                best_move = move

    if best_move is None and legal_moves:
        move_dict = get_computer_move(board_state, color)
        best_move = (move_dict['from'], move_dict['to'])

    if best_move:
        square_from, square_to = best_move
        print('square_from, square_to:', square_from, square_to)
        return {'from': square_from, 'to': square_to}

    return {'from': None, 'to': None}


