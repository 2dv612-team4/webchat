import React from 'react';
import FriendList from './friends/App';
import FindUserList from './others/App';
import Pending from './pending/App';

const UserList = () => (
  <div>
    Friends:
    <FriendList />
    Other: 
    <FindUserList />
    Pending
    <Pending />
  </div>
);


export default UserList;

