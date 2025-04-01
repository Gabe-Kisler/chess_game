from flask import Blueprint, render_template, jsonify, request
from .board import setup_board
from .chess_rules import get_valid_turns
import uuid

board_state = {}
routes = Blueprint ('routes', __name__)

@routes.route('/')
def board():
    return render_template ('board.html')

@routes.route ('/setup_game/<user_color>', methods=['GET'])
def setup_game (user_color):
    board_state = setup_board(user_color)
    return jsonify(board_state)

@routes.route ('/get-valid-turns', methods=['POST'])
def get_valid_turns_route (piece, color):
    data = request.get_json()
    piece = data.get('piece')
    color = data.get('color')
    square = data.get('square')
    
    valid_turns = get_valid_turns (board_state, color, square)
    return jsonify(valid_turns)