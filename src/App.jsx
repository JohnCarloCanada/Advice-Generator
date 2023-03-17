import React, { useEffect, useState } from "react";
import Card from "./Card";
import Loader from "./Loader";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState([]);

  useEffect(() => {
    let controller = new AbortController();
    if (!isLoading) return;
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://api.adviceslip.com/advice", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        setQuote(data);
        setIsLoading(false);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request aborted");
        } else {
          console.error(err);
        }
      }
    };
    let timerId = setTimeout(() => fetchQuote(), 2000);

    return () => {
      clearTimeout(timerId);
      controller.abort();
    };
  }, [isLoading]);

  return <section className="container">{isLoading ? <Loader /> : <Card quote={quote} isLoading={isLoading} setIsLoading={setIsLoading} />}</section>;
}

export default App;
