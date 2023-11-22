import React, { useState, useEffect } from 'react';

const CategoryFilter = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the Quotable API
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.quotable.io/tags');
        const data = await response.json();