import * as React from 'react';
import { header } from './Header.scss';

export default class Header extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={header}>
        header Div
      </div>
    );
  }
}
