
import requests
from flask import request, jsonify
from sentence_transformers import SentenceTransformer
import json
import numpy as np
# from qdrant_client import models, QdrantClient
# from qdrant_client.models import VectorParams, Distance
from qdrant_client import QdrantClient, models

VectorParams, Distance = models.VectorParams, models.Distance

encoder = SentenceTransformer("all-MiniLM-L6-v2")
COLLECTION_NAME = "startups"

def upload():
    try:
        client = QdrantClient("localhost", port=6333);

        # client.set_model(EMBEDDINGS_MODEL)

        vectors = np.load('/Users/k9966/Documents/My Projects/ask_book/cool_api/controllers/vectors.npy')
        
        fd = '/Users/k9966/Documents/My Projects/ask_book/cool_api/controllers/startups_demo.json'
        
        with open('/Users/k9966/Documents/My Projects/ask_book/cool_api/controllers/startups_demo.json', 'r') as f:
            file_contents = f.read()
            
        payload = list(map(json.loads, file_contents.splitlines()))
        
        client.recreate_collection(
            collection_name='startups', 
            vectors_config=VectorParams(size=384, distance=Distance.COSINE),
        )
        result = client.upload_collection(
                    collection_name='startups',
                    vectors=vectors,
                    payload=payload,
                    ids=None,  # Vector ids will be assigned automatically
                    batch_size=256  # How many vectors will be uploaded in a single request?
                )


        
        return jsonify(result), 200
    except Exception as error:
        print("searchBooks error === ", error)
        return jsonify(error=str(error)), 500
    

def search_startups():
    try:
        print("search startups ==== got the request", request.args)
        print("query == ", request.args.get("query"))
        query = request.args.get("query")

        client = QdrantClient("localhost", port=6333);

        search_result = client.search(
            collection_name=COLLECTION_NAME,
            query_vector=encoder.encode(query).tolist(),
            limit=3,
        )
        payloads = [result.payload for result in search_result]


        print("search ==== got the result", search_result)
        # convert search_result to json
        
        
        return jsonify(payloads), 200
    except Exception as error:
        print("searchBooks error === ", error)
        return jsonify(error=str(error)), 500
    

def startup_list():
    
    try:
        # retrun all the startups with 20 limit from the database
        print("connecting ")
        client = QdrantClient("localhost", port=6333)
        print("client === ", client)
        all_startups = client.scan_collection(collection_name=COLLECTION_NAME)
        print("all startups === ", all_startups)
        
        limited_startups = list(itertools.islice(all_startups, 20))
        print("limited startups === ", limited_startups)
        payloads = [startup.payload for startup in limited_startups]
        return jsonify(payloads), 200
        # return jsonify([]), 200
    except Exception as error:
        print("allBooks error === ", error)
        return jsonify(error=str(error)), 500


class NeuralSearcher:

    def __init__(self, collection_name):
        self.collection_name = COLLECTION_NAME
        # Initialize encoder model
        self.model = SentenceTransformer('all-MiniLM-L6-v2', device='cpu')
        # initialize Qdrant client
        self.qdrant_client = QdrantClient(host='localhost', port=6333)
    
    def search(self, text: str):
        # Convert text query into vector
        vector = self.model.encode(text).tolist()

        # Use `vector` for search for closest vectors in the collection
        search_result = self.qdrant_client.search(
            collection_name=self.collection_name,
            query_vector=vector,
            query_filter=None,  # We don't want any filters for now
            top=5  # 5 the most closest results is enough
        )
        # `search_result` contains found vector ids with similarity scores along with the stored payload
        # In this function we are interested in payload only
        payloads = [hit.payload for hit in search_result]
        return payloads    