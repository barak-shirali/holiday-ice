/* @flow */

import _ from 'lodash';

import {
  RESULT_REQUESTING,
  RESULT_FAILURE,
  RESULT_SUCCESS,
} from './action';
import type { UserInfo, Action } from '../../types';

type State = UserInfo;

export default (state: State = {}, action: Action): State => {
  switch (action.type) {
    case RESULT_REQUESTING:
      return _.assign({}, state, {
        [action.userId]: {
          readyStatus: RESULT_REQUESTING,
        },
      });
    case RESULT_FAILURE:
      return _.assign({}, state, {
        [action.userId]: {
          readyStatus: RESULT_FAILURE,
          err: action.err,
        },
      });
    case RESULT_SUCCESS:
      return _.assign({}, state, {
        [action.userId]: {
          readyStatus: RESULT_SUCCESS,
          info: action.data,
        },
      });
    default:
      return state;
  }
};
