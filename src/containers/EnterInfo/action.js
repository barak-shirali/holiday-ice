/* @flow */

import type {
  Dispatch,
  GetState,
  ThunkAction,
} from '../../types';

export const CREATE_USER_REQUESTING = 'CREATE_USER_REQUESTING';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';

export const API_URL = 'https://7i4kp145i0.execute-api.us-west-2.amazonaws.com/prod/skateometer';

/* istanbul ignore next */
export const createUser =
(firstName: string, lastInitial: string, weight: string, timeSkated: string): ThunkAction =>
  (dispatch: Dispatch, getState: GetState, axios: any) => {
    dispatch({ type: CREATE_USER_REQUESTING });

    // @TODO calculate calories
    const calories = Math.round((timeSkated * weight * 0.453 * 6 * 3.5) / 200);

    return axios.post(API_URL, {
      skater: [
        firstName,
        lastInitial,
        weight,
        timeSkated,
        calories,
      ],
    })
      .then(res => dispatch({ type: CREATE_USER_SUCCESS, data: res.data }))
      .catch(err => dispatch({ type: CREATE_USER_FAILURE, err: err.message }));
  };
