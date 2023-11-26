import React, { useState } from 'react';
import { Form, TextArea, Input, Button, Header } from 'semantic-ui-react';

const AddQuote = ({ onAdd }) => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const handleAdd = () => {
    if (quote && author) {
      const newQuote = {
        content: quote,
        author: author,
      };
      onAdd(newQuote);
      setQuote('');
      setAuthor('');
    } else {
      alert('Please fill in both the quote and author fields.');
    }
  };

  return (
    <div style={{marginTop: '30px', color:'blue'}} >
      <h2>Add a New Quote</h2>
  
      <Form>
        <Form.Field>
          <label>Quote:</label>
          <TextArea value={quote} onChange={(e) => setQuote(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Author:</label>
          <Input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </Form.Field>
        <Button type="button" onClick={handleAdd} color='green'>
          Add Quote
        </Button>
      </Form>
    </div>
  );
};

export default AddQuote;