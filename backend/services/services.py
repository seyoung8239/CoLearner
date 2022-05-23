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

def files(uid, id):
    mm.get_files(uid, id)

def file(uid, id):
    return mm.get_file(uid, id)

def check_dir(uid, id):
    if id == 0:
        return files(uid, id)
    else:
        file_info = file(uid, id)
        if file_info["type"] == "DIR":
            return files(uid, id)
        else:
            return file_info

def upload(uid, filename, cdi):
    file_path = "./static/files/"+filename
    file_info = {
        "name" : filename.split(".")[0],
        "type" : filename.split(".")[-1].upper(),
        "parent" : int(cdi),
    }
    with open(file_path, "rb") as f:
        if mm.put_file(uid, f, file_info):
            return True
        else:
            return False

def makedir(uid, dirname, cdi):
    dir_info = {
        "name" : dirname,
        "type" : "DIR",
        "parent" : int(cdi)
    }
    if mm.put_file(uid, None, dir_info):
        return True
    else:
        return False

