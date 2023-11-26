import React, { useState, useEffect } from 'react';
import { Dropdown, Label } from 'semantic-ui-react';

const CategoryFilter = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the Quotable API
    fetch('https://api.quotable.io/tags')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          // Extract category names from the objects
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

  const handleSelectCategory = (value) => {
    // Ensure that "All" option resets the filter
    const category = value === 'All' ? '' : value;
    onSelectCategory(category);
  };

  return (
    <div>
      <Label>Filter by Category:</Label>
      <Dropdown
        onChange={(e, { value }) => handleSelectCategory(value)}
        options={[
          { key: 'all', text: 'All', value: 'All' }, // Add an "All" option to render all quotes 
          ...categories.map((category) => ({
            key: category,
            text: category,
            value: category,
          })),
        ]}
        selection
        defaultValue="All"
      />
    </div>
  );
};

export default CategoryFilter;
