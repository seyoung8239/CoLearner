from flask import Flask, session
from flask.sessions import SecureCookieSessionInterface
from config import Config
from flask_restx import Api, Resource
from services import services as s
from werkzeug.utils import secure_filename
from router import router
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config.from_object(Config)
app.config.update( SESSION_COOKIE_NAME="my_cookie") 
app.secret_key = "veryverysecretkey"

app.register_blueprint(router.bp)

CORS(app, resources={r'*':{'origins':['127.0.0.1:5000','http://127.0.0.1:3000', 'http://localhost:3000', 'http://colearner-fe.s3-website.ap-northeast-2.amazonaws.com']}})

session_cookie = SecureCookieSessionInterface().get_signing_serializer(app)

api = Api(app=app, title="CoLearner API 문서", doc="/api")


@app.after_request
def cookies(response):
    same_cookie = session_cookie.dumps(dict(session))
    print('cookie!')
    response.set_cookie('my_cookie', same_cookie, samesite='None', secure=True)
    return response

@api.route("/")
class Main(Resource):
    @api.doc(responses={200:'성공', 201:'생성 완료', 202:'허락됨', 204:'보내줄 콘텐츠 없음',400:'서버 오류', 401:'미승인', 403:'거절됨',404:'찾을 수 없음'})
    def get(self):
        '''메인 페이지'''

@api.route("/signup")
class Signup(Resource):
    @api.doc(responses={200:'성공', 201:'생성 완료', 202:'허락됨', 204:'보내줄 콘텐츠 없음',400:'서버 오류', 401:'미승인', 403:'거절됨',404:'찾을 수 없음'})
    @api.doc(params={'uid':{'type':'string','in':'formData','name':'uid','description':'아이디'}, 'pwd':{'type':'string','in':'formData','name':'pwd','description':'비밀번호'}})
    def post(self, uid, pwd):
        '''회원가입'''

@api.route("/signin")
class Signin(Resource):
    @api.doc(responses={200:'성공', 201:'생성 완료', 202:'허락됨', 204:'보내줄 콘텐츠 없음',400:'서버 오류', 401:'미승인', 403:'거절됨',404:'찾을 수 없음'})
    @api.doc(params={'uid':{'type':'string','in':'formData','name':'uid','description':'아이디'}, 'pwd':{'type':'string','in':'formData','name':'pwd','description':'비밀번호'}})
    def post(self, uid, pwd):
        '''로그인'''

@api.route("/logout")
class Logout(Resource):
    @api.doc(responses={200:'성공', 201:'생성 완료', 202:'허락됨', 204:'보내줄 콘텐츠 없음',400:'서버 오류', 401:'미승인', 403:'거절됨',404:'찾을 수 없음'})
    def get(self):
        '''로그아웃'''

@api.route("/finder/<id>")
class Finder(Resource):
    @api.doc(responses={200:'성공', 201:'생성 완료', 202:'허락됨', 204:'보내줄 콘텐츠 없음',400:'서버 오류', 401:'미승인', 403:'거절됨',404:'찾을 수 없음'})
    @api.doc(params={'id':'찾을 파일 혹은 디렉토리의 id'})
    def get(self, id):
        '''파일 탐색 페이지 (root 디렉토리 id = 0)'''

@api.route("/upload/<id>")
class Upload(Resource):
    @api.doc(responses={200:'성공', 201:'생성 완료', 202:'허락됨', 204:'보내줄 콘텐츠 없음',400:'서버 오류', 401:'미승인', 403:'거절됨',404:'찾을 수 없음'})
    @api.doc(params={'id':'현재 디렉토리','file':{'type':'file','in':'formData','name':'file','description':'업로드 할 파일'}})
    def post(self, id):
        '''파일 업로드'''
        
@api.route("/makedir/<id>")
class Makedir(Resource):
    @api.doc(responses={200:'성공', 201:'생성 완료', 202:'허락됨', 204:'보내줄 콘텐츠 없음',400:'서버 오류', 401:'미승인', 403:'거절됨',404:'찾을 수 없음'})
    @api.doc(params={'dirname':{'type':'string','in':'formData','name':'dirname','description':'디렉토리 이름'},'id':'새 디렉토리를 생성할 디렉토리의 id'})
    def post(self, dirname, id):
        '''새 디렉토리 생성'''

@api.route("/viewer/<id>/<pagenum>")
class Viewer(Resource):
    @api.doc(responses={200:'성공', 201:'생성 완료', 202:'허락됨', 204:'보내줄 콘텐츠 없음',400:'서버 오류', 401:'미승인', 403:'거절됨',404:'찾을 수 없음'})
    @api.doc(params={'id':'읽어들일 파일의 id', 'pagenum':'읽을 페이지'})
    def get(self, id, pagenum):
        '''파일 뷰어'''

@api.route("/receive/<id>")
class Receive(Resource):
    @api.doc(responses={200:'성공', 201:'생성 완료', 202:'허락됨', 204:'보내줄 콘텐츠 없음',400:'서버 오류', 401:'미승인', 403:'거절됨',404:'찾을 수 없음'})
    @api.doc(params={'id': '받을 파일의 id'})
    def get(self, id):
        '''파일 요청'''

@api.route("/guest")
class Guest(Resource):
    @api.doc(responses={200:'성공', 201:'생성 완료', 202:'허락됨', 204:'보내줄 콘텐츠 없음',400:'서버 오류', 401:'미승인', 403:'거절됨',404:'찾을 수 없음'})
    @api.doc(params={'file':{'type':'file','in':'formData','name':'file','description':'업로드 할 파일'}})
    def post(self):
        '''비회원으로 파일 업로드'''

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)