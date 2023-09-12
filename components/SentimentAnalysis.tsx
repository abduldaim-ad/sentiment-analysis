// components/SentimentAnalysis.tsx
import React, { useState } from "react";
import Sentiment from "sentiment";
import { ISentiment } from "../pages";
import styles from "./SentimentAnalysis.module.css";

interface SentimentProps {
  count: number | null;
  setCount: React.Dispatch<React.SetStateAction<number | null>>;
  setSentimentData: React.Dispatch<React.SetStateAction<ISentiment[]>>;
}

const SentimentAnalysis: React.FC<SentimentProps> = ({
  count,
  setCount,
  setSentimentData,
}) => {
  const [inputText, setInputText] = useState<string>("");
  const [sentiment, setSentiment] = useState<string>("Analysis Result Here");

  const increment = () => {
    setCount(count ? +1 : null);
  };

  const analyzeSentiment = () => {
    const sentimentAnalysis = new Sentiment();
    const result = sentimentAnalysis.analyze(inputText);
    let newItem: ISentiment;

    if (result.score > 0) {
      setSentiment("Positive");
      newItem = { statement: inputText, result: "Positive" };
    } else if (result.score < 0) {
      setSentiment("Negative");
      newItem = { statement: inputText, result: "Negative" };
    } else {
      setSentiment("Neutral");
      newItem = { statement: inputText, result: "Neutral" };
    }
    increment();
    setSentimentData((prevArray) => [...prevArray, newItem]);

    const oldDataJSON = localStorage.getItem("sentimentData");
    const oldData: ISentiment[] = oldDataJSON ? JSON.parse(oldDataJSON) : [];
    const updatedData = [...oldData, newItem];
    localStorage.setItem("sentimentData", JSON.stringify(updatedData));

    setInputText("");
  };

  return (
    <div className={styles.mainDiv}>
      <h2>Sentiment Analysis</h2>
      <textarea
        placeholder="Enter text for sentiment analysis"
        value={inputText}
        className={styles.textAreaStyle}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
      <button onClick={analyzeSentiment} className={styles.btnStyle}>
        Analyze
      </button>
      {sentiment && (
        <div>
          <h3>Analysis Result:</h3>
          <p>{sentiment}</p>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysis;
