import { createStore } from 'redux';
// compse
import rootReducer from './reducers/index';

// TODO: get friends from server
const friends = [];

// store for not friend users
const otherUsers = [];

const pending = [];

const snackbar = {
  display: false,
  text: '',
};

const chat = [];

const defaultState = {
  friends,
  userSearchQuery: '',
  otherUsers,
  pending,
  username: '',
  snackbar,
  isPremium: false,
  buyPremium: false,
<<<<<<< HEAD
  chat,
  chatOpen: '',
=======
  changePassword: false,
>>>>>>> master
};

const store = createStore(rootReducer, defaultState);

export default store;
