/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';

import * as action from './action';

export class UserInfo extends Component {
  componentDidMount() {
    const { fetchResultIfNeeded, match: { params } } = this.props;

    fetchResultIfNeeded(params.id);
  }

  render() {
    const { userInfo, match: { params } } = this.props;
    const userInfoById = userInfo[params.id].info;

    if (!userInfoById) {
      return null;
    }
    const title = `Skate-O-Meter Result by ${userInfoById.firstname} ${userInfoById.lastname}.`;
    const url = `http://ice.fordhaminc.com/result/${params.id}`;
    const desc = `I burned ${userInfoById.calories_burned} calories on skating!`;
    const encodedDesc = encodeURIComponent(desc);

    return (
      <div>
        <Helmet title="Result">
          <meta name="description" content="Skate-o-meter result" />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={desc} />
          <meta property="og:type" content="image" />
          <meta property="og:image" content="http://ice.fordhaminc.com/images/logo.png" />
          <meta property="og:image:width" content="200" />
          <meta property="og:image:height" content="150" />
          <meta name="twitter:card" content="summary" />
        </Helmet>
        <div className="content-big">
          <p>
            Here&rsquo;s the estimated number of calories burned by
            &nbsp;{userInfoById.firstname} {userInfoById.lastname}.
          </p>
        </div>
        <div id="results">
          <big>{userInfoById.calories_burned}</big>
          Estimated calories burned
        </div>
        <table border="0" cellPadding={0} cellSpacing={0} className="social-table">
          <tbody>
            <tr>
              <td className="share-your-result">Share your results</td>
              <td className="social-buttons">
                <a href={`http://www.facebook.com/sharer.php?u=${url}`} target="_blank">
                  <i className="fa fa-facebook" />
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a href={`https://twitter.com/share?url=${url}&amp;text=${encodedDesc}&amp;hashtags=holiday-ice`} target="_blank">
                  <i className="fa fa-twitter" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const connector: Connector<{}> = connect(
  ({ userInfo }) => ({ userInfo }),
  dispatch => ({
    fetchResultIfNeeded: (id: string) => dispatch(action.fetchResultIfNeeded(id)),
  }),
);

export default connector(UserInfo);
