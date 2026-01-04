import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient
from datetime import datetime
from email.mime.text import MIMEText
import smtplib

load_dotenv()

client = MongoClient(os.getenv("MONGO_LINK"))
base_email = os.getenv("BASE_EMAIL")
base_password = os.getenv("BASE_PASSWORD")
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
    
    if grouptask.find_one({"groupName": group_name}):
        return jsonify({"success": False, "message": "Group already exists"})
    

    grouptask.insert_one({"groupName": group_name, "username": username, "taskArray": [], "createdAt": datetime.now()})

    return jsonify({"success": True, "message": "Group created!", "data": group_name})

@app.route("/api/get-groups", methods=["GET"])
def get_groups():
    groups = list(grouptask.find({}, {"_id": 0, "createdAt": 0, "username": 0}))
    return jsonify({"success": True, "message": "Groups recieved", "data": groups})

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()
    first_name = data.get("firstName", "").strip()
    last_name = data.get("lastName", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()
    
    if not email or not message or not first_name or not last_name:
        return jsonify({"success": False, "message": "Fill in all the data."})
    
    full_name = f"{first_name} {last_name}"
    msg = MIMEText(f"From: {full_name}\n\n {message}")
    msg["Subject"] = f"New Message From: {full_name}"
    msg["To"] = base_email
    msg["From"] = base_email
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(base_email, base_password)
            server.sendmail(base_email, base_email, msg.as_string())
            return jsonify({"success": True, "message": "Email sent!"})
    except Exception as e:
        return jsonify({"success": False, "message": "Email sent fail"})
    
@app.route("/api/get-task", methods=["GET"])
def get_task():
    group_name = request.args.get("q", "").strip()
    

    if not group_name:
        return jsonify({"success": False, "message": "No task name"})

    
    
    task = grouptask.find_one({"groupName": group_name})
    if not task:
        return jsonify({"success": False, "message": "Group not found"})

    return jsonify({"success": True, "message": "Tasks recieved", "data": task.get("taskArray", [])})

@app.route("/api/remove-task", methods=["POST"])
def remove_task():
    data = request.get_json()
    task_name = data.get("taskName", "").strip()
    group_name = data.get("groupName", "").strip()

    if not grouptask.find_one({"groupName": group_name}):
        return jsonify({"success": False, "message": "Group does not exist", "data": [task_name, group_name]})
    
    group = grouptask.find_one({"groupName": group_name})
    task_list = group["taskArray"]
    if task_name not in task_list:
        return jsonify({"success": False, "message": "Task not in list", "data": [task_name, group_name]})
    task_list.remove(task_name)
    grouptask.update_one({"_id": group["_id"]}, {"$set": {"taskArray": task_list}})
    return jsonify({"success": True, "message": "Task removed", "data": [task_name, group_name]})



if __name__ == "__main__":
    app.run(debug=True)