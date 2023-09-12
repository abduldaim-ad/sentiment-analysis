// pages/index.tsx
import { useEffect, useState } from "react";
import Head from "next/head";
import Counter from "../components/Counter";
import SentimentAnalysis from "../components/SentimentAnalysis";
import AnalysisTable from "../components/AnalysisTable";

interface ISentiment {
  statement: string;
  result: string;
}

export default function Home() {
  const [count, setCount] = useState<number | null>(null);

  const [sentimentData, setSentimentData] = useState<ISentiment[]>([]);

  return (
    <div>
      <Head>
        <title>SA</title>
        <meta name="description" content="AI Chatbot using GPT-3" />
        <link
          rel="icon"
          href="https://www.memind.eu/wp-content/uploads/2022/01/sentiment-analysis-emotion-detection.jpg"
        />
      </Head>

      <main>
        <Counter count={count} />
        <SentimentAnalysis
          count={count}
          setCount={setCount}
          setSentimentData={setSentimentData}
        />
        <AnalysisTable sentimentData={sentimentData} setCount={setCount} />
      </main>

      <footer>{/* Add your footer content */}</footer>
    </div>
  );
}

export type { ISentiment };
