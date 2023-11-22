import React, { useState, useEffect } from 'react';
import CategoryFilter from './CategoryFilter';


function Home () {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetching quotes from the external API
    fetch('https://api.quotable.io/quotes?limit=10')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.results)) {
          setQuotes(data.results);
          setFilteredQuotes(data.results);
        } else {
          console.error('Invalid data format for quotes:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching quotes:', error);
      });
  }, []);
  

  useEffect(() => {
    // Filter quotes based on selected category
    if (selectedCategory) {
      setFilteredQuotes(quotes.filter((quote) => quote.tags.includes(selectedCategory)));
    } else {
      setFilteredQuotes(quotes);
    }
  }, [selectedCategory, quotes]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <CategoryFilter onSelectCategory={handleSelectCategory} />

      <h2>All Quotes</h2>
      <ul>
        {filteredQuotes.map((quote) => (
          <li key={quote._id}>
            <blockquote>
              <p>{quote.content}</p>
              <footer>- {quote.author}</footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
