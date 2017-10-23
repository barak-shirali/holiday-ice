/* @flow */

import type {
  Dispatch,
  GetState,
  ThunkAction,
  Reducer,
} from '../../types';

export const LEADER_BOARD_INVALID = 'LEADER_BOARD_INVALID';
export const LEADER_BOARD_REQUESTING = 'LEADER_BOARD_REQUESTING';
export const LEADER_BOARD_FAILURE = 'LEADER_BOARD_FAILURE';
export const LEADER_BOARD_SUCCESS = 'LEADER_BOARD_SUCCESS';

export const API_URL = 'https://7i4kp145i0.execute-api.us-west-2.amazonaws.com/prod/skateometer';

// Export this for unit testing more easily
export const fetchLeaderboard = (axios: any, URL: string = API_URL): ThunkAction =>
  (dispatch: Dispatch) => {
    dispatch({ type: LEADER_BOARD_REQUESTING });

    return axios.get(URL)
      .then(res => dispatch({ type: LEADER_BOARD_SUCCESS, data: res.data }))
      .catch(err => dispatch({ type: LEADER_BOARD_FAILURE, err: err.message }));
  };

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchLeaderboard = (state: Reducer): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.home.readyStatus === LEADER_BOARD_SUCCESS) {
    return false; // Preventing double fetching data
  }

  return true;
};

/* istanbul ignore next */
export const fetchLeaderboardIfNeeded = (): ThunkAction =>
  (dispatch: Dispatch, getState: GetState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchLeaderboard(getState())) {
      /* istanbul ignore next */
      return dispatch(fetchLeaderboard(axios));
    }

    /* istanbul ignore next */
    return null;
  };
