
from flask import Blueprint
from .search_service import add_books, search_books, all_books

searchData = Blueprint('searchData', __name__)

@searchData.route('/add-books', methods=['GET'])
def add_books_route():
    return add_books()

@searchData.route('/books', methods=['GET'])
def search_books_route():
    return search_books()

# all_books

@searchData.route('/all-books', methods=['GET'])
def all_books_route():
    return all_books()

# @searchData.route('/llm', methods=['GET'])
# def all_books_route():
#     return all_books()


