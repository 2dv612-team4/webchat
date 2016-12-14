import React from 'react';
import GroupChatList from './groupchats/GroupChatList';
import FriendList from './friends/Users';
import FindUserList from './others/Users';
import Pending from './pending/Users';

const UserList = () => (
  <div>
    <p>Group chats:</p>
    <GroupChatList />
    <p>Friends:</p>
    <FriendList />
    <p>Other:</p>
    <FindUserList />
    <p>Pending</p>
    <Pending />
  </div>
);


export default UserList;
