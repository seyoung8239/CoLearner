from model.mongo import mongoModel
import os

mm = mongoModel()

def verify(uid, pwd):
    userinfo = mm.get_user(uid)
    if userinfo is not None and userinfo["pwd"] == pwd:
        return True
    else:
        return False

def signup(uid, pwd):
    if check_redundancy(uid):
        user_info = {
        "uid" : uid,
        "pwd" : pwd,
        "files" : [{"type":"DIR","parent":-1}],
        }
        mm.set_user(user_info)
        return True
    else:
        return False
    
def check_redundancy(uid):
    user = mm.get_user(uid)
    if user is None:
        return True
    else:
        return False

def files(uid):
    mm.get_files(uid)


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