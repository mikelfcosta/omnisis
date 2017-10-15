import * as React from 'react';
import { app } from './App.scss';
import Container from '../Container/Container';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

export default class App extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={app}>
        <h1>Hello world!</h1>
        <Sidebar />
        <Header />
        <Container />
      </div>
    );
  }
}
