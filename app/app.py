from models import *
from json_parser import Parser


db.drop_all()
db.create_all()
parser = Parser()
parser.parse_games()
parser.parse_platforms()
parser.parse_companies()
app.run()