import React, { useState, useEffect, useCallback } from 'react';
// import * as tf from '@tensorflow/tfjs';
import axios from 'axios';

const Analysis = ({ text }) => {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState('0 min');
  const [sentimentScore, setSentimentScore] = useState(0);

// Function to fetch sentiment score from the backend
const fetchSentimentScore = async () => {
  try {
    const response = await axios.post('http://localhost:5000/analyze', { text });
    if (response.data && response.data.sentiment_score !== undefined) {
      setSentimentScore(response.data.sentiment_score);
    } else {
      setSentimentScore(0); // Default in case of invalid response
    }
  } catch (error) {
    console.error('Error fetching sentiment score:', error);
    setSentimentScore(0); // Fallback in case of an error
  }
};





  // // Memoized function for sentiment analysis
  // const analyzeSentiment = useCallback(async () => {
  //   // Preprocess text into tokens
  //   const preprocessText = (input) => {
  //     const normalizedText = input.toLowerCase().replace(/[^a-z\s]/g, '');
  //     const words = normalizedText.split(/\s+/).filter(Boolean);
  
  //     // Return numeric representations for words (placeholder: word length)
  //     return words.length > 0 ? words.map((word) => word.length / 10) : [0];
  //   };
  
  //   const tokens = preprocessText(text);
  
  //   if (tokens.length === 0) {
  //     setSentimentScore(0); // Handle empty input
  //     return;
  //   }
  
  //   const tensorInput = tf.tensor([tokens], [1, tokens.length]);
  
  //   // Dummy model setup
  //   const model = tf.sequential();
  //   model.add(tf.layers.dense({ units: 8, inputShape: [tokens.length], activation: 'relu' }));
  //   model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
  //   model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });
  
  //   // Initialize weights properly
  //   const inputLayerWeights = model.layers[0].getWeights()[0];
  //   const biasWeights = model.layers[0].getWeights()[1];
  
  //   if (inputLayerWeights && biasWeights) {
  //     const newWeights = tf.randomNormal(inputLayerWeights.shape);
  //     model.layers[0].setWeights([newWeights, biasWeights]);
  //   }
  
  //   try {
  //     // Predict sentiment
  //     const prediction = model.predict(tensorInput).dataSync()[0];
  //     setSentimentScore(prediction);
  //   } catch (error) {
  //     console.error("Error during prediction:", error);
  //     setSentimentScore(0); // Fallback for errors
  //   }
  // }, [text]);
  

  // Update metrics and sentiment when text changes
  useEffect(() => {
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const charCount = text.length;
    const readingTime = `${Math.ceil(wordCount / 200)} min`;

    setWordCount(wordCount);
    setCharCount(charCount);
    setReadingTime(readingTime);

    fetchSentimentScore(); 

    // analyzeSentiment();
  }, [text]);

  return (
    <div className="analysis-container">
      <div className="metrics-container">
        <div className="metric">
          <span className="metric-value">{charCount}</span>
          <span className="metric-label"> characters</span>
        </div>
        <div className="metric">
          <span className="metric-value">{wordCount}</span>
          <span className="metric-label"> words</span>
        </div>
        <div className="metric">
          <span className="metric-value">{readingTime}</span>
          <span className="metric-label"> read</span>
        </div>
      </div>

      <div className="metrics-container">
        <div className="metric">
          <span className="metric-label">Sentiment Score:</span>
          <span className="metric-value">{sentimentScore.toFixed(2)}</span>
        </div>
        <div className="metric">
          <span className="metric-label">Readability Score:</span>
          <span className="metric-value">75</span>
        </div>
        <div className="metric">
          <span className="metric-label">Average Sentence Length:</span>
          <span className="metric-value">12 words</span>
        </div>
        <div className="metric">
          <span className="metric-label">Complex Words:</span>
          <span className="metric-value">18%</span>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
