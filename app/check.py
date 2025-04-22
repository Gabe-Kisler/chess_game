from .pieces.pawn import Pawn
from .pieces.rook import Rook
from .pieces.king import King
from .pieces.queen import Queen
from .pieces.bishop import Bishop
from .pieces.knight import Knight
import copy

rows = ['1', '2', '3', '4', '5', '6', '7', '8']
columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

def is_king_in_check (board_state, color, turn):
    if color == 'white':
        opponent_color = 'b'
        opponent_color_name = 'black'
        self_color = 'w'
    elif color == 'black':
        opponent_color = 'w'
        opponent_color_name = 'white'
        self_color = 'b'

    king_position = None
    for square, piece in board_state.items():
        if piece[0] == self_color and piece[1] == 'K':
            king_position = square
            break

    for square, piece in board_state.items():
        if isinstance(piece, str) and len(piece) >= 2 and piece[0] == opponent_color:
            piece_obj = get_piece_object(piece[1], opponent_color_name, square)
            if piece_obj:
                if isinstance(piece_obj, Pawn):
                    moves = piece_obj.get_attacking_moves (board_state, turn)
                else:
                    moves = piece_obj.get_valid_moves(board_state, opponent_color_name)
                
                if king_position in moves:
                    return True
    
    return False

def will_move_put_king_in_check(board_state, color, from_square, to_square, turn):

    board_copy = copy.deepcopy(board_state) 
    
    board_copy[to_square] = board_copy[from_square]
    del board_copy[from_square]

    return is_king_in_check(board_copy, color, turn)
    
def get_piece_object(piece_type, color, squareId):
    if piece_type == 'P':
        return Pawn(color, squareId)
    elif piece_type == 'N':
        return Knight(color, squareId)
    elif piece_type == 'R':
        return Rook(color, squareId)
    elif piece_type == 'B':
        return Bishop(color, squareId)
    elif piece_type == 'Q':
        return Queen(color, squareId)
    elif piece_type == 'K':
        return King(color, squareId)
    return None