/* @flow */

import type {
  Dispatch,
  GetState,
  ThunkAction,
  Reducer,
} from '../../types';

export const RESULT_REQUESTING = 'RESULT_REQUESTING';
export const RESULT_FAILURE = 'RESULT_FAILURE';
export const RESULT_SUCCESS = 'RESULT_SUCCESS';

export const API_URL = 'https://7i4kp145i0.execute-api.us-west-2.amazonaws.com/prod/skateometer';

// Export this for unit testing more easily
export const fetchResult = (userId: string, axios: any, URL: string = API_URL): ThunkAction =>
  (dispatch: Dispatch) => {
    dispatch({ type: RESULT_REQUESTING, userId });

    return axios.get(`${URL}/${userId}`)
      .then(res => dispatch({ type: RESULT_SUCCESS, userId, data: res.data[0] }))
      .catch(err => dispatch({ type: RESULT_FAILURE, userId, err: err.message }));
  };

// Using for preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchResult = (state: Reducer, userId: string): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  const userInfo = state.userInfo[userId];

  // Preventing dobule fetching data in production
  if (userInfo && userInfo.readyStatus === RESULT_SUCCESS) return false;

  return true;
};

/* istanbul ignore next */
export const fetchResultIfNeeded = (userId: string): ThunkAction =>
  (dispatch: Dispatch, getState: GetState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchResult(getState(), userId)) {
      /* istanbul ignore next */
      return dispatch(fetchResult(userId, axios));
    }

    /* istanbul ignore next */
    return null;
  };
