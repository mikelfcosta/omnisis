import * as React from 'react';
import { sidebar } from './Sidebar.scss';

export default class Sidebar extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={sidebar}>
        Sidebar Div
      </div>
    );
  }
}
