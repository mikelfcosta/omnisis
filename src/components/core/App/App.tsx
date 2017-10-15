import * as React from 'react';
import { app, container } from './App.scss';
import Content from '../Content/Content';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

export default class App extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={app}>
        <Sidebar />
        <div className={container}>
          <Header />
          <Content />
        </div>
      </div>
    );
  }
}
