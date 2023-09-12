import React from "react";
import styles from "./Counter.module.css";

interface CounterProps {
  count: number | null;
}

const Counter: React.FC<CounterProps> = ({ count }) => {
  return (
    <div className={styles.mainDiv}>
      <h2>Sentiment Counter</h2>
      <p>Count: {count}</p>
    </div>
  );
};

export default Counter;
