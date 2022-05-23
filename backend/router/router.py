from flask import request, render_template, redirect, url_for, Blueprint, session, Response, jsonify
from services import services as s
from werkzeug.utils import secure_filename

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

@app.route("/finder/<id>")
def finder(id):
    files = s.check_dir(session["uid"], int(id))
    if isinstance(files, list):
        return jsonify({'message':'dir', 'files':files, 'cdi':int(id), 'uid':session['uid']})
    elif isinstance(files, bool):
        return jsonify({'message':'empty', 'cdi':int(id), 'uid':session['uid']})
    else:
        return jsonify({'message':'file', 'id':int(id)})

@app.route("/upload/<id>", methods=['POST'])
def upload(id):
    f = request.files['filename']
    filepath = "./static/files/"+secure_filename(f.filename)
    f.save(filepath)

    if "uid" in session:
        if s.upload(session["uid"], secure_filename(f.filename), id):
            return jsonify({'message':'success', 'id':int(id)})
        else:
            return jsonify({'message':'fail'})
    else:
        file_info = {
        "name" : f.filename.split(".")[0],
        "type" : f.filename.split(".")[-1].upper(),
        }
        return jsonify({'message':'success', 'id':0, 'file_info':file_info})

@app.route("/makedir/<id>", methods=['POST'])
def makedir(id):
    dirname = request.form['dirname']
    if s.makedir(session["uid"], dirname, id):
        return jsonify({'message':'success', 'id':id})
    else:
        return jsonify({'message':'fail'})

@app.route("/viewer/<id>", methods=['GET'])
def viewer(id):
    if "uid" in session:
        pr, ft = s.read_file(s.file(session["uid"], int(id)))
        if pr == None or ft == None:
            return jsonify({'message':'fail'})
        else:
            content = s.read_page(pr, int(pagenum), ft)
            return jsonify({'message':'success','content':content})
    else:
        file_info = request.args['fileinfo']
        pr, ft = s.read_file(file_info)
        if pr == None or ft == None:
            return jsonify({'message':'fail'})
        else:
            content = s.read_page(pr, int(pagenum), ft)
            return jsonify({'message':'success','content':content})