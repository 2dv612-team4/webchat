import { createStore } from 'redux';
// compse
import rootReducer from './reducers/index';

// TODO: get friends from server  
const friends = [
  { id: '1', username: 'Arnold' },
  { id: '2', username: 'Kalle' },
  { id: '3', username: 'Skutt' },
  { id: '4', username: 'Karl' },
];

// store for not friend users
const otherUsers = [];

const defaultState = {
  friends,
  userSearchQuery: '',
  otherUsers,
};

const store = createStore(rootReducer, defaultState);

export default store;