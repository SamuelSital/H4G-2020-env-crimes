import os.path as osp
from flask import jsonify, Flask
import json
import os
from flask_cors import CORS




data = json.load(open(osp.join(osp.dirname(__file__), "data", "dummy_data1.json"), 'r'))

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return "This is the data server!"

@app.route('/users')
def users():
    user = {"data":[{"id": "1", "data": "tst"}]}
    return jsonify(user)


@app.route('/posts')
def posts():
    return jsonify(data)


certificate_path = osp.join(os.environ['HOME'], 'cert')
if __name__ == '__main__':
    context = (osp.join(certificate_path, 'cert.pem'), osp.join(certificate_path, 'key.pem'))#certificate and key files
    app.run(host="0.0.0.0", ssl_context=context)
