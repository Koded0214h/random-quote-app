// src/components/Quotes.jsx
import { useEffect, useState } from 'react';
import QuoteForm from './QuoteForm';

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = () => {
    fetch('http://127.0.0.1:8000/api/quotes/')
      .then((res) => res.json())
      .then((data) => setQuotes(data))
      .catch((err) => console.error('Error fetching quotes:', err));
  };

  const addQuote = (newQuote) => {
    setQuotes([newQuote, ...quotes]);
  };

  const startEdit = (quote) => {
    setEditingId(quote.id);
    setEditTitle(quote.title);
    setEditAuthor(quote.author);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditAuthor('');
  };

  const saveEdit = (id) => {
    fetch(`http://127.0.0.1:8000/api/quotes/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: editTitle,
        author: editAuthor,
      }),
    })
      .then((res) => res.json())
      .then((updatedQuote) => {
        setQuotes(quotes.map((quote) => (quote.id === id ? updatedQuote : quote)));
        cancelEdit();
      })
      .catch((err) => console.error('Error updating quote:', err));
  };

  const deleteQuote = (id) => {
    fetch(`http://127.0.0.1:8000/api/quotes/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setQuotes(quotes.filter((quote) => quote.id !== id));
      })
      .catch((err) => console.error('Error deleting quote:', err));
  };

  return (
    <div>
      <h2>Quotes</h2>
      <QuoteForm onAdd={addQuote} />
      <ul>
        {quotes.length === 0 ? (
          <p>No quotes yet!</p>
        ) : (
          quotes.map((quote) => (
            <li key={quote.id}>
              {editingId === quote.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(e.target.value)}
                  />
                  <button onClick={() => saveEdit(quote.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  "{quote.title}" — {quote.author}
                  <button onClick={() => startEdit(quote)}>Edit</button>
                  <button onClick={() => deleteQuote(quote.id)}>Delete</button>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
