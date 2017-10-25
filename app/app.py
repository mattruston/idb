from flask import Flask
from flask_restless import APIManager
from flask_cors import CORS
from models import *
from json_parser import Parser

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://:juanmpenaranda@localhost:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
db.init_app(app)

with app.app_context():
    manager = APIManager(app, flask_sqlalchemy_db=db)
    manager.create_api(Game, methods=['GET'], results_per_page=8)
    manager.create_api(Developer, methods=['GET'], results_per_page=8)
    manager.create_api(Platform, methods=['GET'], results_per_page=8)
    manager.create_api(Character, methods=['GET'], results_per_page=8)
    manager.create_api(Genre, methods=['GET'], results_per_page=8)

    db.drop_all()
    db.create_all()
    parser = Parser()
    parser.parse_games()
    parser.parse_companies()
    parser.parse_platforms()
    parser.parse_characters()
    parser.add_related_games()

if __name__ == '__main__':
    app.run()
