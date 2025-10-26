import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient
from datetime import datetime

load_dotenv()

client = MongoClient(os.getenv("MONGO_LINK"))
db = client["todoList"]
grouptask = db["grouptask"]
app = Flask(__name__)
CORS(app)

@app.route("/api/add-group", methods=["POST"])
def add_group():
    data = request.get_json()
    group_name = str(data.get("groupName", "")).strip()
    username = str(data.get("username", "")).strip()

    if not group_name:
        return jsonify({"success": False, "message": "No group name given!", "data": group_name})
    

    grouptask.insert_one({"groupName": group_name, "username": username, "createdAt": datetime.now()})

    return jsonify({"success": True, "message": "Group created!", "data": group_name})

@app.route("/api/get-groups", methods=["GET"])
def get_groups():
    groups = list(grouptask.find({}, {"_id": 0, "createdAt": 0, "username": 0}))
    return jsonify({"success": True, "message": "Groups recieved", "data": groups})

if __name__ == "__main__":
    app.run(debug=True)