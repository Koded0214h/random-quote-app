import { useEffect, useState } from 'react'

export default function Quotes() {

    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/quotes/")
        .then((res) => res.json())
        .then((data) => setQuotes(data))
        .catch((err) => console.error('Error fetching quotes: ' , err));
    }, []);

    return(
        <div>
            <h2>Quotes</h2>
            <ul>
                {quotes.length === 0 ? (<p>No quotes yet!</p>) : (
                    quotes.map((quote) => (
                        <li key={quote.id}>
                            {quote.text} - {quote.author}
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}