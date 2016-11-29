import { combineReducers } from 'redux';
import friends from './friends';
import pending from './pending';
import settings from './settings';
import userSearchQuery from './userSearchQuery';
import otherUsers from './otherUsers';

const rootReducer = combineReducers({ friends, userSearchQuery, otherUsers, pending, settings });
export default rootReducer;
