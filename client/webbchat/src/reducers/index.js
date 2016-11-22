import { combineReducers } from 'redux';
import friends from './friends';
import userSearchQuery from './userSearchQuery';

const rootReducer = combineReducers({ friends, userSearchQuery });
export default rootReducer;