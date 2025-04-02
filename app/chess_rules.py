from .pieces.pawn import Pawn
from .pieces.knight import Knight
from .utils import is_square_empty

rows = ['1', '2', '3', '4', '5', '6', '7', '8']
columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

def get_valid_turns (board_state, color, squareId):
    valid_moves = []

    piece_c = board_state.get(squareId, None)
    print ('piece selected:', piece_c)
    if piece_c:
        print (piece_c)
        piece_t = piece_c[1]
        if piece_t == 'P':
            piece = Pawn (color, squareId)
            valid_pawn_moves = piece.get_valid_moves (board_state, color)
            valid_moves = valid_pawn_moves

        elif piece_t == 'N':
            print ('KNIGHT CLICKED! getting valid knight turns....')
            piece = Knight (color, squareId)
            valid_knight_turns = piece.get_valid_moves (board_state, color)
            print (valid_knight_turns)
            valid_moves = valid_knight_turns
        
    return valid_moves
            


            
            
            