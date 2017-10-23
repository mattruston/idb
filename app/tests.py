from unittest import main, TestCase
import json
from models import *
from app import app


class DBTests(TestCase):
    def test_create_game(self):
        game = Game(title="Mugman: The Game", description="Best game.", rating=100.0, image_url='https://img00.deviantart.net/6d0a/i/2017/138/e/d/sad_mugman_by_vintage_ink1941-db9m5mi.jpg')
        with app.app_context():
            db.session.add(game)
            db.session.commit()
            query = db.session.query(Game).filter_by(title="Mugman: The Game").first()
            self.assertEqual(query.title, "Mugman: The Game")
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
        character = Character(name="Mugman", summary="Best character.", gender='Male', species='Mug', 
                        image_url='https://img00.deviantart.net/6d0a/i/2017/138/e/d/sad_mugman_by_vintage_ink1941-db9m5mi.jpg')
        with app.app_context():
            db.session.add(character)
            db.session.commit()
            query = db.session.query(Character).filter_by(name="Mugman").first()
            self.assertEqual(query.name, "Mugman")
            self.assertEqual(query.summary, "Best character.")
            self.assertEqual(query.gender, 'Male')
            self.assertEqual(query.species, 'Mug')
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
        
if __name__ == "__main__":
    main()