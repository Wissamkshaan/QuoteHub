import React from 'react';
import { Dropdown, Label } from 'semantic-ui-react';

const CategoryFilter = ({ tags, onSelectCategory }) => {
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
          { key: 'all', text: 'All', value: 'All' },
          ...tags.map((tag, index) => ({
            key: index, // Use the index as a fallback key
            text: tag,
            value: tag,
          })),
        ]}
        selection
        defaultValue="All"
      />
    </div>
  );
};


export default CategoryFilter;
