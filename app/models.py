from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://juanmpenaranda@localhost:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


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
    description = db.Column(db.String)
    rating = db.Column(db.Float)
    image_url = db.Column(db.String)
    release_date = db.Column(db.Date)
    # related_game_ids = db.Column(db.Array(db.Integer))

    genre = db.Column(db.Integer, db.ForeignKey('genre.genre_id'))

    developers = db.relationship('Developer', secondary=game_dev_assoc, backref=db.backref('games', lazy='dynamic'))
    platforms = db.relationship('Platform', secondary=game_plat_assoc, backref=db.backref('games', lazy='dynamic'))
    characters = db.relationship('Character', secondary=game_char_assoc, backref=db.backref('games', lazy='dynamic'))

    def __init__(self, game_id, title, description, rating, image_url, release_date, related_game_ids):
        self.game_id = game_id
        self.title = title
        self.description = description
        self.rating = rating
        self.image_url = image_url
        self.release_date = release_date
        self.related_game_ids = related_game_ids

    def __repr__(self):
        return self.title


class Developer(db.Model):
    developer_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    average_rating = db.Column(db.Float)
    website = db.Column(db.String)
    image_url = db.Column(db.String)
    location = db.Column(db.String)
    platforms = db.relationship('Platform', secondary=dev_plat_assoc, backref=db.backref('developers', lazy='dynamic'))

    def __init__(self, developer_id, name, description, average_rating, website, image_url, location):
        self.developer_id = developer_id
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
    description = db.Column(db.String)
    image_url = db.Column(db.String)
    release_date = db.Column(db.Date)
    characters = db.relationship('Character', secondary=plat_char_assoc, backref=db.backref('platforms', lazy='dynamic'))

    def __init__(self, platform_id, name, description, image_url, release_date):
        self.platform_id = platform_id
        self.name = name
        self.description = description
        self.image_url = image_url
        self.release_date = release_date

    def __repr__(self):
        return self.name


class Character(db.Model):
    character_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    summary = db.Column(db.String)
    image_url = db.Column(db.String)
    species = db.Column(db.String)
    gender = db.Column(db.String)
    # friends = db.Column(db.Array(db.Integer))
    # enemies = db.Column(db.Array(db.Integer))

    def __init__(self, character_id, name, summary, image_url, species, gender, friends, enemies):
        self.character_id = character_id
        self.name = name
        self.summary = summary
        self.image_url = image_url
        self.species = species
        self.gender = gender
        self.friends = friends
        self.enemies = enemies
    
    def __repr__(self):
        return self.name


class Genre(db.Model):
    genre_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    db.relationship('Game', backref='genre', lazy='dynamic')

    def __init__(self, genre_id, name):
        self.genre_id = genre_id
        self.name = name

    def __repr__(self):
        return self.name

db.create_all()
app.run()