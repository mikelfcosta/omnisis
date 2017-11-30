import * as React from 'react';
import { fabButton } from './FabButton.scss';

interface FabButtonProps {
  icon: string;
  onClick: () => any;
}

export default class FabButton extends React.Component<FabButtonProps, any> {

  constructor(props: FabButtonProps) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div onClick={this.props.onClick} className={fabButton}>
        <img srcSet={this.props.icon} alt="icon"/>
      </div>
    );
  }
}
