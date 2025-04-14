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

        print ('getting pawn moves', turn, board)
        if (turn == 'user'):
            if self.is_first_turn ():
                forward_moves = get_forward_squares(self.position, 2)
                for forward_move in forward_moves:
                    if is_square_empty (forward_move, board):
                        moves.append(forward_move)
            else:
                print ('not pawn first turn, from:', self.position)
                forward_moves = get_forward_squares(self.position, 1)
                for forward_move in forward_moves:
                    if is_square_empty (forward_move, board):
                        moves.append(forward_move)

            diagonal_move_right, diagonal_move_left = get_diagonal_squares_forward (self.position, 1)

            print ('diagonal moves', diagonal_move_right, diagonal_move_left)
        

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
                print ('not pawn first turn, from:', self.position)
                forward_moves = get_backwards_squares(self.position, 1)
                for forward_move in forward_moves:
                    if is_square_empty (forward_move, board):
                        moves.append(forward_move)

            diagonal_move_right, diagonal_move_left = get_diagonal_squares_backward (self.position, 1)

            print ('diagonal moves', diagonal_move_right, diagonal_move_left)
        

            for diagonal_right in diagonal_move_right:
                if not is_square_empty(diagonal_right, board):
                    if get_piece_color(diagonal_right, board) != self.color and get_piece_color(diagonal_right, board) != None:
                        moves.append(diagonal_right)
            for diagonal_left in diagonal_move_left:
                if not is_square_empty(diagonal_left, board):
                    if get_piece_color(diagonal_left, board) != self.color and get_piece_color(diagonal_left, board) != None:
                        moves.append(diagonal_left)
        print ('returning for pawn:', moves)
        return moves
            
    

    def is_first_turn (self):
        print ('self color', self.color)
        row = int(self.position[0])
        print ('row', row)
        if self.color == 'white' and row == 2:
            return True
        elif self.color == 'black' and row == 7:
            return True
        return False
