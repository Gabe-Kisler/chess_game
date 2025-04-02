from app.pieces.piece import Piece
from app.utils import get_forward_squares, is_square_empty, get_piece_color, get_left_squares, get_right_squares, get_backwards_squares

moves = []

class Knight(Piece):
    def get_valid_moves (self, board, color):
    ## LOOP THROUGH
        ## check left 2 up/down
        ## check right 2 up/down
        ## check up 2 right/left
        ## check down 2 right/left

        ## check if in bounds
        ## check if occupied - if black if white

        dir_to_check = ['left', 'right', 'up', 'down']

        for dir in dir_to_check:
            match dir:
                case 'left':
                    squares = get_left_squares (self.position, 2)
                    if len(squares) > 1:
                        new_square = squares[1]
                        square_up = get_forward_squares (new_square, 1)
                        square_down = get_backwards_squares (new_square, 1)

                        for square in square_up + square_down:
                            if get_piece_color(square, board) is None or get_piece_color(square, board) != self.color:
                                moves.append(square)


                case 'right':
                    squares = get_right_squares (self.position, 2)
                    if len(squares) > 1:
                        new_square = squares[1]
                        square_up = get_forward_squares (new_square, 1)
                        square_down = get_backwards_squares (new_square, 1)
                    
                        for square in square_up + square_down:
                            if get_piece_color(square, board) is None or get_piece_color(square, board) != self.color:
                                moves.append(square)

                case 'up':
                    squares = get_forward_squares(self.position, 2)
                    if len(squares) > 1:
                        new_square = squares[1]
                        square_right = get_right_squares(new_square, 1)
                        square_left = get_left_squares(new_square, 1)

                        for square in square_right + square_left:
                            if get_piece_color(square, board) is None or get_piece_color(square, board) != self.color:
                                moves.append(square)

                case 'down':
                    squares = get_backwards_squares(self.position, 2)
                    if len(squares) > 1:
                        new_square = squares[1]
                        square_right = get_right_squares(new_square, 1)
                        square_left = get_left_squares(new_square, 1)

                        for square in square_right + square_left:
                            if get_piece_color(square, board) is None or get_piece_color(square, board) != self.color:
                                moves.append(square)


        return moves