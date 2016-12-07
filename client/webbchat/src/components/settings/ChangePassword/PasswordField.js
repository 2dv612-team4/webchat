import React, { PropTypes } from 'react';
import { Textfield } from 'react-mdl';

const PasswordField = ({ passwordlabel, passwordref }) => (
    <Textfield
      label={passwordlabel}
      floatingLabel
      required
      ref={passwordref}
      type="password"
      style={{width: '100px'}}
    />
);

PasswordField.propTypes = {
  passwordlabel: PropTypes.string,
  passwordref: PropTypes.string,
}

export default PasswordField;
