from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
# import re
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from datasets import load_dataset
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/analyze": {"origins": "http://localhost:3000"}})

# Load the pre-trained model
model = tf.keras.models.load_model('sentiment_analysis_model.h5')

dataset = load_dataset("sst", name="default", trust_remote_code=True)
train_data = dataset["train"]
train_sentences = [x["sentence"] for x in train_data]

# Set tokenizer parameters
vocab_size = 100000
max_length = 30
tokenizer = Tokenizer(num_words=vocab_size, oov_token="<OOV>")
tokenizer.fit_on_texts(train_sentences)  # Fit tokenizer on SST dataset

def preprocess_text(input_text):
    # Convert input text to sequences
    sequence = tokenizer.texts_to_sequences([input_text])
    # Pad the sequence to match the expected input length of the model
    padded_tokens = pad_sequences(sequence, maxlen=10, padding="post", truncating="post")
    return padded_tokens

# Preprocess the text
# def preprocess_text(input_text):
#     # Normalize text: convert to lowercase, remove non-alphabetic characters
#     normalized_text = re.sub(r'[^a-z\s]', '', input_text.lower())
#     # Tokenize text: split into words
#     words = normalized_text.split()
#     # Convert words to numerical features (example: word length)
#     features = [len(word) / 10 for word in words]  # Placeholder feature
#     # Ensure consistent input size for the model
#     max_len = 50  # Define a maximum sequence length
#     if len(features) > max_len:
#         features = features[:max_len]
#     else:
#         features += [0] * (max_len - len(features))
#     return np.array([features])

# Define a route for text analysis
@app.route('/analyze', methods=['POST'])

# def analyze():
#     try:
#         # Get input text from the request
#         data = request.get_json()
#         text = data.get('text', '')
#         if not text:
#             return jsonify({'error': 'No text provided'}), 400

#         # Preprocess the text
#         processed_text = preprocess_text(text)

#         # Predict sentiment score using the model
#         sentiment_score = float(model.predict(processed_text)[0][0])

#         # Return the sentiment score
#         return jsonify({'sentiment_score': sentiment_score})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
    


def analyze():
    try:
        # Get input text from the request
        data = request.get_json()
        text = data.get('text', '')
        if not text:
            return jsonify({'error': 'No text provided'}), 400

        # Preprocess the text
        processed_text = preprocess_text(text)

        # Predict sentiment score using the model
        sentiment_score = float(model.predict(processed_text)[0][0])

        # Return the sentiment score
        return jsonify({'sentiment_score': sentiment_score})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
