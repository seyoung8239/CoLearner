
from backend.model.firebase_model import firebaseModel
import os

fm = firebaseModel()
id = 0

def login(uid, pwd):
    users = fm.get_users()
    try:
        userinfo = users[uid]
        if userinfo["pwd"] == pwd:
            return True
        else:
            return False
    except:
        return False

def register(uid, pwd):
    if verification(uid):
        fm.init_storage(uid)
        user_info = {
        "pwd" : pwd,
        }
        fm.set_user(uid, user_info)
        return True
    else:
        return False
    
def verification(uid):
    users = fm.get_users()
    for userid in users:
        if uid == userid:
            return False
    return True

def files(uid):
    fm.get_files(uid)


def upload_file(self, uid, filename, current_dir_id):
    id += 1

    #Storage 업로드
    file_path = "./static/files/"+filename
    storage_path = uid+"/"+filename
    fm.store_file(storage_path, file_path)

    #DB 반영
    file_info = {
        "id" : id,
        "name" : filename.split(".")[0],
        "type" : os.path.splitext(file_path)[1].lstrip(".").upper(),
        "filepath" : self.storage.child(storage_path).get_url(filename),
        "parent" : current_dir_id
    }
    fm.set_file(uid, file_info["name"], file_info)

def mkdir(uid):
    pass