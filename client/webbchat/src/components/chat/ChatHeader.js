import React, { Component } from 'react';
import connect from '../../connect/connect';
import webchatEmitter from '../../model/emitter';
import { Textfield, Menu, MenuItem, List, ListItem, Tooltip, IconButton, ListItemAction, ListItemContent } from 'react-mdl';

// TODO: clean this!

class ChatHeader extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchText: '',
    };
  }

  addUserToChat(userIdToAdd){
    if(this.props.chat.isGroupChat){
     return webchatEmitter.emit('add-user-to-group-chat', 
        {chatId: this.props.chat.id, usersToAdd: [userIdToAdd]} );
    }
     webchatEmitter.emit('create-new-group-chat-from-friend-chat', 
      {chatId: this.props.chat.id, usersToAdd: [userIdToAdd]} );
  }

  render() {
    const chat = this.props.chat;
    return (
      <div className='chatHeader'>
        <IconButton name="person" id={`userInChat_iconbutton_${chat.id}`}/>
        <Menu align="right" target={`userInChat_iconbutton_${chat.id}`}>
          { chat.users.map(user => (
              <MenuItem key={`chatMenuKey_${user.username}`}>{user.username}</MenuItem>
            )) }
        </Menu>

        <Textfield
          id="addUserToChatSearch"
          onChange={(e) => this.setState({ searchText: e.target.value })}
          onClick={() => { console.log('onClick', this.state.searchText)}}
          label="Expandable Input"
          expandable
          expandableIcon="person_add"
        />

        {
          this.state.searchText.length > 0 ?
            (<List>
              { this.props.friends
                  .filter(friend => !chat.users.find(user => user.username === friend.user.username))  
                  .filter(friend => 
                    friend.user.username.toLowerCase().match('^'+this.state.searchText.toLowerCase()+'.*'))
                  .map((friend, i) => (
                    <ListItem key={`addUserToChatListKey_${friend.username}`}>
                      <ListItemContent >{friend.user.username}</ListItemContent>
                        <ListItemAction>
                          <Tooltip label="Send friend request" position="bottom">
                            <IconButton 
                              name="add_circle" 
                              colored
                              onClick={() => this.addUserToChat(friend.user._id)} />
                          </Tooltip>  
                        </ListItemAction> 
                    </ListItem>)) }
            </List>) : 
            null
        }
      </div>
    );
  }
}

export default connect((state) => ({
  friends: state.friends,
}), ChatHeader);
