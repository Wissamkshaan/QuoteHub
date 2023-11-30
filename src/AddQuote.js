import React, { useState } from 'react';


const AddQuote = ({ tagsList, onAdd }) => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedTags, setSelectedTags] = useState(''); // Default category

  const handleAddQuote = (e) => {
    e.preventDefault();
    onAdd({ quote, author, tags: selectedTags });
    setQuote('');
    setAuthor('');
    setSelectedTags('');
  };

  return (
    <form onSubmit={handleAddQuote}>
      <label style={{ color: '#61A3BA', marginRight: '10px', fontSize: '18px', fontFamily: 'Arial'}}>
        Quote:
        <input type="text" value={quote} onChange={(e) => setQuote(e.target.value) } placeholder="Add your quote"/>
      </label>
      <label style={{ color: '#61A3BA', marginRight: '10px', fontSize: '18px', fontFamily: 'Arial' }}>
        Author:
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Add your name"/>
      </label>
      <label style={{ color: '#61A3BA', marginRight: '10px', fontSize: '18px', fontFamily: 'Arial' }}>
        Category:
        <select value={selectedTags} onChange={(e) => setSelectedTags(e.target.value)}>
          <option value="">Select a category</option>
          {tagsList.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" style={{ backgroundColor: '#61A3BA', color: 'black'}}>Add Quote</button>
    </form>
  );
};


export default AddQuote;
