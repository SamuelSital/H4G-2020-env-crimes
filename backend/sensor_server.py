import os.path as osp
from flask import jsonify, Flask
import json

data = json.load(open(osp.join(osp.dirname(__file__), "data", "dummy_data1.json"), 'r'))

app = Flask(__name__)

@app.route('/')
def hello():
    return "This is the data server!"


@app.route('/posts', methods=["GET"])
def posts(name):
    return jsonify(data)


if __name__ == '__main__':
    app.run()
