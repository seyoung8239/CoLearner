from pyrebase import pyrebase
import json

class firebaseModel:
    def __init__(self):
        with open("../auth/firebase_auth.json") as f:
            config = json.load(f)

        firebase = pyrebase.initialize_app(config)
        self.db = firebase.database()
        self.storage = firebase.storage()
        self.id = 0

    def get_users(self):
        return self.db.child("users").get().val()

    def set_user(self, uid, user_info):
        self.db.child("users").child(uid).set(user_info)

    def get_files(self, uid):
        try:
            files = self.db.child("users").child(uid).child("files").get().val()
            if files is None:
                return False
            else:
                return files
        except:
            return False
    
    def set_file(self, uid, name, file_info):
        self.db.child("users").child(uid).child("files").child(name).set(file_info)

    def store_file(self, storage_path, file_path):
        self.storage.child(storage_path).put(file_path)

    def init_storage(self, uid):
        self.storage.child(uid).put(None)