import React, { PropTypes } from 'react';
import {Button} from 'react-mdl';

const NewGroupChat = ({onCreate}) => (
  <Button
    onClick={onCreate}
    >Create new groupchat</Button>  
);

NewGroupChat.propTypes = {
  onCreate: PropTypes.func,
}

export default NewGroupChat;
