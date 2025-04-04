from app.pieces.piece import Piece
from app.utils import get_diagonal_squares_forward, get_diagonal_squares_backward, is_square_empty, get_piece_color

moves = []
columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

class Bishop(Piece):
    def get_valid_moves (self, board, color):
        moves = []
    ## LOOP THROUGH
        ## check diagonal up 7, if row is oob or column oob, break, if piece is not opponents, break
        ## check diagonal down 7, see above
        
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
            if int(square[0]) < 1:
                continue
            if square[1] not in columns:
                continue
            if not is_square_empty (square, board) and get_piece_color (square, board) == self.color:
                break

            moves.append(square)

            if not is_square_empty (square, board) and get_piece_color (square, board) != self.color:
                        break

        backward_right_diagonal_squares, backwards_left_diagonal_squares = get_diagonal_squares_backward (self.position, 7)
        for square in backward_right_diagonal_squares:
            if int(square[0]) < 1:
                continue
            if square[1] not in columns:
                continue
            if not is_square_empty (square, board) and get_piece_color (square, board) == self.color:
                continue

            moves.append(square)

            if not is_square_empty (square, board) and get_piece_color (square, board) != self.color:
                        break

        for square in backwards_left_diagonal_squares:
            if int(square[0]) < 1:
                continue
            if square[1] not in columns:
                continue
            if not is_square_empty (square, board) and get_piece_color (square, board) == self.color:
                continue

            moves.append(square)

            if not is_square_empty (square, board) and get_piece_color (square, board) != self.color:
                        break

        return moves