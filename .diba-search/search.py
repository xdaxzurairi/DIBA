#!/usr/bin/env python3
"""
DIBA Semantic Search — Phase 1 (TF-IDF)
Queries the index for semantically relevant passages.

CLI usage:
  python3 search.py "query"
  python3 search.py "query" --top 5
  python3 search.py "query" --source diary
  python3 search.py "query" --source decisions --top 3

Importable:
  from search import search
  results = search("query", top_k=5, source_filter="diary")
"""
import sys
import json
import pickle
from pathlib import Path

try:
    import numpy as np
    from sklearn.metrics.pairwise import cosine_similarity
except ImportError:
    print("Index not ready. Run: python3 .diba-search/indexer.py", file=sys.stderr)
    sys.exit(1)

SEARCH_DIR = Path(__file__).parent
INDEX_DIR  = SEARCH_DIR / "index"
CONFIG_FILE = SEARCH_DIR / "config.json"


def load_config():
    if CONFIG_FILE.exists():
        return json.loads(CONFIG_FILE.read_text(encoding="utf-8"))
    return {"max_results": 5, "min_score": 0.05}


def load_index():
    meta_file = INDEX_DIR / "metadata.json"
    if not meta_file.exists():
        return None, None, None

    meta = json.loads(meta_file.read_text(encoding="utf-8"))
    try:
        with open(INDEX_DIR / "vectorizer.pkl", "rb") as f:
            vectorizer = pickle.load(f)
        matrix = np.load(str(INDEX_DIR / "matrix.npy"))
        return vectorizer, matrix, meta["chunks"]
    except Exception:
        return None, None, None


def search(query: str, top_k: int = 5, source_filter: str = None,
           min_score: float = 0.05):
    """
    Returns list of dicts: {score, source, line, excerpt}
    Sorted by relevance descending.
    """
    vectorizer, matrix, chunks = load_index()

    if vectorizer is None:
        return []

    # Apply source filter
    if source_filter:
        pairs = [(i, c) for i, c in enumerate(chunks)
                 if source_filter.lower() in c["source"].lower()]
    else:
        pairs = list(enumerate(chunks))

    if not pairs:
        return []

    indices, filtered_chunks = zip(*pairs)
    filtered_matrix = matrix[list(indices)]

    query_vec = vectorizer.transform([query])
    scores    = cosine_similarity(query_vec, filtered_matrix)[0]

    top_idx = scores.argsort()[::-1][:top_k]

    results = []
    for idx in top_idx:
        score = float(scores[idx])
        if score < min_score:
            break
        chunk = filtered_chunks[idx]
        excerpt = chunk["text"].replace("\n", " ").strip()
        if len(excerpt) > 300:
            excerpt = excerpt[:297] + "..."
        results.append({
            "score":   round(score, 3),
            "source":  chunk["source"],
            "line":    chunk.get("line", 0),
            "excerpt": excerpt,
        })

    return results


def format_output(results):
    if not results:
        print("Tiada hasil ditemui.")
        return

    for r in results:
        print(f"[{r['score']:.3f}] {r['source']}:{r['line']}")
        print(f"  {r['excerpt'][:200]}")
        print()


def parse_args(argv):
    query        = None
    top_k        = None
    source_filter = None

    i = 0
    while i < len(argv):
        arg = argv[i]
        if arg == "--top" and i + 1 < len(argv):
            top_k = int(argv[i + 1])
            i += 2
        elif arg == "--source" and i + 1 < len(argv):
            source_filter = argv[i + 1]
            i += 2
        else:
            if query is None:
                query = arg
            i += 1

    return query, top_k, source_filter


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 search.py 'query' [--top N] [--source filter]")
        sys.exit(1)

    config = load_config()
    query, top_k, source_filter = parse_args(sys.argv[1:])

    results = search(
        query,
        top_k=top_k or config.get("max_results", 5),
        source_filter=source_filter,
        min_score=config.get("min_score", 0.05),
    )

    format_output(results)
