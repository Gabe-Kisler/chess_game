
columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

##get the next N forward squares from given square
def get_forward_squares (square_id, num):
  
    row = int(square_id[0])
    column = square_id[1]
    
    forward_squares = []
    for i in range (1, num + 1):
        new_row = row + i
        if new_row > 8:
            break
        if 1 <= new_row <= 8 and 0 <= columns.index(column) <= 7:
            square = f"{new_row}{column}"
            forward_squares.append (square)
    
    return forward_squares

##get the next N backward squares from given square
def get_backwards_squares (square_id, num):

    row = int(square_id[0])
    column = square_id[1]

    backward_squares = []
    for i in range (1, num + 1):
        new_row = row - i
        if new_row < 1:
            break
        if 1 <= new_row <= 8 and 1 <= columns.index(column) <= 8:
            square = f"{new_row}{column}"
            backward_squares.append (square)
    
    return backward_squares

##get N squares forward diagonal right and diagonal left from given square
def get_diagonal_squares_forward (square_id, num):
    row = int(square_id[0])
    column = square_id[1]
    column_index = columns.index(column)

    forward_right_diagonal_squares = []
    forward_left_diagonal_squares = []
    # right
    for i in range (1, num + 1):
        new_row = row + i
        new_column_index = column_index + i
        if new_row > 8 or new_column_index > 7:
            break
        new_column = columns[new_column_index]
        square = f"{new_row}{new_column}"
        forward_right_diagonal_squares.append (square)
    #left
    for i in range (1, num + 1):
        new_row = row + i
        new_column_index = column_index - i
        if new_row > 8 or new_column_index < 0:
            break
        new_column = columns[new_column_index]
        square = f"{new_row}{new_column}"
        forward_left_diagonal_squares.append (square)

    return forward_right_diagonal_squares, forward_left_diagonal_squares

##get the next N squares backward diagonal left and right from given square
def get_diagonal_squares_backward (square_id, num):
    row = int(square_id[0])
    column = square_id[1]
    column_index = columns.index(column)

    backward_right_diagonal_squares = []
    backward_left_diagonal_squares = []
    # right
    for i in range (1, num + 1):
        new_row = row - i
        new_column_index = column_index + i
        if new_row < 1 or new_column_index > 7:
            break
        new_column = columns[new_column_index]
        square = f"{new_row}{new_column}"
        backward_right_diagonal_squares.append (square)

    #left
    for i in range (1, num + 1):
        new_row = row - i
        new_column_index = column_index - i
        if new_row < 1 or new_column_index < 0:
            break
        new_column = columns[new_column_index]
        square = f"{new_row}{new_column}"
        backward_left_diagonal_squares.append (square)

    return backward_right_diagonal_squares, backward_left_diagonal_squares

##get N squares right of given square
def get_right_squares (square_id, num):
    row = int(square_id[0])
    column = square_id[1]
    column_index = columns.index(column)

    right_squares = []

    for i in range (1, num + 1):
        new_column_index = column_index + i
        if new_column_index > 7:
            break
        new_column = columns[new_column_index]
        if 1 <= row <= 8 and 0 <= columns.index(column) <= 7:
            square = f"{row}{new_column}"
            right_squares.append (square)

    return right_squares

##get N squares left of given square
def get_left_squares (square_id, num):
    row = int(square_id[0])
    column = square_id[1]
    column_index = columns.index(column)

    left_squares = []

    for i in range (1, num + 1):
        new_column_index = column_index - i
        if new_column_index < 0:
            break
        new_column = columns[new_column_index]
        if 1 <= row <= 8 and 0 <= columns.index(column) <= 7:
            square = f"{row}{new_column}"
            left_squares.append (square)

    return left_squares

##return if given square is empty
def is_square_empty (square_id, board_state):
    square_id = str(square_id)
    if square_id not in board_state:
        return True
    return board_state.get(square_id) is None

##get piece color on given square
def get_piece_color (square_id, board_state):
    square_id = str(square_id)
    piece = board_state.get(square_id)
    if piece is None:
        return None
    if (piece[0] == 'b'):
        return 'black'
    return 'white'
