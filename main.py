from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/about")
def about():
    return render_template('/about/index.html')

@app.route("/games")
def games():
    return render_template('/games/index.html')

@app.route("/developers")
def developers():
    return render_template('/developers/index.html')

@app.route("/platforms")
def platforms():
    return render_template('/platforms/index.html')

@app.route("/characters")
def characters():
    return render_template('/characters/index.html')


if __name__ == "__main__":
    app.run()