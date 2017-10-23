/* @flow */

import type { Dispatch } from './types';
import { fetchLeaderboardIfNeeded } from './containers/Leaderboard/action';
import LeaderboardPage from './containers/Leaderboard';

export default [
  {
    path: '/',
    exact: true,
    component: LeaderboardPage, // Add your route here
    loadData: (dispatch: Dispatch) => Promise.all([
      dispatch(fetchLeaderboardIfNeeded()), // Register your server-side call action(s) here
    ]),
  },
];
