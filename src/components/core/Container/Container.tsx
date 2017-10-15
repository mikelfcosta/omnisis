import * as React from 'react';
import { container } from './Container.scss';

export default class Container extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={container}>
        Container Div
      </div>
    );
  }
}
