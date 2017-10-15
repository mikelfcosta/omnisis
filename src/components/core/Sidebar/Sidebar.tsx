import * as React from 'react';
import { sidebar } from './Sidebar.scss';
import SidebarLogo from './SidebarLogo';
import Nav from './Nav';

export default class Sidebar extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={sidebar}>
        <SidebarLogo />
        <Nav />
      </div>
    );
  }
}
