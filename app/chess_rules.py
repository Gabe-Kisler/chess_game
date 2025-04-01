from .pieces.pawn import Pawn
from .utils import is_square_empty

rows = ['1', '2', '3', '4', '5', '6', '7', '8']
columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

def get_valid_turns (board_state, color):
    valid_moves = {}

    for row in rows:
        for column in columns:
            square_id = row + column
        
            piece = board_state(square_id)

            if piece and piece.color == color:
                if isinstance(piece, Pawn):
                    valid_moves[square_id] = piece.get_valid_moves(board_state, )
            
            