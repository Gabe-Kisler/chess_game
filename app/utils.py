
columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

def get_forward_squares (square_id, num):
    row = int(square_id[0])
    column = square_id[1]
    checked = 0

    forward_squares = []
    while checked < num:
        new_row = row + (checked + 1)
        if (new_row > 8):
            break
        square = f"{new_row}{column}"
        forward_squares.append (square)
        checked += 1

    return forward_squares

def get_backwards_squares (square_id, num):

    row = int(square_id[0])
    column = square_id[1]
    checked = 0

    backward_squares = []
    while checked < num:
        new_row = row - (checked + 1)
        if (new_row < 1):
            break
        square = f"{new_row}{column}"
        backward_squares.append (square)
        checked += 1

    return backward_squares



def get_diagonal_squares_forward (square_id, num):
    row = int(square_id[0])
    column = square_id[1]
    column_index = columns.index(column)

    forward_diagonal_squares = []
    # right
    for i in range (1, num + 1):
        new_row = row + i
        new_column_index = column_index + i
        if (new_row > 8 or new_column_index > 7):
            break
        new_column = columns[new_column_index]
        square = f"{new_row}{new_column}"
        forward_diagonal_squares.append (square)
    #left
    for i in range (1, num + 1):
        new_row = row + i
        new_column_index = column_index - i
        if (new_row > 8 or new_column_index < 0):
            break
        new_column = columns[new_column_index]
        square = f"{new_row}{new_column}"
        forward_diagonal_squares.append (square)

    return forward_diagonal_squares

def get_diagonal_squares_backward (square_id, num):
    row = int(square_id[0])
    column = square_id[1]
    column_index = columns.index(column)

    backward_diagonal_squares = []
    # right
    for i in range (1, num + 1):
        new_row = row - i
        new_column_index = column_index + i
        if (new_row < 1 or new_column_index > 7):
            break
        new_column = columns[new_column_index]
        square = f"{new_row}{new_column}"
        backward_diagonal_squares.append (square)

    #left
    for i in range (1, num + 1):
        new_row = row - i
        new_column_index = column_index - i
        if (new_row < 1 or new_column_index < 0):
            break
        new_column = columns[new_column_index]
        square = f"{new_row}{new_column}"
        backward_diagonal_squares.append (square)

    return backward_diagonal_squares

def is_square_empty (square_id, board_state):
    return board_state.get(square_id) == "None"