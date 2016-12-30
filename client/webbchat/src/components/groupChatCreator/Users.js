import React, { Component } from 'react';
import { List, ListItem, ListItemContent, ListItemAction, IconButton, Tooltip, Button } from 'react-mdl';
import webchatEmitter from '../../model/emitter';
import connect from '../../connect/connect'

// TODO: split function in multible parts, use exisiting lists ex others/user || frinds/users 

class Users extends Component {

  createGroupChat(){
    if(this.props.newGroupChatList.length <= 1){
      return this.props.updateSnackbar({
          display: true,
          text: 'A groupchat need at least 2 users',
        });
    }

    webchatEmitter.emit('create-new-group-chat', this.props.newGroupChatList);

    this.props.newGroupChatList.forEach(this.props.removeFromNewGroupchat)
  }

  render() {
    return (
      <div>
        Users in new chat
        <List>
          {this.props.newGroupChatList
            .filter((username) => 
                username.toLowerCase().match('^'+this.props.filterQuery.toLowerCase()+'.*'))
                  .map((username, i) => 
                    <ListItem
                      key={username}
                      >
                      <ListItemContent>{username}</ListItemContent>
                      <ListItemAction>
                        <Tooltip label="Remove from new group chat" position="bottom">
                          <IconButton 
                            name="remove_circle" 
                            colored
                            onClick={() => this.props.removeFromNewGroupchat(username)} />
                        </Tooltip>  
                      </ListItemAction>
                    </ListItem>)}
        </List>
        Users to add
        <List>
          {this.props.friends
              .filter((friend) => 
                !this.props.newGroupChatList.includes(friend.user.username))
              .filter((friend) => 
                friend.user.username.toLowerCase().match('^'+this.props.filterQuery.toLowerCase()+'.*'))
              .map((friend, i) => 
                <ListItem
                  key={friend.user.username}
                  >
                  <ListItemContent>{friend.user.username}</ListItemContent>
                  <ListItemAction>
                    <Tooltip label="Add to new group chat" position="bottom">
                      <IconButton 
                        name="add_circle" 
                        colored
                        onClick={() => this.props.addToNewGroupchat(friend.user.username)} />
                    </Tooltip>  
                  </ListItemAction>
                </ListItem>)}
        </List>
        <Button
          onClick={() => this.createGroupChat()}>
          Save
        </Button>
      </div>
    )
  }
}

export default connect((state) => ({
  friends: state.friends,
  filterQuery: state.userSearchQuery,
  setChatOpen: state.setChatOpen,
  newGroupChatList: state.newGroupChatList,
  addToNewGroupchat: state.addToNewGroupchat,
  removeFromNewGroupchat: state.removeFromNewGroupchat,
  updateSnackbar: state.updateSnackbar,
}), Users)
