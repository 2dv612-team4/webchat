import { createStore } from 'redux';
// compse
import rootReducer from './reducers/index';

// TODO: get friends from server
const friends = [];

// store for not friend users
const otherUsers = [];

const pending = [];

const settings = [];

const defaultState = {
  friends,
  userSearchQuery: '',
  otherUsers,
  pending,
  settings,
};

const store = createStore(rootReducer, defaultState);

export default store;
