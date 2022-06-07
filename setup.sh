cd backend

python -m venv venv

source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

touch .env
echo "API_KEY=AIzaSyDpfOdjNdYlEiOngbhmRF-MZWlF8rOdnEM" >> .env
ehco "DB_URL=mongodb+srv://admin:admin@cluster0.soqt1rm.mongodb.net/?retryWrites=true&w=majority" >> .env

flask run
gnome-terminal

# start frontend project
cd frontend
npm i
npm start