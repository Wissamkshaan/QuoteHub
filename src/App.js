import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './Home';
import AddQuote from './AddQuote';

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleAddQuote = (newQuote) => {
    setQuotes([...quotes, newQuote]);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add">Add Quote</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<Home quotes={quotes} />} />
          {/* Pass quotes and handleAddQuote to AddQuote */}
          <Route path="/add" element={<AddQuote onAdd={handleAddQuote} categories={categories} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
