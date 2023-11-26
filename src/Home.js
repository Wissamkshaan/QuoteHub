import React, { useState, useEffect } from 'react';
import { Container, Header, List} from 'semantic-ui-react';
import CategoryFilter from './CategoryFilter';
import AddQuote from './AddQuote';

function Home() {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetching quotes from the API
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
      setFilteredQuotes(quotes.filter((quote) => quote.tags && quote.tags.includes(selectedCategory)));
    } else {
      setFilteredQuotes(quotes);
    }
  }, [selectedCategory, quotes]);

  const handleSelectCategory = (category) => {
    // console.log('Selected category:', category);
    setSelectedCategory(category);
  };

  const handleAddQuote = (newQuote) => {
    // console.log('Adding a new quote:', newQuote);
    
    // Ensure that tags property is an array
    newQuote.tags = newQuote.tags || [];

    // Add the new quote 
    setQuotes([...quotes, newQuote]);
    setFilteredQuotes([...quotes, newQuote]);
  };

  return (
    <Container>
      <CategoryFilter onSelectCategory={handleSelectCategory} />

      <AddQuote onAdd={handleAddQuote} />

      <Header as="h2" color= 'blue'>All Quotes</Header>
      <List>
        {filteredQuotes.map((quote) => (
          <List.Item key={quote._id}>
            <blockquote className="ui segment">
              <p>{quote.content}</p>
              <footer>- {quote.author}</footer>
            </blockquote>
          </List.Item>
        ))}
      </List>
    </Container>
  );
}

export default Home;