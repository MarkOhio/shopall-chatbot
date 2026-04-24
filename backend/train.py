"""
train.py — Run this once before starting the server.
It reads intents.json, trains a text classifier, and saves
the model to disk so app.py can load it instantly on startup.

Run with:  python train.py
"""

import json
import pickle
import numpy as np
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

# Download the tokenizer data NLTK needs (only downloads once)
nltk.download('punkt', quiet=True)
nltk.download('punkt_tab', quiet=True)
nltk.download('wordnet', quiet=True)

# ── Step 1: Load intents.json ──────────────────────────────────────────────
with open('intents.json', 'r') as f:
    data = json.load(f)

# ── Step 2: Build training data ────────────────────────────────────────────
# We turn the intents file into two lists:
#   X = the pattern phrases (what the user might type)
#   y = the tag label for each phrase (what intent it belongs to)
#
# Example:
#   X = ["hello", "hi there", "how do I return an item", ...]
#   y = ["greeting", "greeting", "return_policy", ...]

X = []  # input phrases
y = []  # corresponding intent tags

for intent in data['intents']:
    for pattern in intent['patterns']:
        X.append(pattern.lower())   # normalise to lowercase
        y.append(intent['tag'])

print(f"Training on {len(X)} patterns across {len(data['intents'])} intents...")

# ── Step 3: Build and train the pipeline ───────────────────────────────────
# A Pipeline chains two steps together:
#
#   TfidfVectorizer  — converts text into numbers.
#                      "how much does it cost" becomes a vector of scores.
#                      Words that appear a lot (like "the") get low scores.
#                      Rare, meaningful words get higher scores.
#                      This is what lets it match "what's the price" to
#                      "how much does it cost" — they share important words.
#
#   LogisticRegression — a simple, fast classifier. Given the number vector,
#                        it predicts which intent tag it belongs to.
#                        It also gives a confidence score (0.0 – 1.0).

model = Pipeline([
    ('tfidf', TfidfVectorizer(
        ngram_range=(1, 2),   # consider single words AND two-word pairs
        analyzer='word',
        min_df=1
    )),
    ('clf', LogisticRegression(
        max_iter=1000,
        C=5.0               # controls how tightly the model fits training data
    ))
])

model.fit(X, y)
print("Model trained successfully.")

# ── Step 4: Save everything to disk ────────────────────────────────────────
# pickle.dump serialises the Python object into a binary file.
# app.py will load this file instead of retraining on every request.

with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

# Also save the full intents data so brain.py can look up responses by tag
with open('intents_data.pkl', 'wb') as f:
    pickle.dump(data, f)

print("Saved model.pkl and intents_data.pkl")
print("Training complete. You can now start the server with: python app.py")
