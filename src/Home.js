import React, { useState, useEffect } from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import CategoryFilter from './CategoryFilter';
import AddQuote from './AddQuote';

function Home({ tags }) {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetching quotes from the API
    fetch('https://api.quotable.io/quotes?limit=15')
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
          console.log(data.results);
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

  const handleSelectCategory = (tag) => {
  setSelectedCategory(tag);
  let allQuotes = [];
  const storageQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
  

  // allQuotes = [...filteredAPI, ...filterLocalStorage];

  if(!tag || tag === 'All'){
    setFilteredQuotes([...quotes, ...storageQuotes])
  }else {
    const filteredAPI = quotes.filter((quote)=> quote.tags.includes(tag));
    const filterLocalStorage = storageQuotes.filter((quote)=> quote.tags.includes(tag));
    setFilteredQuotes([...filteredAPI, ...filterLocalStorage])

  }
  };

  const handleAddQuote = (newQuote) => {
    console.log(newQuote);
    // Ensure that tags property is an array
    newQuote.tags = newQuote.tags || [];
  
    // Update the state with the new quote
    setQuotes((prevQuotes) => [...prevQuotes, newQuote]);
  
    // Save the updated quotes to localStorage
    localStorage.setItem('quotes', JSON.stringify([...quotes, newQuote]));
  
    // Update the state for filtered quotes based on the selected category
    setFilteredQuotes((prevFilteredQuotes) => [...prevFilteredQuotes, newQuote]);
    
    // Update the state for filtered quotes based on the selected category
    if (selectedCategory && newQuote.tags.includes(selectedCategory)) {
      setFilteredQuotes((prevFilteredQuotes) => [...prevFilteredQuotes, newQuote]);
    }
  };
  
  // useEffect to log the states after they are updated
  useEffect(() => {
    console.log('Updated Quotes State:', quotes);
  }, [quotes]);
  
  useEffect(() => {
    console.log('Updated Filtered Quotes State:', filteredQuotes);
  }, [filteredQuotes]);
  

  return (
    <Container>
      <CategoryFilter
        tags={tags}
        onSelectCategory={handleSelectCategory}
      />

      <AddQuote
        tagsList={tags}
        onAdd={handleAddQuote}
      />

      <Header as="h2" color='blue'>All Quotes</Header>
      <List>
        {filteredQuotes.map((quote) => (
          <List.Item key={quote._id}>
            <blockquote className="ui segment">
              <p>{quote.content ? quote.content: quote.quote}</p>
              <footer>- {quote.author}</footer>
            </blockquote>
          </List.Item>
        ))}
      </List>
    </Container>
  );
}

export default Home;
