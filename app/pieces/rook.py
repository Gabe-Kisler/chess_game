from app.pieces.piece import Piece
from app.utils import get_forward_squares, get_right_squares, get_left_squares, get_backwards_squares, is_square_empty, get_piece_color

moves = []


class Rook(Piece):
    def get_valid_moves (self, board, color):
        moves = []
    ## LOOP THROUGH
        ## check left 7, if off board break, if occupied by self break
        ## check right 7, see above
        ## check up 7, see above
        ## check down 7, see 
        
        print ('rook case right, self.color, self.position', self.color, ',', self.position)

        dir_to_check = ['left', 'right', 'up', 'down']
        for dir in dir_to_check:
            if dir == 'left':
                squares = get_left_squares (self.position, 7)
                for square in squares:
                    print ('checking rook left, square:', square)
                    if int(square[0]) < 1:
                        break
                    if get_piece_color (square, board) == self.color:
                        break

                    moves.append(square)

            if dir == 'right':
                squares = get_right_squares (self.position, 7)
                for square in squares:
                    if int(square[0]) < 1:
                        break
                    if get_piece_color (square, board) == self.color:
                        break

                    moves.append(square)

            if dir == 'up':
                squares = get_forward_squares (self.position, 7)
                for square in squares:
                    if int(square[0]) < 1:
                        break
                    if get_piece_color (square, board) == self.color:
                        break

                    moves.append(square)

            if dir == 'down':
                squares = get_backwards_squares (self.position, 7)
                for square in squares:
                    if int(square[0]) < 1:
                        break
                    if get_piece_color (square, board) == self.color:
                        break

                    moves.append(square)


        return moves




