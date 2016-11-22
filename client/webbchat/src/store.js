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

// TODO: get users from server...
const otherUsers = [
  { username: 'Björn'},
  { username: 'Alex' },
  { username: 'Sebbe' }
]

const defaultState = {
  friends,
  userSearchQuery: '',
  otherUsers,
};

const store = createStore(rootReducer, defaultState);

export default store;