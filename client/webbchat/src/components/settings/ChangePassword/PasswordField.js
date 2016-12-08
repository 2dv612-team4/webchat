import React, { PropTypes } from 'react';
import { Textfield } from 'react-mdl';

const PasswordField = ({ onInput, passwordlabel }) => (
    <Textfield
      label={passwordlabel}
      onChange={(event) => onInput(event.target.value)}
      floatingLabel
      required
      type="password"
      style={{width: '100px'}}
    />
);

PasswordField.propTypes = {
  onInput: PropTypes.func,
  passwordlabel: PropTypes.string,
}

export default PasswordField;
