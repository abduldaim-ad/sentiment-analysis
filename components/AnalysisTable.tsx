import React, { useState, useEffect } from "react";
import styles from "./AnalysisTable.module.css";
import { ISentiment } from "../pages";

interface TableProps {
  sentimentData: ISentiment[];
  setCount: React.Dispatch<React.SetStateAction<number | null>>;
}

const AnalysisTable: React.FC<TableProps> = ({ sentimentData, setCount }) => {
  const [localSentimentData, setLocalSentimentData] = useState<ISentiment[]>();

  useEffect(() => {
    const oldDataJSON = localStorage.getItem("sentimentData");
    setLocalSentimentData(oldDataJSON ? JSON.parse(oldDataJSON) : []);
    setCount(oldDataJSON ? JSON.parse(oldDataJSON).length : 0);
  }, [sentimentData]);

  return (
    <>
      <table className={styles.tableStyle}>
        <tr>
          <th>Sr. No</th>
          <th>Text</th>
          <th>Analysis Result</th>
        </tr>
        {localSentimentData?.toReversed()?.map((item, key) => {
          const { statement, result } = item;
          return (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{statement}</td>
              <td>{result}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default AnalysisTable;
