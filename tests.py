from unittest import main, TestCase
import json
from app.models import *
from app.app import app
import requests


class DBTests(TestCase):
    def test_create_game(self):
        game = Game(name="Mugman: The Game", description="Best game.", rating=100.0, image_url='https://img00.deviantart.net/6d0a/i/2017/138/e/d/sad_mugman_by_vintage_ink1941-db9m5mi.jpg')
        with app.app_context():
            db.session.add(game)
            db.session.commit()
            query = db.session.query(Game).filter_by(name="Mugman: The Game").first()
            self.assertEqual(query.name, "Mugman: The Game")
            self.assertEqual(query.description, "Best game.")
            self.assertEqual(query.rating, 100.00)
            self.assertEqual(query.image_url, "https://img00.deviantart.net/6d0a/i/2017/138/e/d/sad_mugman_by_vintage_ink1941-db9m5mi.jpg")
            db.session.delete(game)
            db.session.commit()
    
    def test_create_developer(self):
        dev = Developer(name="Big Cat, Fish", description="Best dev.", average_rating=100.0, website='https://www.google.com', 
                        image_url='https://img00.deviantart.net/6d0a/i/2017/138/e/d/sad_mugman_by_vintage_ink1941-db9m5mi.jpg',
                        location='Bolivia')
        with app.app_context():
            db.session.add(dev)
            db.session.commit()
            query = db.session.query(Developer).filter_by(name="Big Cat, Fish").first()
            self.assertEqual(query.name, "Big Cat, Fish")
            self.assertEqual(query.description, "Best dev.")
            self.assertEqual(query.average_rating, 100.00)
            self.assertEqual(query.website, 'https://www.google.com')
            self.assertEqual(query.image_url, "https://img00.deviantart.net/6d0a/i/2017/138/e/d/sad_mugman_by_vintage_ink1941-db9m5mi.jpg")
            self.assertEqual(query.location, 'Bolivia')
            db.session.delete(dev)
            db.session.commit()

    def test_create_platform(self):
        plat = Platform(name="Nintendo Playstation", description="Best console.", website='https://www.google.com', 
                        image_url='https://img00.deviantart.net/6d0a/i/2017/138/e/d/sad_mugman_by_vintage_ink1941-db9m5mi.jpg')
        with app.app_context():
            db.session.add(plat)
            db.session.commit()
            query = db.session.query(Platform).filter_by(name="Nintendo Playstation").first()
            self.assertEqual(query.name, "Nintendo Playstation")
            self.assertEqual(query.description, "Best console.")
            self.assertEqual(query.website, 'https://www.google.com')
            self.assertEqual(query.image_url, "https://img00.deviantart.net/6d0a/i/2017/138/e/d/sad_mugman_by_vintage_ink1941-db9m5mi.jpg")
            db.session.delete(plat)
            db.session.commit()

    def test_create_character(self):
        character = Character(name="Mugman", summary="Best character.", gender='Male', 
                        image_url='https://img00.deviantart.net/6d0a/i/2017/138/e/d/sad_mugman_by_vintage_ink1941-db9m5mi.jpg')
        with app.app_context():
            db.session.add(character)
            db.session.commit()
            query = db.session.query(Character).filter_by(name="Mugman").first()
            self.assertEqual(query.name, "Mugman")
            self.assertEqual(query.summary, "Best character.")
            self.assertEqual(query.gender, 'Male')
            self.assertEqual(query.image_url, "https://img00.deviantart.net/6d0a/i/2017/138/e/d/sad_mugman_by_vintage_ink1941-db9m5mi.jpg")
            db.session.delete(character)
            db.session.commit()
    
    def test_create_genre(self):
        genre = Genre(name="Run and Gun")
        with app.app_context():
            db.session.add(genre)
            db.session.commit()
            query = db.session.query(Genre).filter_by(name="Run and Gun").first()
            self.assertEqual(query.name, "Run and Gun")
            db.session.delete(genre)
            db.session.commit()

    def test_game_get_request(self):
        with app.app_context():
            api_request = requests.get("http://gamingdb.info/api/game/13")
            game_data = json.loads(api_request.text)
            api_id = game_data['game_id']
            api_name = game_data['name']

            db_request = db.session.query(Game).get(13)
            db_id = db_request.game_id
            db_name = db_request.name

            self.assertEqual(api_id, db_id)
            self.assertEqual(api_name, db_name)

    def test_developer_get_request(self):
        with app.app_context():
            api_request = requests.get("http://gamingdb.info/api/developer/21")
            developer_data = json.loads(api_request.text)
            api_id = developer_data['developer_id']
            api_name = developer_data['name']

            db_request = db.session.query(Developer).get(21)
            db_id = db_request.developer_id
            db_name = db_request.name

            self.assertEqual(api_id, db_id)
            self.assertEqual(api_name, db_name)

    def test_platform_get_request(self):
        with app.app_context():
            api_request = requests.get('http://gamingdb.info/api/platform/8')
            platform_data = json.loads(api_request.text)
            api_id = platform_data['platform_id']
            api_name = platform_data['name']

            db_request = db.session.query(Platform).get(8)
            db_id = db_request.platform_id
            db_name = db_request.name

            self.assertEqual(api_id, db_id)
            self.assertEqual(api_name, db_name)

    def test_character_get_request(self):
        with app.app_context():
            api_request = requests.get('http://gamingdb.info/api/character/69')
            character_data = json.loads(api_request.text)
            api_id = character_data['character_id']
            api_name = character_data['name']

            db_request = db.session.query(Character).get(69)
            db_id = db_request.character_id
            db_name = db_request.name

            self.assertEqual(api_id, db_id)
            self.assertEqual(api_name, db_name)

    def test_get_first_game_alphabetically(self):
        with app.app_context():
            api_request = requests.get('http://gamingdb.info/api/game?q={"order_by":[{"field":"name","direction":"asc"}]}')
            games_data = json.loads(api_request.text)
            api_id = games_data['objects'][0]['game_id']
            api_name = games_data['objects'][0]['name']

            db_request = db.session.query(Game).order_by(Game.name)
            db_id = db_request[0].game_id
            db_name = db_request[0].name

            self.assertEqual(api_id, db_id)
            self.assertEqual(api_name, db_name)

    def test_get_first_platform_alphabetically(self):
        with app.app_context():
            api_request = requests.get('http://gamingdb.info/api/platform?q={"order_by":[{"field":"name","direction":"asc"}]}')
            platform_data = json.loads(api_request.text)
            api_id = platform_data['objects'][0]['platform_id']
            api_name = platform_data['objects'][0]['name']

            db_request = db.session.query(Platform).order_by(Platform.name)
            db_id = db_request[0].platform_id
            db_name = db_request[0].name

            self.assertEqual(api_id, db_id)
            self.assertEqual(api_name, db_name)

    def test_get_first_developer_rating(self):
        with app.app_context():
            api_request = requests.get('http://gamingdb.info/api/developer?q={"order_by":[{"field":"average_rating","direction":"asc"}]}')
            developer_data = json.loads(api_request.text)
            api_id = developer_data['objects'][0]['developer_id']
            api_average_rating = developer_data['objects'][0]['average_rating']

            db_request = db.session.query(Developer).order_by(Developer.average_rating)
            db_id = db_request[0].developer_id
            db_average_rating = db_request[0].average_rating

            self.assertEqual(api_id, db_id)
            self.assertEqual(api_average_rating, db_average_rating)

    def test_get_first_character_alphabetically(self):
        with app.app_context():
            api_request = requests.get('http://gamingdb.info/api/character?q={"order_by":[{"field":"name","direction":"asc"}]}')
            character_data = json.loads(api_request.text)
            api_id = character_data['objects'][0]['character_id']
            api_name = character_data['objects'][0]['name']

            db_request = db.session.query(Character).order_by(Character.name)
            db_id = db_request[0].character_id
            db_name = db_request[0].name

            self.assertEqual(api_id, db_id)
            self.assertEqual(api_name, db_name)

    def test_get_game_filter(self):
        with app.app_context():
            api_request = requests.get('http://gamingdb.info/api/game?q={"filters":[{"name":"rating","op":">=","val":"69"}]}')
            game_data = json.loads(api_request.text)
            api_id = game_data['objects'][0]['game_id']
            api_name = game_data['objects'][0]['name']

            db_request = db.session.query(Game).filter(Game.rating >= 69)
            db_id = db_request[0].game_id
            db_name = db_request[0].name

            self.assertEqual(api_id, db_id)
            self.assertEqual(api_name, db_name)

    def test_get_character_filter(self):
        with app.app_context():
            api_request = requests.get('http://gamingdb.info/api/character?q={"filters":[{"name":"average_rating","op":">=","val":"69"}]}')
            character_data = json.loads(api_request.text)
            api_id = character_data['objects'][0]['character_id']
            api_name = character_data['objects'][0]['name']

            db_request = db.session.query(Character).filter(Character.average_rating >= 96)
            db_id = db_request[0].character_id
            db_name = db_request[0].name

            self.assertEqual(api_id, db_id)
            self.assertEqual(api_name, db_name)
        
if __name__ == "__main__":
    main()