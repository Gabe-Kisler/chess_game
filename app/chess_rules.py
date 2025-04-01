from .pieces.pawn import Pawn
from .utils import is_square_empty

rows = ['1', '2', '3', '4', '5', '6', '7', '8']
columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

def get_valid_turns (board_state, color, squareId):
    valid_moves = []

    print ('get_valid_turns function call')
    for row in rows:
        for column in columns:
            square_id = row + column

            print (square_id)


            piece_c = board_state.get(square_id, None)

            if piece_c:
                piece_t = piece_c[1]
                if piece_t == 'P':
                    piece = Pawn (color, squareId)
                    valid_pawn_moves = piece.get_valid_moves (board_state)
                    print ('valid pawn moves:', valid_pawn_moves)
                    valid_moves.append (valid_pawn_moves)
        
    return valid_moves
            


            
            
            