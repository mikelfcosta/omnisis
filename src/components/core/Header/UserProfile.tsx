import * as React from 'react';
import { userProfile } from './UserProfile.scss';

export default class UserProfile extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={userProfile}>
        <img srcSet={'img/default-avatar.jpg'} />
        <div>
          <h3>Michel Costa</h3>
          <h4>Admin</h4>
        </div>
      </div>
    );
  }
}
