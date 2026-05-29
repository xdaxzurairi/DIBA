#!/usr/bin/env python3
"""
DIBA Semantic Search Indexer — Phase 1 (TF-IDF)
Builds searchable index from DIBA markdown files.

Usage:
  python3 indexer.py              # full rebuild
  python3 indexer.py --incremental # skip unchanged files
"""
import os
import sys
import json
import pickle
import hashlib
from pathlib import Path
from datetime import datetime

try:
    from sklearn.feature_extraction.text import TfidfVectorizer
    import numpy as np
except ImportError:
    os.system("pip install scikit-learn numpy -q")
    from sklearn.feature_extraction.text import TfidfVectorizer
    import numpy as np

DIBA_DIR   = Path(__file__).parent.parent
SEARCH_DIR = Path(__file__).parent
INDEX_DIR  = SEARCH_DIR / "index"
CONFIG_FILE = SEARCH_DIR / "config.json"
INCREMENTAL = "--incremental" in sys.argv


def load_config():
    if CONFIG_FILE.exists():
        return json.loads(CONFIG_FILE.read_text(encoding="utf-8"))
    return {"sources": [], "extensions": [".md"], "min_chunk_chars": 60,
            "max_results": 5, "min_score": 0.05}


def collect_files(config):
    files = []
    for source in config["sources"]:
        path = DIBA_DIR / source
        if not path.exists():
            continue
        if path.is_file():
            files.append(path)
        else:
            for ext in config["extensions"]:
                files.extend(path.rglob(f"*{ext}"))
    # exclude format/template files and index directory
    return sorted(
        f for f in set(files)
        if "format" not in f.name.lower()
        and SEARCH_DIR not in f.parents
    )


def chunk_file(filepath, min_chars=60):
    """Split markdown into section-based chunks. Each H2/H3 becomes one chunk."""
    try:
        text = filepath.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return []

    chunks = []
    lines  = text.split("\n")
    current_lines  = []
    current_start  = 1
    rel_path = str(filepath.relative_to(DIBA_DIR))

    def flush(start, content_lines):
        body = "\n".join(content_lines).strip()
        if len(body) >= min_chars:
            chunks.append({"text": body, "source": rel_path, "line": start})

    for i, line in enumerate(lines, start=1):
        is_heading = line.startswith("## ") or line.startswith("### ")
        is_h1 = line.startswith("# ") and not line.startswith("## ")

        if (is_heading or is_h1) and current_lines:
            flush(current_start, current_lines)
            current_lines = [line]
            current_start = i
        else:
            current_lines.append(line)

    flush(current_start, current_lines)
    return chunks


def file_hash(filepath):
    try:
        return hashlib.md5(filepath.read_bytes()).hexdigest()
    except Exception:
        return ""


def load_existing_meta():
    meta_file = INDEX_DIR / "metadata.json"
    if meta_file.exists():
        try:
            return json.loads(meta_file.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {}


def build_index(files, config):
    existing_meta  = load_existing_meta() if INCREMENTAL else {}
    old_hashes     = existing_meta.get("file_hashes", {})
    old_chunks     = existing_meta.get("chunks", [])
    old_chunk_map  = {}
    for c in old_chunks:
        old_chunk_map.setdefault(c["source"], []).append(c)

    chunks      = []
    file_hashes = {}

    for filepath in files:
        fhash = file_hash(filepath)
        key   = str(filepath)
        file_hashes[key] = fhash

        if INCREMENTAL and old_hashes.get(key) == fhash:
            rel = str(filepath.relative_to(DIBA_DIR))
            chunks.extend(old_chunk_map.get(rel, []))
        else:
            chunks.extend(chunk_file(filepath, config.get("min_chunk_chars", 60)))

    if not chunks:
        print("DIBA Search: nothing to index")
        return 0

    texts = [c["text"] for c in chunks]

    vectorizer = TfidfVectorizer(
        analyzer="word",
        ngram_range=(1, 2),
        min_df=1,
        max_features=30000,
        sublinear_tf=True,
    )
    matrix = vectorizer.fit_transform(texts).toarray().astype("float32")

    INDEX_DIR.mkdir(parents=True, exist_ok=True)

    with open(INDEX_DIR / "vectorizer.pkl", "wb") as f:
        pickle.dump(vectorizer, f)

    np.save(str(INDEX_DIR / "matrix.npy"), matrix)

    meta = {
        "chunks":      chunks,
        "file_hashes": file_hashes,
        "built_at":    datetime.now().isoformat(),
        "chunk_count": len(chunks),
        "file_count":  len(files),
    }
    (INDEX_DIR / "metadata.json").write_text(
        json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    return len(chunks)


if __name__ == "__main__":
    config  = load_config()
    files   = collect_files(config)
    n       = build_index(files, config)
    mode    = "incremental" if INCREMENTAL else "full"
    print(f"DIBA Search: {n} chunks indexed from {len(files)} files [{mode}]")
