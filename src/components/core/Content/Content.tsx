import * as React from 'react';
import { content, headerBackdrop } from './Content.scss';
import { Switch, Route } from 'react-router-dom';
import Dash from '../../Dashboard/Dash';
import Smartpass from '../../Smartpass/Smartpass';
import Holders from '../../Holders/Holders';
import Insights from '../../Insights/Insights';
import Admin from '../../Admin/Admin';

export default class Content extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={content}>
        <div className={headerBackdrop} />
        <Switch>
          <Route exact path="/" component={Dash}/>
          <Route path="/iot" component={Smartpass}/>
          <Route path="/holders" component={Holders}/>
          <Route path="/insights" component={Insights}/>
          <Route path="/admin" component={Admin}/>
        </Switch>
      </div>
    );
  }
}
