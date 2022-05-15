from flask import Flask
from router import router
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

app.register_blueprint(router.app)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)