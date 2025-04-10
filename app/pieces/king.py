from app.pieces.piece import Piece
from app.utils import get_left_squares, get_right_squares, get_forward_squares, get_backwards_squares, get_diagonal_squares_forward, get_diagonal_squares_backward, get_piece_color, is_square_empty

moves = []
columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

class King(Piece):
    def get_valid_moves (self, board, color):
        moves = []
    ## LOOP THROUGH
        ## check up 7, if oob, break, if self piece, break
        ## down 7, see above
        ## right/left 7, see above
        ## diagonals, see above

        dir_to_check = ['left', 'right', 'up', 'down', 'diagonal_up', 'diagonal_down']
        for dir in dir_to_check:
            if dir == 'left':
                squares = get_left_squares(self.position, 1)
                for square in squares:
                    if square[1] not in columns:
                        break
                    if not is_square_empty(square, board) and get_piece_color(square, board) == self.color:
                        break

                    moves.append(square)

            if dir == 'right':
                squares = get_right_squares(self.position, 1)
                for square in squares:
                    if square[1] not in columns:
                        break
                    if not is_square_empty(square, board) and get_piece_color(square, board) == self.color:
                        break

                    moves.append(square)

            if dir == 'up':
                squares = get_forward_squares (self.position, 1)
                for square in squares:
                    if (square):
                        if int(square[0]) < 1:
                            break
                        if get_piece_color (square, board) == self.color:
                            break

                    moves.append(square)

            if dir == 'down':
                squares = get_backwards_squares (self.position, 1)
                for square in squares:
                    if int(square[0]) < 1:
                        break
                    if get_piece_color (square, board) == self.color:
                        break

                    moves.append(square)

            if dir == 'diagonal_up':
                diagonal_right, diagonal_left = get_diagonal_squares_forward (self.position, 1)
                for right in diagonal_right:
                    if int(right[0]) > 8:
                        break
                    if right[1] not in columns:
                        break
                    if not is_square_empty (right, board) and get_piece_color (right, board) == self.color:
                        break

                    moves.append(right)

                for left in diagonal_left:
                    if int(left[0]) < 1:
                        break
                    if left[1] not in columns:
                        break
                    if not is_square_empty (left, board) and get_piece_color (left, board) == self.color:
                        break

                    moves.append(left)

            if dir == 'diagonal_down':
                diagonal_right_down, diagonal_left_down = get_diagonal_squares_backward (self.position, 1)
                for right in diagonal_right_down:
                    if int(right[0]) > 8:
                        break
                    if right[1] not in columns:
                        break
                    if not is_square_empty (right, board) and get_piece_color (right, board) == self.color:
                        break

                    moves.append(right)

                for left in diagonal_left_down:
                    if int(left[0]) < 1:
                        break
                    if left[1] not in columns:
                        break
                    if not is_square_empty (left, board) and get_piece_color (left, board) == self.color:
                        break

                    moves.append(left)


        return moves
