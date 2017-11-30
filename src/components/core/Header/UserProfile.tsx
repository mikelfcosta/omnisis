import * as React from 'react';
import { userProfile } from './UserProfile.scss';
const defaultAvatar = require('../../../img/default-avatar.jpg');

export default class UserProfile extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={userProfile}>
        <img srcSet={defaultAvatar} />
        <div>
          <h3>Michel Costa</h3>
          <h4>Admin</h4>
        </div>
      </div>
    );
  }
}
