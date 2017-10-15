import * as React from 'react';
import { card } from './Card.scss';

export default class Card extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={card} style={{ height: '400px' }}>
        Card Component
      </div>
    );
  }
}
