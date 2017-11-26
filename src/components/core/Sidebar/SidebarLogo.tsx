import * as React from 'react';
import { sidebarLogo } from './Sidebar.scss';
const logo = require('../../../img/logo.svg');

export default class SidebarLogo extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={sidebarLogo}>
        <img srcSet={logo} />
      </div>
    );
  }
}
