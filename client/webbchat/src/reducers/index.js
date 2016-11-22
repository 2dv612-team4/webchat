import { combineReducers } from 'redux';
import friends from './friends';
import userSearchQuery from './userSearchQuery';
import otherUsers from './otherUsers';

const rootReducer = combineReducers({ friends, userSearchQuery, otherUsers });
export default rootReducer;