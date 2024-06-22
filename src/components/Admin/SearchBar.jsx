import React from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <Form inline onSubmit={handleSearch}>
      <Form.Control
        type="text"
        placeholder="Search"
        className="mr-sm-2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant="outline-success" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
