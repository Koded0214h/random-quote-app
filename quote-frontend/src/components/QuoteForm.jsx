// src/components/QuoteForm.jsx
import { useState } from 'react';

function QuoteForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuote = {
      title: title,  // Make sure title is included
      author: author,  // Make sure author is included
    };

    fetch('http://127.0.0.1:8000/api/quotes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuote),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          onAdd(data);  // Successfully added, update UI
          setTitle('');  // Clear form
          setAuthor('');  // Clear form
        } else {
          console.error('Failed to add quote');
        }
      })
      .catch((err) => console.error('Error creating quote:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        required
      />
      <button type="submit">Add Quote</button>
    </form>
  );
}

export default QuoteForm;
