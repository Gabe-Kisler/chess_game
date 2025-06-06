from app.pieces.piece import Piece
from app.utils import get_left_squares, get_right_squares, get_forward_squares, get_backwards_squares, get_diagonal_squares_forward, get_diagonal_squares_backward, get_piece_color, is_square_empty

moves = []
columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

class Queen(Piece):
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
                squares = get_left_squares(self.position, 7)
                for square in squares:
                    if int(square[0]) < 1:
                        break
                    if not is_square_empty(square, board) and get_piece_color(square, board) == self.color:
                        break

                    moves.append(square)

                    if not is_square_empty (square, board) and get_piece_color (square, board) != self.color:
                        break

            if dir == 'right':
                squares = get_right_squares(self.position, 7)
                for square in squares:
                    if int(square[0]) > 8:
                        break
                    if not is_square_empty(square, board) and get_piece_color(square, board) == self.color:
                        break

                    moves.append(square)

                    if not is_square_empty (square, board) and get_piece_color (square, board) != self.color:
                        break

            if dir == 'up':
                squares = get_forward_squares (self.position, 7)
                for square in squares:
                    if square[1] not in columns:
                        break
                    if get_piece_color (square, board) == self.color:
                        break

                    moves.append(square)

                    if not is_square_empty (square, board) and get_piece_color (square, board) != self.color:
                        break

            if dir == 'down':
                squares = get_backwards_squares (self.position, 7)
                for square in squares:
                    if square[1] not in columns:
                        break
                    if get_piece_color (square, board) == self.color:
                        break

                    moves.append(square)

                    if not is_square_empty (square, board) and get_piece_color (square, board) != self.color:
                        break

            if dir == 'diagonal_up':
                forward_right_diagonal_squares, forward_left_diagonal_squares = get_diagonal_squares_forward (self.position, 7)
                for square in forward_right_diagonal_squares:
                    if int(square[0]) > 8:
                        continue
                    if square[1] not in columns:
                        continue
                    if not is_square_empty (square, board) and get_piece_color (square, board) == self.color:
                        break

                    moves.append(square)

                    if not is_square_empty (square, board) and get_piece_color (square, board) != self.color:
                        break

                for square in forward_left_diagonal_squares:
                    if int(square[0]) > 8:
                        continue
                    if square[1] not in columns:
                        continue
                    if not is_square_empty (square, board) and get_piece_color (square, board) == self.color:
                        break

                    moves.append(square)

                    if not is_square_empty (square, board) and get_piece_color (square, board) != self.color:
                        break

            if dir == 'diagonal_down':
                backward_right_diagonal_squares, backward_left_diagonal_squares = get_diagonal_squares_backward (self.position, 7)
                for square in backward_right_diagonal_squares:
                    if int(square[0]) > 8:
                        continue
                    if square[1] not in columns:
                        continue
                    if not is_square_empty (square, board) and get_piece_color (square, board) == self.color:
                        break

                    moves.append(square)

                    if not is_square_empty (square, board) and get_piece_color (square, board) != self.color:
                        break

                for square in backward_left_diagonal_squares:
                    if int(square[0]) < 1:
                        continue
                    if square[1] not in columns:
                        continue
                    if not is_square_empty (square, board) and get_piece_color (square, board) == self.color:
                        break

                    moves.append(square)

                    if not is_square_empty (square, board) and get_piece_color (square, board) != self.color:
                        break


        return moves

                