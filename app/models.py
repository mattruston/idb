from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects import postgresql


db = SQLAlchemy()


game_genre_assoc = db.Table('game_genre',
        db.Column('game_id', db.Integer, db.ForeignKey('game.game_id')),
        db.Column('genre_id', db.Integer, db.ForeignKey('genre.genre_id'))
)

game_dev_assoc = db.Table('game_dev',
        db.Column('game_id', db.Integer, db.ForeignKey('game.game_id')),
        db.Column('developer_id', db.Integer, db.ForeignKey('developer.developer_id'))
)

game_plat_assoc = db.Table('game_plat',
        db.Column('game_id', db.Integer, db.ForeignKey('game.game_id')),
        db.Column('platform_id', db.Integer, db.ForeignKey('platform.platform_id'))
)


game_char_assoc = db.Table('game_char',
        db.Column('game_id', db.Integer, db.ForeignKey('game.game_id')),
        db.Column('character_id', db.Integer, db.ForeignKey('character.character_id'))
) 


dev_plat_assoc = db.Table('dev_plat',
        db.Column('developer_id', db.Integer, db.ForeignKey('developer.developer_id')),
        db.Column('platform_id', db.Integer, db.ForeignKey('platform.platform_id'))
)


plat_char_assoc = db.Table('plat_char',
        db.Column('platform_id', db.Integer, db.ForeignKey('platform.platform_id')),
        db.Column('character_id', db.Integer, db.ForeignKey('character.character_id'))
)


class Game(db.Model):
    game_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String, nullable=True)
    rating = db.Column(db.Float, nullable=True)
    image_url = db.Column(db.String, nullable=True)
    release_date = db.Column(db.Date, nullable=True)
    # related_game_ids = db.Column(postgresql.ARRAY(db.Integer))
    screenshot_urls = db.Column(postgresql.ARRAY(db.String), nullable=True)

    genres = db.relationship('Genre', secondary=game_genre_assoc, backref=db.backref('games', lazy='dynamic'))
    developers = db.relationship('Developer', secondary=game_dev_assoc, backref=db.backref('games', lazy='dynamic'))
    platforms = db.relationship('Platform', secondary=game_plat_assoc, backref=db.backref('games', lazy='dynamic'))
    characters = db.relationship('Character', secondary=game_char_assoc, backref=db.backref('games', lazy='dynamic'))

    def __init__(self, title, description=None, rating=None, image_url=None, release_date=None, screenshot_urls=None):
        self.title = title
        self.description = description
        self.rating = rating
        self.image_url = image_url
        self.release_date = release_date
        self.screenshot_urls = screenshot_urls

    def __repr__(self):
        return self.title


class Developer(db.Model):
    developer_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String, nullable=True)
    average_rating = db.Column(db.Float, nullable=True)
    website = db.Column(db.String, nullable=True)
    image_url = db.Column(db.String, nullable=True)
    location = db.Column(db.String, nullable=True)
    platforms = db.relationship('Platform', secondary=dev_plat_assoc, backref=db.backref('developers', lazy='dynamic'))

    def __init__(self, name, description=None, average_rating=None, website=None, image_url=None, location=None):
        self.name = name
        self.description = description
        self.average_rating = average_rating
        self.website = website
        self.image_url = image_url
        self.location = location

    def __repr__(self):
        return self.name


class Platform(db.Model):
    platform_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String, nullable=True)
    image_url = db.Column(db.String, nullable=True)
    release_date = db.Column(db.Date, nullable=True)
    website = db.Column(db.String, nullable=True)
    characters = db.relationship('Character', secondary=plat_char_assoc, backref=db.backref('platforms', lazy='dynamic'))

    def __init__(self, name, description=None, image_url=None, release_date=None, website=None):
        self.name = name
        self.description = description
        self.image_url = image_url
        self.release_date = release_date
        self.website = website

    def __repr__(self):
        return self.name


class Character(db.Model):
    character_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    summary = db.Column(db.String, nullable=True)
    image_url = db.Column(db.String, nullable=True)
    species = db.Column(db.String, nullable=True)
    gender = db.Column(db.String, nullable=True)
    score = db.Column(db.Integer, nullable=True)
    # friends = db.Column(db.Array(db.Integer))
    # enemies = db.Column(db.Array(db.Integer))

    def __init__(self, name, summary=None, image_url=None, species=None, gender=None, score=None):
        self.name = name
        self.summary = summary
        self.image_url = image_url
        self.species = species
        self.gender = gender
        # self.friends = friends
        # self.enemies = enemies

    def __repr__(self):
        return self.name


class Genre(db.Model):
    genre_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return self.name