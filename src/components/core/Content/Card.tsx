import * as React from 'react';
import { card } from './Card.scss';

interface ICardProps {
  size: number;
  height?: number;
}

interface ICardStyle {
  height?: string;
  flex: string;
  maxWidth: string;
}

export default class Card extends React.Component<ICardProps, any> {
  private style: ICardStyle = {
    height: `${this.props.height}px`,
    flex: `1 1 ${this.props.size}%`,
    maxWidth: `${this.props.size}%`,
  };

  constructor(props: ICardProps) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={card} style={this.style}>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
