import * as React from 'react';
import { content } from './Content.scss';

export default class Content extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={content}>
        Content Div
      </div>
    );
  }
}
