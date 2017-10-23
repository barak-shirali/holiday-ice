/* @flow */

import _ from 'lodash';

import {
  LEADER_BOARD_INVALID,
  LEADER_BOARD_REQUESTING,
  LEADER_BOARD_FAILURE,
  LEADER_BOARD_SUCCESS,
} from './action';
import type { Home, Action } from '../../types';

type State = Home;

const initialState = {
  readyStatus: LEADER_BOARD_INVALID,
  err: null,
  list: [],
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case LEADER_BOARD_REQUESTING:
      return _.assign({}, state, { readyStatus: LEADER_BOARD_REQUESTING });
    case LEADER_BOARD_FAILURE:
      return _.assign({}, state, {
        readyStatus: LEADER_BOARD_FAILURE,
        err: action.err,
      });
    case LEADER_BOARD_SUCCESS:
      return _.assign({}, state, {
        readyStatus: LEADER_BOARD_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
