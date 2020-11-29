import os.path as osp
from flask import jsonify, Flask
import json
import os
from flask_cors import CORS




posts_data = json.load(open(osp.join(osp.dirname(__file__), "data", "dummy_data1.json"), 'r'))
users_data = json.load(open(osp.join(osp.dirname(__file__), "data", "users.json"), 'r'))

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return "This is the data server!"

@app.route('/users')
def users():
    return jsonify(users_data)


@app.route('/posts')
def posts():
    return jsonify(posts_data)


if __name__ == '__main__':
    app.run(host="0.0.0.0")
