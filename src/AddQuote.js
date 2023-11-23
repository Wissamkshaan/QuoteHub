// src/AddQuote.js
import React, { useState, useEffect } from 'react';


const AddQuote = ({ onAdd, categories }) => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
 
  
  const handleAdd = () => {
    if (quote && author && selectedCategory) {
      const newQuote = {
        content: quote,
        author: author,
        tags: [selectedCategory], // Ensure that the category is an array
      };
      onAdd(newQuote);
      setQuote('');
      setAuthor('');
      setSelectedCategory('');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div>
      <h2>Add a New Quote</h2>
      <form>
        <div>
          <label>Quote:</label>
          <textarea value={quote} onChange={(e) => setQuote(e.target.value)} />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          <label>Category:</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={handleAdd}>
          Add Quote
        </button>
      </form>
    </div>
  );
};

export default AddQuote;
