
import * as React from 'react';
import { app } from './App.scss';

export default class App extends React.Component<{}, { count: number; }> {
  interval: number;
  state = { count: 0 };

  // This state will be maintained during hot reloads
  componentWillMount() {
    this.interval = window.setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div className={app}>
        <h1>Hello world!</h1>
        <div>Welcome to hot-reloading Typescript! {this.state.count}</div>
      </div>
    );
  }
}
