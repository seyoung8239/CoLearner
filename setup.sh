#!/usr/bin/bash
cd backend
apt update
apt-get install python3 python3-pip python3-venv

python -m venv venv

source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

touch .env
echo "API_KEY=AIzaSyDpfOdjNdYlEiOngbhmRF-MZWlF8rOdnEM" >> .env
echo "DB_URL=mongodb+srv://admin:admin@cluster0.soqt1rm.mongodb.net/?retryWrites=true&w=majority" >> .env

nohup flask run > log.txt 2>&1 &

# start frontend project
apt install -y nodejs npm 
cd ../frontend
pwd
npm i
npm start