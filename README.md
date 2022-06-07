# CoLearner
강의자료 기반 공부자료 추천 서비스입니다

KNU Open Source Programming2022 Team3 

[프로젝트 상세 확인 Notion](https://www.notion.so/CoLearner-095eac63c2884f44baeade45b6b6820d) 

# 주요기능
- session기반 회원인증
- 파일시스템을 통해 pdf파일, 디렉터리 관리
- pdf 뷰어
- pdf 페이지 기반 강의자료 추천

# 기술스택
## Frontend
- TypeScript
- React
- Zustand

## Backend
- Flask

## DevOps
- Git
- Docker
- AWS EC2

# 실행방법
## backend
### Local Server
python >= 3.8 

ubuntu:20.04 
```
$ cd backend
$ python -m venv venv
$ source venv/bin/activate
$ pip install -r requirements.txt
$ flask run
```
### Docker
```
$ docker pull seyoung8239/colearner
$ docker run -p 5000:5000 seyoung8239/colearner
```
## frontend
node >= 16.15.1 LTS
```
$ cd frontend
$ npm i
$ npm start
```
## API Docs
Swagger UI 기반의 RESTful API 문서 

`http://localhost:5000/api`

