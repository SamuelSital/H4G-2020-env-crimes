import os.path as osp
from flask import Flask

with open(osp.dirname(__file__), "data", "dummy.json", 'r') as f:
    data_to_serve = f.read 

app = Flask(__name__)

@app.route('/')
def hello():
    return "This is the "


@app.route('/<name>')
def hello_name(name):
    return "Hello {}!".format(name)

if __name__ == '__main__':
    app.run()

