"""
brain.py — The chatbot's reasoning layer.
Loaded once by app.py on startup.
Called for every incoming user message.
"""

import pickle
import random

# Confidence threshold — if the model is less than this sure,
# it returns the fallback response instead of guessing wrong.
CONFIDENCE_THRESHOLD = 0.35


class ChatBrain:
    def __init__(self):
        """Load the trained model and intents data from disk."""

        # Load the trained sklearn pipeline (TF-IDF + LogisticRegression)
        with open('model.pkl', 'rb') as f:
            self.model = pickle.load(f)

        # Load the full intents.json data (for looking up responses)
        with open('intents_data.pkl', 'rb') as f:
            self.data = pickle.load(f)

        # Build a quick lookup dict:  tag -> list of responses
        # e.g. { "greeting": ["Hi there!", "Hello!"], "return_policy": [...] }
        self.responses = {}
        for intent in self.data['intents']:
            self.responses[intent['tag']] = intent['responses']

        self.fallback = self.data.get(
            'fallback',
            "I'm not sure about that. Please use our Live Chat for further help."
        )

        print("ChatBrain loaded and ready.")

    def get_response(self, user_message: str) -> dict:
        """
        Takes a raw user message string.
        Returns a dict with the response text, matched tag, and confidence.

        Steps:
        1. Clean the message
        2. Ask the model to predict the intent tag
        3. Get the model's confidence score for that prediction
        4. If confidence is high enough, pick a random response for that tag
        5. Otherwise return the fallback message
        """

        # ── 1. Clean input ─────────────────────────────────────────────────
        message = user_message.strip().lower()

        if not message:
            return {
                'response': "Please type a message and I'll do my best to help!",
                'tag': None,
                'confidence': 0.0
            }

        # ── 2. Predict intent tag ──────────────────────────────────────────
        # predict() returns the most likely tag as a string
        predicted_tag = self.model.predict([message])[0]

        # ── 3. Get confidence score ────────────────────────────────────────
        # predict_proba() returns an array of probabilities for every class.
        # We get the max — that's the confidence for the predicted tag.
        probabilities = self.model.predict_proba([message])[0]
        confidence = float(max(probabilities))

        # ── 4. Threshold check ─────────────────────────────────────────────
        if confidence < CONFIDENCE_THRESHOLD:
            return {
                'response': self.fallback,
                'tag': 'fallback',
                'confidence': confidence
            }

        # ── 5. Pick a response ─────────────────────────────────────────────
        # random.choice picks one response from the list for this tag.
        # Having multiple responses per tag prevents the bot feeling robotic.
        response_list = self.responses.get(predicted_tag, [self.fallback])
        response = random.choice(response_list)

        return {
            'response': response,
            'tag': predicted_tag,
            'confidence': round(confidence, 3)
        }
