from app.pieces.piece import Piece
from app.utils import get_forward_squares, get_diagonal_squares_forward, is_square_empty

moves = []

class Pawn(Piece):
    def get_valid_moves (self, board):

        moves = []

        if self.is_first_turn ():
            print ('pawn first turn')
            forward_moves = get_forward_squares(self.position, 2)
            print (forward_moves)
            if not (is_square_empty (forward_moves[0], board)) and not (is_square_empty (forward_moves[1], board)):
                moves.extend(forward_moves)
        else:
            forward_moves = get_forward_squares(self.position, 1)
            if not (is_square_empty (forward_moves[0], board)):
                moves.append(forward_moves[0])
        diagonal_moves = get_diagonal_squares_forward (self.position, 1)
        if is_square_empty(diagonal_moves[0], board):
            moves.append(diagonal_moves[0])
        if is_square_empty(diagonal_moves[1], board):
            moves.append(diagonal_moves[1])

        return moves
            
    

    def is_first_turn (self):
        row = int(self.position[0])
        if self.color == 'white' and row == 2:
            return True
        elif self.color == 'black' and row == 7:
            return True
        return False
