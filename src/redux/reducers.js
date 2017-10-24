/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import home from '../containers/Leaderboard/reducer';
import userInfo from '../containers/Result/reducer';
import createUser from '../containers/EnterInfo/reducer';

export default combineReducers({
  home,
  userInfo,
  createUser,
  router,
});
