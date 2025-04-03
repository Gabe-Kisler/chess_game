from app.pieces.piece import Piece
from app.utils import get_forward_squares, get_diagonal_squares_forward, is_square_empty, get_piece_color

moves = []

class Pawn(Piece):
    def get_valid_moves (self, board, color):
     ## LOOP THROUGH
            ## if first turn, check up two, both diagonals
            ## if not up one, both diagonals


            ## diagonals // if not empty, and piece is opponent
        moves = []


        if self.is_first_turn ():
            forward_moves = get_forward_squares(self.position, 2)
            if len(forward_moves) > 1:
                if is_square_empty (forward_moves[0], board) and is_square_empty (forward_moves[1], board):
                    moves.extend(forward_moves)
        else:
            forward_moves = get_forward_squares(self.position, 1)
            if len(forward_moves) > 0:
                if is_square_empty (forward_moves[0], board):
                    moves.append(forward_moves[0])

        diagonal_moves = get_diagonal_squares_forward (self.position, 1)
        print ('pawn move,', color)

        if len(diagonal_moves) > 0:
            if not is_square_empty(diagonal_moves[0], board):
                if get_piece_color(diagonal_moves[0], board) != self.color and get_piece_color(diagonal_moves[0], board) != None:
                    moves.append(diagonal_moves[0])
        if len(diagonal_moves) > 1:
            if not is_square_empty(diagonal_moves[1], board):
                if get_piece_color(diagonal_moves[1], board) != self.color and get_piece_color(diagonal_moves[0], board) != None:
                    moves.append(diagonal_moves[1])

        return moves
            
    

    def is_first_turn (self):
        row = int(self.position[0])
        if row == 2:
            return True
        return False
