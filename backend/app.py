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
    group_name = request.get_json("groupName")
    username = request.get_json("username")

    if not group_name:
        return jsonify({"success": False, "message": "No group name given!", "data": group_name})
    

    grouptask.insert_one({"groupName": group_name, "username": username, "createdAt": datetime.now()})

    return jsonify({"success": True, "message": "Group created!", "data": group_name})

if __name__ == "__main__":
    app.run(debug=True)