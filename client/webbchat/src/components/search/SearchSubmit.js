import React, { PropTypes } from 'react';
import { Button } from 'react-mdl';

const SearchSubmit = ({ onSubmit }) => (
    <Button
      onClick={onSubmit}
    >Search</Button>
);

SearchSubmit.propTypes = {
  onSubmit: PropTypes.func,
}

export default SearchSubmit;

