/* @flow */

import React from 'react';
import type { Element } from 'react';
import { Link } from 'react-router-dom';

type Props = { list: Array<Object> };

const UserList = ({ list }: Props): Element<'div'> => (
  <table border={0} cellPadding={0} cellSpacing={0} className="leaderboard">
    <tbody>
      {list.slice(0, 5).map((user, index) => (
        <tr key={`user_${index}`}>
          <td><span>{index + 1}</span></td>
          <td><Link to={`/result/${user.id}`}>{user.firstname} {user.lastname.substr(0, 1)}.</Link></td>
          <td>{user.calories_burned} Calories</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserList;
