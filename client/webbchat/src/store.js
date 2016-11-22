import { createStore } from 'redux';
// compse
import rootReducer from './reducers/index';

// TODO: get friends from server  
const friends = [];

// store for not friend users
const otherUsers = [];

const defaultState = {
  friends,
  userSearchQuery: '',
  otherUsers,
};

const store = createStore(rootReducer, defaultState);

export default store;