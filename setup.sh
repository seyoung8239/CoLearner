#!/usr/bin/bash
cd backend
apt update
apt-get install python3 python3-pip python3-venv

python -m venv venv

source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

touch .env
echo "API_KEY=API KEY HERE" >> .env
echo "DB_URL=DB URL HERE" >> .env

nohup flask run > log.txt 2>&1 &

# start frontend project
apt install -y nodejs npm 
cd ../frontend
pwd
npm i
npm start
