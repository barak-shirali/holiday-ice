/* @flow */

import _ from 'lodash';

import {
  CREATE_USER_REQUESTING,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
} from './action';

export default (state, action) => {
  switch (action.type) {
    case CREATE_USER_REQUESTING:
      return _.assign({}, state, {
        [action.userId]: {
          readyStatus: CREATE_USER_REQUESTING,
        },
      });
    case CREATE_USER_FAILURE:
      return _.assign({}, state, {
        [action.userId]: {
          readyStatus: CREATE_USER_FAILURE,
          err: action.err,
        },
      });
    case CREATE_USER_SUCCESS:
      return _.assign({}, state, {
        [action.userId]: {
          readyStatus: CREATE_USER_SUCCESS,
          info: action.data,
        },
      });
    default:
      return state;
  }
};
