**Full stack app for basic semantic & neural search**

how to use

1.  run qdrant storage using this command

```bash
docker run -p 6333:6333 -p 6334:6334 \
    -v $(pwd)/qdrant_storage:/qdrant/storage:z \
    qdrant/qdrant
```

2.  run backend

```bash
python cool_api/main.py
```

3.  run frontend

```bash
cd frontend
pnpm dev
```

4.  got frontend url to access UI (http://localhost:5173/)

_Thanks_
