/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import home from '../containers/Leaderboard/reducer';

export default combineReducers({
  home,
  router,
});
