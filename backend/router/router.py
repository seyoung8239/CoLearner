from flask import request, render_template, redirect, url_for, Blueprint, session, Response, jsonify
from services import services as s

app = Blueprint("main", __name__, url_prefix="/")

@app.route("/")
def index():
    if "uid" in session:
        return jsonify({'message':'true'})
    else:
        return jsonify({'message':'false'})

@app.route("/signup", methods=['GET', 'POST'])
def signup():
    if request.method == 'GET':
        return jsonify({'message':'signup'})
    else:
        uid = request.form.get('userid')
        pwd = request.form.get('password')
        if uid == "":
            return jsonify({'message':'no uid'})
        elif pwd == "":
            return jsonify({'message':'no pwd'})
        
        if s.signup(uid, pwd):
            if s.verify(uid, pwd):
                session["uid"] = uid
                return jsonify({'message':'success'})
        else:
            return jsonify({'message':'fail'})

@app.route("/signin", methods = ['GET', 'POST'])
def signin():
    if "uid" in session:
            return jsonify({'message':'success'})
    else:
        if request.method == 'GET':
            return jsonify({'message':'signin'})
        else:
            uid = request.form['userid']
            pwd = request.form['password']
            if s.verify(uid, pwd):
                session["uid"] = uid
                return jsonify({'message':'success'})
            else:
                return jsonify({'message':'fail'})

@app.route("/logout")
def logout():
    if "uid" in session:
        session.pop("uid")
        return jsonify({'message':'success'})
    else:
        return jsonify({'message':'fail'})

@app.route("/files")
def files():
    pass

@app.route("/upload", methods=['POST'])
def upload():
    pass

@app.route("/mkdir")
def mkdir():
    pass