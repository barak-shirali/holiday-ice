/* @flow */

import React, { PureComponent } from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import * as action from './action';
import type { Home as HomeType, Dispatch, Reducer } from '../../types';
import UserList from '../../components/UserList';
import styles from './styles.scss';

type Props = { home: HomeType, fetchLeaderboardIfNeeded: () => void };

// Export this for unit testing more easily
export class Leaderboard extends PureComponent<Props> {
  componentDidMount() {
    this.props.fetchLeaderboardIfNeeded();
  }

  renderLeaderboard = (): Element<'p' | typeof UserList> => {
    const { home } = this.props;

    if (
      !home.readyStatus ||
      home.readyStatus === action.LEADER_BOARD_INVALID ||
      home.readyStatus === action.LEADER_BOARD_REQUESTING
    ) {
      return null;
    }

    if (home.readyStatus === action.LEADER_BOARD_FAILURE) {
      return null;
    }

    return <UserList list={home.list} />;
  };

  render() {
    return (
      <div>
        <Helmet title="Leaderboard" />
        <div className="content-big pb-0">
          <p>Leaderboard</p>
        </div>
        <div className="content table-header-content">
          <table border="0" cellPadding={0} cellSpacing={0} className="leaderboard-header">
            <tbody>
              <tr>
                <td>Rank</td>
                <td>Name</td>
                <td>Calories Burned</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="content">
          {this.renderLeaderboard()}
        </div>
        <div className={styles.EnterYourInfo}>
          <Link className="big-button" to="/enter-info">Enter Your Info</Link>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ home }: Reducer) => ({ home }),
  (dispatch: Dispatch) => ({
    fetchLeaderboardIfNeeded: () => dispatch(action.fetchLeaderboardIfNeeded()),
  }),
);

export default connector(Leaderboard);
