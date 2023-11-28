import React, { useState } from 'react';

const AddQuote = ({ categories, onAdd }) => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState(''); // Default category

  const handleAddQuote = (e) => {
    e.preventDefault();
    onAdd({ quote, author, category });
    setQuote('');
    setAuthor('');
    setCategory('');
  };

  return (
    <form onSubmit={handleAddQuote}>
      <label>
        Quote:
        <input type="text" value={quote} onChange={(e) => setQuote(e.target.value)} />
      </label>
      <label>
        Author:
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </label>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
  <option value="">Select a category</option>
  {categories.map((category, index) => (
    <option key={index} value={category}>
      {category}
    </option>
  ))}
</select>

      </label>
      <button type="submit" onClick={handleAddQuote}>Add Quote</button>
    </form>
  );
};

export default AddQuote;
