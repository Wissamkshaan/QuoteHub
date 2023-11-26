import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { link } from 'react-router-dom';
import { Container, Header, Menu } from 'semantic-ui-react';
import Home from './Home';
import Logo from './logo.png';


function App() {
  const [quotes, setQuotes] = useState([]);
  // const [categories, setCategories] = useState([]);

  const handleAddQuote = (newQuote) => {
    setQuotes([...quotes, newQuote]);
  };

  return (
    <Router>
      <Container textAlign='center'>
      <Header as='h1'>QuoteHub</Header>
        <Menu>
        
         <Menu.Item as={Link} to="/">
         <img src={Logo} alt="Logo" style={{ height: '40px', marginRight: '10px', }} />
          
          
            </Menu.Item>
            <span style={{margin: '10px' }}>Read to change your state of mind. Write to share your thoughts</span>
        </Menu>
      
        <hr />

        <Routes>
          <Route path="/" element={<Home quotes={quotes} />} />
        
        </Routes>
      </Container>
    </Router>
  );
};

export default App;