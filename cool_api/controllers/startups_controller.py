
from flask import Blueprint
from .startups_service import upload, search_startups, startup_list

startupRouter = Blueprint('startupData', __name__)

# @strtupRouter.route('/add', methods=['GET'])
# def add_startup_route():
#     return add_startup()

@startupRouter.route('/upload', methods=['GET'])
def upload_embeddings_route():
    return upload()

@startupRouter.route('/search', methods=['GET'])
def search_startup_route():
    return search_startups()

@startupRouter.route('/list', methods=['GET'])
def startup_list_route():
    return startup_list()
