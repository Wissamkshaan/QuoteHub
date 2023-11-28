import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Container, Header, Menu } from 'semantic-ui-react';
import Home from './Home';
import Logo from './logo.png';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Load quotes from localStorage on component mount
    const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    setQuotes(storedQuotes);

    // Fetch categories from the Quotable API
    fetch('https://api.quotable.io/tags')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const categoryNames = data.map((category) => category.name);
          setCategories(categoryNames);
        } else {
          console.error('Invalid data format for categories:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleAddQuote = (newQuote) => {
    // Update the state with the new quote
    setQuotes((prevQuotes) => [...prevQuotes, newQuote]);

    // Save the updated quotes to localStorage
    localStorage.setItem('quotes', JSON.stringify([...quotes, newQuote]));
  };

  return (
    <Router>
      <Container textAlign='center'>
        
        <Header as='h1'>QuoteHub</Header>
        <Menu>
          <Menu.Item as={Link} to="/">
          <img src={Logo} alt="Logo" style={{ height: '40px', marginRight: '10px', }} />
          </Menu.Item>
          <span style={{ margin: '10px' }}>Read to change your state of mind. Write to share your thoughts</span>
        </Menu>
        <hr />

        <Routes>
          <Route
            path="/"
            element={<Home quotes={quotes} categories={categories} />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
