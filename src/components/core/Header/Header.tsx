import * as React from 'react';
import { header } from './Header.scss';
import HeaderSearch from './HeaderSearch';
import HeaderButton from './HeaderButton';
import UserProfile from './UserProfile';
import { NOTIFICATION } from '../../../icons';

export default class Header extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={header}>
        <HeaderSearch />
        <span style={{ flex: 1 }} />
        <HeaderButton icon={NOTIFICATION} />
        <UserProfile />
      </div>
    );
  }
}
