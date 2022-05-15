from flask import request, render_template, redirect, url_for, Blueprint

app = Blueprint("main", __name__, url_prefix="/")

@app.route("/")
def index():
    return "hi"

@app.route("/files")
def files():
    pass

@app.route("/upload", methods=['POST'])
def upload():
    pass

@app.route("/mkdir")
def mkdir():
    pass

@app.route("/register", methods=['GET', 'POST'])
def register():
    pass

@app.route("/login", methods = ['GET', 'POST'])
def login():
    pass

@app.route("/logout")
def logout():
    pass