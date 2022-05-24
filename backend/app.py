from flask import Flask, request, Response, jsonify, Blueprint
from config import Config
from flask_restx import Api, Resource
from services import services as s
from werkzeug.utils import secure_filename
from router import router
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)
app.secret_key = "veryverysecretkey"

app.register_blueprint(router.bp)

CORS(app, resources={r'*':{'origins':['127.0.0.1:5000','127.0.0.1:3000']}})

api = Api(app=app, title="CoLearner API 문서", doc="/api")

@api.route("/")
@api.response(200, '성공')
@api.response(400, '서버 오류')
@api.response(404, '찾을 수 없음')
class Main(Resource):
    def get(self):
        '''메인 페이지'''

@api.route("/signup")
@api.response(200, '성공')
@api.response(400, '서버 오류')
@api.response(404, '찾을 수 없음')
class Signup(Resource):
    def get(self):
        '''회원가입 페이지'''
    
    @api.doc(params={'uid':'아이디', 'pwd':'비밀번호'})
    def post(self, uid, pwd):
        '''회원가입'''

@api.route("/signin")
@api.response(200, '성공')
@api.response(400, '서버 오류')
@api.response(404, '찾을 수 없음')
class Signin(Resource):
    def get(self):
        '''로그인 페이지'''
    
    @api.doc(params={'uid':'아이디', 'pwd':'비밀번호'})
    def post(self, uid, pwd):
        '''로그인'''

@api.route("/logout")
@api.response(200, '성공')
@api.response(400, '서버 오류')
@api.response(404, '찾을 수 없음')
class Logout(Resource):
    def get(self):
        '''로그아웃'''

@api.route("/finder/<id>")
@api.response(200, '성공')
@api.response(400, '서버 오류')
@api.response(404, '찾을 수 없음')
class Finder(Resource):
    @api.doc(params={'id':'찾을 파일 혹은 디렉토리의 id'})
    def get(self, id):
        '''파일 탐색 페이지 (root 디렉토리 id = 0)'''

@api.route("/upload/<id>")
@api.response(200, '성공')
@api.response(400, '서버 오류')
@api.response(404, '찾을 수 없음')
class Upload(Resource):
    @api.doc(params={'id':'파일을 업로드 하는 디렉토리의 id','file':{'type':'file','in':'formData','name':'file','required':False}})
    def post(self, id):
        '''파일 업로드'''
        
@api.route("/makedir/<id>")
@api.response(200, '성공')
@api.response(400, '서버 오류')
@api.response(404, '찾을 수 없음')
class Makedir(Resource):
    @api.doc(params={'dirname':'디렉토리 이름','id':'새 디렉토리를 생성할 디렉토리의 id'})
    def post(self, dirname, id):
        '''새 디렉토리 생성'''

@api.route("/viewer/<id>")
@api.response(200, '성공')
@api.response(400, '서버 오류')
@api.response(404, '찾을 수 없음')
class Viewer(Resource):
    @api.doc(params={'id':'읽어들일 파일의 id', 'pagenum':'읽을 페이지'})
    def get(self, id):
        '''파일 읽기'''
        
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)