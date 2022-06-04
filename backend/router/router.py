from flask import request, Blueprint, session, Response, jsonify, send_file
from services import services as s
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin

bp = Blueprint("main", __name__, url_prefix="/")

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
        return jsonify({'message':'fail', 'error':'no uid'})
    elif pwd == None or uid=="":
        return jsonify({'message':'fail', 'error':'no pwd'})
    
    if s.signup(uid, pwd):
        if s.verify(uid, pwd):
            session["uid"] = uid
            return jsonify({'message':'success'})
    else:
        return jsonify({'message':'fail', 'error':'uid already exists'})

@bp.route("/signin", methods = ['POST'])
@cross_origin(supports_credentials=True)
def signin():
    if "uid" in session:
            return jsonify({'message':'success'})
    else:
        uid = request.form['uid']
        pwd = request.form['pwd']
        if s.verify(uid, pwd):
            session["uid"] = uid
            return jsonify({'message':'success'})
        else:
            return jsonify({'message':'fail'})

@bp.route("/logout")
@cross_origin(supports_credentials=True)
def logout():
    if "uid" in session:
        session.pop("uid")
        return jsonify({'message':'success'})
    else:
        return jsonify({'message':'fail', 'error':'not signed in'})

@bp.route("/finder/<id>", methods=['GET'])
@cross_origin(supports_credentials=True)
def finder(id):
    if "uid" in session:
        files = s.check_dir(session["uid"], int(id))
        if isinstance(files, list):
            for f in files:
                f["fileid"] = None
            return jsonify({'message':'dir', 'files':files, 'cdi':int(id), 'uid':session['uid']})
        elif isinstance(files, bool):
            return jsonify({'message':'empty', 'cdi':int(id), 'uid':session['uid']})
        else:
            for f in files:
                f["fileid"] = None
            return jsonify({'message':'file', 'id':int(id), 'file':files})
    else:
        return jsonify({'message':'fail', 'error':'not authorized'})

@bp.route("/upload/<id>", methods=['POST'])
@cross_origin(supports_credentials=True)
def upload(id):
    f = request.files['file']
    if "uid" in session:
        file = s.upload(session["uid"], secure_filename(f.filename), id)
        if file:
            if s.process_file(session["uid"], file):
                return jsonify({'message':'success'})
            else:
                return jsonify({'message':'fail', 'error':'process_file'})    
        else:
            return jsonify({'message':'fail', 'error':'upload'})
    else:
        return jsonify({'message':'fail', 'error':'not authorized'})

@bp.route("/makedir/<id>", methods=['POST'])
@cross_origin(supports_credentials=True)
def makedir(id):
    if "uid" in session:
        dirname = request.form['dirname']
        if s.makedir(session["uid"], dirname, id):
            return jsonify({'message':'success', 'id':id})
        else:
            return jsonify({'message':'fail'})
    else:
        return jsonify({'message':'fail', 'error':'not authorized'})

@bp.route("/viewer/<id>/<pagenum>", methods=['GET'])
@cross_origin(supports_credentials=True)
def viewer(id, pagenum):
    if "uid" in session:
        links = s.get_link(session["uid"], id, pagenum)
        if links:
            return jsonify({'message':'success','links':links["links"]})
        else:
            return jsonify({'message':'fail'})        
        
    # Guest
    else:
        links = s.get_link(None, None, pagenum)
        return jsonify({'message':'success','links':links["links"]})
        
@bp.route("/receive/<id>", methods=['GET'])
@cross_origin(supports_credentials=True)
def receive(id):
    if "uid" in session:
        file = s.file(session["uid"], int(id))
        if file:
            path = s.download(file)
            if path:
                return send_file(path, as_attachment=True)
            else:
                return jsonify({'message' : 'fail', 'error':'download'})    
        else:
            return jsonify({'message' : 'fail', 'error':'get file'})    
    else:
        return jsonify({'message' : 'fail', 'error':'not authorized'})

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
    return send_file(filepath, as_attachment=True)
    

