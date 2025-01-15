from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
# import re
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from datasets import load_dataset
from flask_cors import CORS

# Initialize Flask app


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

 
text = "I hated it so much i might puke what is this don't dont want it any more"


# Preprocess the text
processed_text = preprocess_text(text)

# Predict sentiment score using the model
sentiment_score = (model.predict(processed_text)[0][0])

# Return the sentiment score
print(sentiment_score)
