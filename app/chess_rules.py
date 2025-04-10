from .pieces.pawn import Pawn
from .pieces.knight import Knight
from .pieces.rook import Rook
from .pieces.bishop import Bishop
from .pieces.queen import Queen
from .pieces.king import King
from .utils import is_square_empty
import random

rows = ['1', '2', '3', '4', '5', '6', '7', '8']
columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

def get_valid_turns (board_state, color, squareId, turn):
    valid_moves = []

    piece_c = board_state.get(squareId, None)
    print ('piece selected:', piece_c)
    if piece_c:
        print (piece_c)
        piece_t = piece_c[1]
        if piece_t == 'P':
            piece = Pawn (color, squareId)
            valid_pawn_moves = piece.get_valid_moves (board_state, turn)
            valid_moves = valid_pawn_moves

        elif piece_t == 'N':
            print ('KNIGHT CLICKED! getting valid knight turns....')
            piece = Knight (color, squareId)
            valid_knight_turns = piece.get_valid_moves (board_state, color)
            print (valid_knight_turns)
            valid_moves = valid_knight_turns

        elif piece_t == 'R':
            print ('ROOK CLICKED WOOHOO')
            piece = Rook (color, squareId)
            valid_rook_turns = piece.get_valid_moves (board_state, color)
            valid_moves = valid_rook_turns

        elif piece_t == 'B':
            piece = Bishop (color, squareId)
            valid_bishop_turns = piece.get_valid_moves (board_state, color)
            valid_moves = valid_bishop_turns

        elif piece_t == 'Q':
            piece = Queen (color, squareId)
            valid_queen_turns = piece.get_valid_moves (board_state, color)
            valid_moves = valid_queen_turns

        elif piece_t == 'K':
            piece = King (color, squareId)
            valid_king_moves = piece.get_valid_moves (board_state, color)
            valid_moves = valid_king_moves
        
    return valid_moves
            
def get_computer_move (board_state, color):
    print ('get_computer_move entered with', board_state)
    if color == 'black':
        color_char = 'b'
    elif color == 'white':
        color_char = 'w'

    valid_moves = []

    for column in columns:
        for row in rows:
            square = row + column
            print ('in get valid moves loop, square, color', square, color)
            piece_c = board_state.get(square, None)
            print ('piece checking', piece_c)
            if piece_c:
                piece_color = piece_c[0]
                if piece_color == color_char:
                    moves = get_valid_turns(board_state, color, square, 'computer')
                    for move in moves:
                        if move:
                            valid_moves.append ((square, move))
    print (valid_moves)
    if valid_moves:
        from_square, to_square = random.choice (valid_moves)
        print (from_square, to_square)
        return {'from': from_square, 'to': to_square}
    return {'from': None, 'to': None}


            
            
            