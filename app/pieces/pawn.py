from app.pieces.piece import Piece
from app.utils import get_forward_squares, get_diagonal_squares_forward, is_square_empty, get_piece_color, get_backwards_squares, get_diagonal_squares_backward

moves = []

class Pawn(Piece):
    def get_valid_moves (self, board, turn):
     ## LOOP THROUGH
            ## if first turn, check up two, both diagonals
            ## if not up one, both diagonals


            ## diagonals // if not empty, and piece is opponent
        moves = []
        forward_moves = []
        if (turn == 'user'):
            if self.is_first_turn ():
                forward_moves = get_forward_squares(self.position, 2)
                for forward_move in forward_moves:
                    if is_square_empty (forward_move, board):
                        moves.append(forward_move)
            else:
                forward_moves = get_forward_squares(self.position, 1)
                for forward_move in forward_moves:
                    if is_square_empty (forward_move, board):
                        moves.append(forward_move)

            diagonal_move_right, diagonal_move_left = get_diagonal_squares_forward (self.position, 1)

        

            for diagonal_right in diagonal_move_right:
                if not is_square_empty(diagonal_right, board):
                    if get_piece_color(diagonal_right, board) != self.color and get_piece_color(diagonal_right, board) != None:
                        moves.append(diagonal_right)
            for diagonal_left in diagonal_move_left:
                if not is_square_empty(diagonal_left, board):
                    if get_piece_color(diagonal_left, board) != self.color and get_piece_color(diagonal_left, board) != None:
                        moves.append(diagonal_left)

        elif (turn == 'computer'):
            if self.is_first_turn ():
                forward_moves = get_backwards_squares(self.position, 2)
                for forward_move in forward_moves:
                    if is_square_empty (forward_move, board):
                        moves.append(forward_move)
            else:
                forward_moves = get_backwards_squares(self.position, 1)
                for forward_move in forward_moves:
                    if is_square_empty (forward_move, board):
                        moves.append(forward_move)

            diagonal_move_right, diagonal_move_left = get_diagonal_squares_backward (self.position, 1)

        

            for diagonal_right in diagonal_move_right:
                if not is_square_empty(diagonal_right, board):
                    if get_piece_color(diagonal_right, board) != self.color and get_piece_color(diagonal_right, board) != None:
                        moves.append(diagonal_right)
            for diagonal_left in diagonal_move_left:
                if not is_square_empty(diagonal_left, board):
                    if get_piece_color(diagonal_left, board) != self.color and get_piece_color(diagonal_left, board) != None:
                        moves.append(diagonal_left)
        return moves
            
    def get_attacking_moves (self, board, turn):
        print ('pawn attacking moves entered turn:', turn)
        moves = []
        if (turn == 'computer'):
            diagonal_move_right, diagonal_move_left = get_diagonal_squares_forward (self.position, 1)
        elif (turn == 'user'):
            diagonal_move_right, diagonal_move_left = get_diagonal_squares_backward (self.position, 1)
        else:
            return moves
        
        moves.extend (diagonal_move_left)
        moves.extend (diagonal_move_right)

        print ('pawn attacking moves for', self.position, 'moves', moves)

        return moves
    

    def is_first_turn (self):
        row = int(self.position[0])
        if self.color == 'white' and row == 2:
            return True
        elif self.color == 'black' and row == 7:
            return True
        return False
