/* @flow */

import type { Dispatch } from './types';
import { fetchLeaderboardIfNeeded } from './containers/Leaderboard/action';
import { fetchResultIfNeeded } from './containers/Result/action';
import LeaderboardPage from './containers/Leaderboard';
import EnterInfoPage from './containers/EnterInfo';
import ResultPage from './containers/Result';

export default [
  {
    path: '/',
    exact: true,
    component: LeaderboardPage, // Add your route here
    loadData: (dispatch: Dispatch) => Promise.all([
      dispatch(fetchLeaderboardIfNeeded()), // Register your server-side call action(s) here
    ]),
  },
  {
    path: '/enter-info',
    exact: true,
    component: EnterInfoPage,
  },
  {
    path: '/result/:id',
    exact: true,
    component: ResultPage,
    loadData: (dispatch: Dispatch, params: Object) => Promise.all([
      dispatch(fetchResultIfNeeded(params.id)),
    ]),
  },
];
