import * as React from 'react';
import { content, headerBackdrop } from './Content.scss';
import Card from './Card';

export default class Content extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={content}>
        <div className={headerBackdrop} />
        <Card />
        <Card />
        <Card />
      </div>
    );
  }
}
