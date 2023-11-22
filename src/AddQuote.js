import React, { useState, useEffect } from 'react';


const AddQuote = ({ onAdd, categories }) => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');