from flask import Blueprint, render_template, jsonify, request
from .board import setup_board, update_board
from .chess_rules import get_valid_turns, get_computer_move
from .check import is_king_in_check


board_state = {}
routes = Blueprint ('routes', __name__)

##test##

@routes.route('/')
def board():
    return render_template ('board.html')

@routes.route ('/setup_game/<user_color>', methods=['GET'])
def setup_game (user_color):
    global board_state
    board_state = setup_board(user_color)
    return jsonify(board_state)

@routes.route ('/get-valid-turns', methods=['POST'])
def get_valid_turns_route ():
    global board_state
    data = request.get_json()
    piece = data.get('piece')
    color = data.get('color')
    square = data.get('square')
    turn = data.get('turn')
    
    if turn == 'user':
        valid_turns = get_valid_turns (board_state, color, square, turn)
        return jsonify (valid_turns)
    elif turn == 'computer':
        valid_turns = get_computer_move (board_state, color)
        if valid_turns.get('from') is None and valid_turns.get('to') is None:
            if is_king_in_check(board_state, color, turn):
                valid_turns['checkmate'] = True
            else:
                valid_turns['stalemate'] = True
        return jsonify(valid_turns)

@routes.route ('/update-board-state', methods=['POST'])
def update_board_state ():
    global board_state
    data = request.get_json()
    square_from = data.get('from')
    square_to = data.get('to')

    board_state = update_board (square_from, square_to, board_state)
    return jsonify(board_state)