import React, { PropTypes } from 'react';
import { Textfield } from 'react-mdl';

const SearchBox = ({ onInput }) => (
    <Textfield
      onChange={(event) => onInput(event.target.value)}
      label="Search for users"
      floatingLabel
      style={{width: '200px'}}
    />
);

SearchBox.propTypes = {
  onInput: PropTypes.func,
}

export default SearchBox;

