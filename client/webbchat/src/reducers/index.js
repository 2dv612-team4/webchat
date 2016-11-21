import { combineReducers } from 'redux';
import friends from './friends';
import userSearchQuery from './userSearchQuery';
// TODO if neded combind reducers
const rootReducer = combineReducers({ friends, userSearchQuery });
export default rootReducer;