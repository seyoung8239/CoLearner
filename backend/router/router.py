from flask import request, Blueprint, session, Response, jsonify
from bson.json_util import dumps
from services import services as s
from werkzeug.utils import secure_filename

bp = Blueprint("main", __name__, url_prefix="/")

@bp.route("/")
def index():
    if "uid" in session:
        return jsonify({'message':'success'})
    else:
        return jsonify({'message':'fail'})

@bp.route("/signup", methods=['GET', 'POST'])
def signup():
    if request.method == 'GET':
        return jsonify({'message':'signup'})
    else:
        uid = request.form['uid']
        pwd = request.form['pwd']
        if uid == None or uid =="":
            return jsonify({'message':'no uid'})
        elif pwd == None or uid=="":
            return jsonify({'message':'no pwd'})
        
        if s.signup(uid, pwd):
            if s.verify(uid, pwd):
                session["uid"] = uid
                return jsonify({'message':'success'})
        else:
            return jsonify({'message':'fail'})

@bp.route("/signin", methods = ['GET', 'POST'])
def signin():
    if "uid" in session:
            return jsonify({'message':'success'})
    else:
        if request.method == 'GET':
            print('already in session')
            return jsonify({'message':'signin'})
        else:
            print(request.method)
            uid = request.form['uid']
            print(uid)
            pwd = request.form['pwd']
            print(pwd)
            if s.verify(uid, pwd):
                print("valid")
                session["uid"] = uid
                print(uid)
                return jsonify({'message':'success'})
            else:
                print("invalid")
                return jsonify({'message':'fail'})

@bp.route("/logout")
def logout():
    if "uid" in session:
        session.pop("uid")
        return jsonify({'message':'success'})
    else:
        return jsonify({'message':'fail'})

@bp.route("/finder/<id>")
def finder(id):
    files = s.check_dir(session["uid"], int(id))
    print(session['uid'])
    print(id)
    if isinstance(files, list):
        return jsonify({'message':'dir', 'files':dumps(files), 'cdi':int(id), 'uid':session['uid']})
    elif isinstance(files, bool):
        return jsonify({'message':'empty', 'cdi':int(id), 'uid':session['uid']})
    else:
        return jsonify({'message':'file', 'id':int(id), 'file':dumps(files)})

@bp.route("/upload/<id>", methods=['POST'])
def upload(id):
    f = request.files['file']
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

@bp.route("/makedir/<id>", methods=['POST'])
def makedir(id):
    dirname = request.args.get('dirname')
    if s.makedir(session["uid"], dirname, id):
        return jsonify({'message':'success', 'id':id})
    else:
        return jsonify({'message':'fail'})

@bp.route("/viewer/<id>", methods=['GET'])
def viewer(id):
    if "uid" in session:
        pr, ft = s.read_file(s.file(session["uid"], int(id)))
        pagenum = request.args.get('pagenum')
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