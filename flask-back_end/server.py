from flask import Flask,request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route("/api", methods=["POST"])
def api():
    print(request.get_data())
    return "<h1> hola mundo </h1>"

if __name__ == "__main__":
    app.run(debug = True)
