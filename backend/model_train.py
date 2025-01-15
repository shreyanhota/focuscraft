import numpy as np
from datasets import load_dataset
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.layers import SpatialDropout1D
import matplotlib.pyplot as plt

dataset = load_dataset("sst", name="default", trust_remote_code=True)

def preprocess_data(example):
    return example["sentence"], int(example["label"])

train_data = dataset["train"]
val_data = dataset["validation"]
test_data = dataset["test"]

def dataset_to_numpy(data_split):
    # Extract sentences and labels
    sentences = [example["sentence"] for example in data_split]
    labels = [example["label"] for example in data_split]

    # Convert to NumPy arrays
    sentences_np = np.array(sentences, dtype=object)  # Text data
    labels_np = np.array(labels, dtype=np.float32)    # Sentiment labels
    labels_binary = np.round(labels_np)

    return sentences_np, labels_binary


train_sentences, train_labels = dataset_to_numpy(train_data)
val_sentences, val_labels = dataset_to_numpy(val_data)
test_sentences, test_labels = dataset_to_numpy(test_data)

print("Train sentences shape:", train_sentences.shape)
print("Train labels shape:", train_labels.shape)
for i in range (0,5):
  print("First few sentence and label:", train_sentences[i], train_labels[i])


vocab_size = 100000
max_length = 30

tokenizer = Tokenizer(num_words=vocab_size, oov_token="<OOV>")
tokenizer.fit_on_texts(train_sentences)

train_sequences = tokenizer.texts_to_sequences(train_sentences)
val_sequences = tokenizer.texts_to_sequences(val_sentences)
test_sequences = tokenizer.texts_to_sequences(test_sentences)

train_padded = pad_sequences(train_sequences, maxlen=max_length, padding="post", truncating="post")
val_padded = pad_sequences(val_sequences, maxlen=max_length, padding="post", truncating="post")
test_padded = pad_sequences(test_sequences, maxlen=max_length, padding="post", truncating="post")

model = Sequential()
model.add(Embedding(input_dim=vocab_size, output_dim=128, input_length=max_length))  # Embedding layer
model.add(SpatialDropout1D(0.2))  # Regularization
model.add(LSTM(100, dropout=0.2, recurrent_dropout=0.2))  # LSTM layer
model.add(Dense(1, activation="sigmoid"))  # Output layer for binary classification

model.compile(
    loss="binary_crossentropy",
    optimizer=Adam(learning_rate=0.001),
    metrics=["accuracy"]
)

batch_size = 30
epochs = 5

history = model.fit(
    train_padded,
    train_labels,
    validation_data=(val_padded, val_labels),
    epochs=epochs,
    batch_size=batch_size
)

loss, accuracy = model.evaluate(train_padded, train_labels)
print(f"Test Accuracy: {accuracy}")

model.save("sentiment_analysis_model.h5")


# Plot training and validation accuracy
plt.plot(history.history['accuracy'], label='Training Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.title("Training and Validation Accuracy")
plt.xlabel("Epochs")
plt.ylabel("Accuracy")
plt.legend()
plt.show()