from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os
from dotenv import load_dotenv
from controllers import search_controller, startups_controller

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/", methods=['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'])
def home():
    return jsonify(data=f'server says : get request on time : {datetime.now().strftime("%H:%M:%S")}'), 200

# app.register_blueprint(qdrant_controller.qdrantData)
app.register_blueprint(search_controller.searchData, url_prefix='/search')
app.register_blueprint(startups_controller.startupRouter, url_prefix='/startups')

if __name__ == "__main__":
    port = int(os.getenv("PORT", 3009))
    app.run(port=port, debug=True)