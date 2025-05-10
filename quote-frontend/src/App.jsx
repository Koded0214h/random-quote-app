import { useEffect, useState } from 'react';

function App() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/random/')
      .then((res) => res.json())
      .then((data) => setQuote(data));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Random Quote</h1>
      {quote ? (
        <div>
          <p>"{quote.text}"</p>
          <p><em>- {quote.author}</em></p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
