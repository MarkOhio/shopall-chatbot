"""
app.py — The ShopAll chatbot server.
Receives messages from the frontend, passes them to ChatBrain,
and sends responses back as JSON.

Start with:  python app.py
Runs on:     http://127.0.0.1:5000
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from brain import ChatBrain

# ── Create the Flask app ───────────────────────────────────────────────────
# Flask(__name__) creates a web server instance.
# __name__ just tells Flask where this file lives.
app = Flask(__name__)

# CORS (Cross-Origin Resource Sharing) allows the frontend (your HTML file
# or a client's website) to talk to this Python server.
# Without this, browsers block the request for security reasons.
CORS(app)

# ── Load the brain once on startup ────────────────────────────────────────
# We load it here — outside of any route — so it's ready in memory
# for every request. Loading it inside the route would retrain on
# every message, which would be very slow.
brain = ChatBrain()


# ── Health check route ─────────────────────────────────────────────────────
# Visit http://127.0.0.1:5000/ in your browser to confirm the server is up.
@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'status': 'running',
        'message': 'ShopAll Chatbot API is live.'
    })


# ── Main chat route ────────────────────────────────────────────────────────
# The frontend sends a POST request to /chat with JSON body:
#   { "message": "how do I return an item" }
#
# This route:
#   1. Reads the message from the request body
#   2. Passes it to brain.get_response()
#   3. Returns the response as JSON back to the frontend
@app.route('/chat', methods=['POST'])
def chat():

    # ── Read incoming JSON ─────────────────────────────────────────────────
    # request.get_json() parses the body the frontend sent.
    # silent=True means it won't crash if the body is malformed.
    body = request.get_json(silent=True)

    # Guard: if body is missing or has no 'message' field, return an error
    if not body or 'message' not in body:
        return jsonify({
            'error': 'No message provided.',
            'response': 'Please send a message in the format: {"message": "your text"}'
        }), 400

    user_message = body['message']

    # ── Get response from brain ────────────────────────────────────────────
    result = brain.get_response(user_message)

    # ── Return JSON to frontend ────────────────────────────────────────────
    # jsonify() converts a Python dict to a proper JSON HTTP response.
    return jsonify({
        'response':   result['response'],
        'tag':        result['tag'],
        'confidence': result['confidence']
    })


# ── Run the server ─────────────────────────────────────────────────────────
# debug=True means Flask will:
#   - Show detailed error messages in the terminal
#   - Auto-restart when you save changes to this file
#
# IMPORTANT: Set debug=False before deploying to a live server.
if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))  # Use PORT env variable if set, otherwise default to 5000
    app.run(debug=False, host='0.0.0.0', port=port)
