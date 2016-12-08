import React, { PropTypes } from 'react';
import { Textfield } from 'react-mdl';

const SearchBox = ({ onInput, onSubmit }) => (
    <Textfield
      onChange={(event) => onInput(event.target.value)}
      onKeyPress={(event) => onSubmit(event)}
      label="Search for users"
      floatingLabel
    />
);

SearchBox.propTypes = {
  onInput: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default SearchBox;
