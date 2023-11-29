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
        <select value={selectedTags} onChange={(e) => setSelectedTags(e.target.value)}>
  <option value="">Select a category</option>
  {tagsList.map((tag, index) => (
    <option key={index} value={tag}>
      {tag}
    </option>
  ))}
</select>

      </label>
      <button type="submit" onClick={handleAddQuote}>Add Quote</button>
    </form>
  );
};

export default AddQuote;
