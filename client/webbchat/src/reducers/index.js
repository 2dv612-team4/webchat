import { combineReducers } from 'redux';
import friends from './friends';
import pending from './pending';
import username from './settings';
import userSearchQuery from './userSearchQuery';
import otherUsers from './otherUsers';
import snackbar from './snackbar';
import isPremium from './isPremium';
import changePassword from './changePassword';
import buyPremium from './buyPremium';

const rootReducer = combineReducers({
  friends,
  userSearchQuery,
  otherUsers,
  pending,
  username,
  snackbar,
  isPremium,
  changePassword,
  buyPremium,
});

export default rootReducer;
