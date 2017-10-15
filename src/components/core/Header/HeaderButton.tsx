import * as React from 'react';
import { headerButton } from './Header.scss';

interface IHeaderButtonProps {
  icon: string;
}

export default class HeaderButton extends React.Component<IHeaderButtonProps, {}> {

  constructor(props: IHeaderButtonProps) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={headerButton}>
        <img srcSet={this.props.icon} alt="Button" />
      </div>
    );
  }
}
