from flask import request, Blueprint, session, jsonify 
from services import services as s
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from base64 import b64encode
import app

bp = Blueprint("main", __name__, url_prefix="/")

@bp.after_request
def cookies(response):
    same_cookie = app.session_cookie.dumps(dict(session))
    response.headers.add("Set-Cookie", f"my_cookie={same_cookie}; Secure; HttpOnly; SameSite=None; Path=/;")
    return response

@bp.route("/")
@cross_origin(supports_credentials=True)
def index():
    if "uid" in session:
        return jsonify({'message':'success'})
    else:
        return jsonify({'message':'fail'})

@bp.route("/signup", methods=['POST'])
@cross_origin(supports_credentials=True)
def signup():
    uid = request.form['uid']
    pwd = request.form['pwd']
    if uid == None or uid =="":
        return jsonify({'message':'fail', 'error':'no uid'}), 400
    elif pwd == None or uid=="":
        return jsonify({'message':'fail', 'error':'no pwd'}), 400
    
    if s.signup(uid, pwd):
        session["uid"] = uid
        return jsonify({'message':'success'}), 200
    else:
        return jsonify({'message':'fail', 'error':'uid already exists'}), 403

@bp.route("/signin", methods = ['POST'])
@cross_origin(supports_credentials=True)
def signin():
    if "uid" in session:
            return jsonify({'message':'success'}), 200
    else:
        uid = request.form['uid']
        pwd = request.form['pwd']
        if s.verify(uid, pwd):
            session["uid"] = uid
            return jsonify({'message':'success'}), 200
        else:
            return jsonify({'message':'fail'}), 401

@bp.route("/logout")
@cross_origin(supports_credentials=True)
def logout():
    if "uid" in session:
        session.pop("uid")
        return jsonify({'message':'success'}), 200
    else:
        return jsonify({'message':'fail', 'error':'not signed in'}), 401

@bp.route("/finder/<id>", methods=['GET'])
@cross_origin(supports_credentials=True)
def finder(id):
    if "uid" in session:
        files = s.check_dir(session["uid"], int(id))
        if isinstance(files, list):
            for f in files:
                f["fileid"] = None
            return jsonify({'message':'dir', 'files':files, 'cdi':int(id), 'uid':session['uid']}), 200
        elif isinstance(files, bool):
            return jsonify({'message':'empty', 'cdi':int(id), 'uid':session['uid']}), 204
        else:
            for f in files:
                f["fileid"] = None
            return jsonify({'message':'file', 'id':int(id), 'file':files}), 200
    else:
        return jsonify({'message':'fail', 'error':'not authorized'}), 403

@bp.route("/upload/<id>", methods=['POST'])
@cross_origin(supports_credentials=True)
def upload(id):
    f = request.files['file']
    filepath = "./static/files/"+secure_filename(f.filename)
    f.save(filepath)
    
    if "uid" in session:
        file = s.upload(session["uid"], secure_filename(f.filename), id)
        if file:
            if s.process_file(session["uid"], file):
                return jsonify({'message':'success'}), 201
            else:
                return jsonify({'message':'fail', 'error':'process_file'}), 500
        else:
            return jsonify({'message':'fail', 'error':'upload'}), 500
    else:
        return jsonify({'message':'fail', 'error':'not authorized'}), 401

@bp.route("/makedir/<id>", methods=['POST'])
@cross_origin(supports_credentials=True)
def makedir(id):
    if "uid" in session:
        dirname = request.form['dirname']
        if s.makedir(session["uid"], dirname, id):
            return jsonify({'message':'success', 'id':id}), 201
        else:
            return jsonify({'message':'fail'}), 500
    else:
        return jsonify({'message':'fail', 'error':'not authorized'}), 401

@bp.route("/viewer/<id>/<pagenum>", methods=['GET'])
@cross_origin(supports_credentials=True)
def viewer(id, pagenum):
    if "uid" in session:
        links = s.get_link(session["uid"], id, int(pagenum)-1)
        if links:
            return jsonify({'message':'success','links':links["links"]}), 202
        else:
            return jsonify({'message':'fail'}), 500
        
    # Guest
    else:
        links = s.get_link(None, None, pagenum)
        return jsonify({'message':'success','links':links["links"]}), 202
        
@bp.route("/receive/<id>", methods=['GET'])
@cross_origin(supports_credentials=True)
def receive(id):
    if "uid" in session:
        file = s.file(session["uid"], int(id))
        if file:
            path = s.download(file)
            if path:
                with open(path, "rb") as binary_file:
                    encoded_string = b64encode(binary_file.read())
                return jsonify({'message':'success', 'content':encoded_string.decode('utf-8')})
            else:
                return jsonify({'message' : 'fail', 'error':'download'}), 500
        else:
            return jsonify({'message' : 'fail', 'error':'get file'}), 500
    else:
        return jsonify({'message' : 'fail', 'error':'not authorized'}), 401

@bp.route("/guest", methods=['POST'])
@cross_origin(supports_credentials=True)
def guest():
    f = request.files['file']
    filepath = "./static/files/"+secure_filename(f.filename)
    f.save(filepath)
    
    file_info = {
        "type" : f.filename.split(".")[-1].upper(),
        "path" : filepath,
    }
    s.process_file(None, file_info)
    return jsonify({'message':'success'}), 201
    

