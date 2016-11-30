import { createStore } from 'redux';
// compse
import rootReducer from './reducers/index';

// TODO: get friends from server
const friends = [];

// store for not friend users
const otherUsers = [];

const pending = [];

const defaultState = {
  friends,
  userSearchQuery: '',
  otherUsers,
  pending,
  username: '',
};

const store = createStore(rootReducer, defaultState);

export default store;
