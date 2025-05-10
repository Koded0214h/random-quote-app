import { useState } from 'react';

function QuoteForm() {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newQuote = {title, author}

        fetch('http://127.0.0.1:8000/api/quotes/")', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuote)
        })
        .then((res) => res.json())
        .then((data) => {
            onAdd(data);
            setTitle('');
            setAuthor('');
        })
        .catch((err) => console.error('Error creating todo: ', err));
    }


    return(
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)} required/>
            <input type="text" value={author} placeholder='Author' onChange={(e) => setAuthor(e.target.value)} required/>
            <button type="submit">Add Quote</button>
        </form>
    )
}

export default QuoteForm;