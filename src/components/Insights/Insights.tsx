import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import InsightsBehavior from './Behavior/InsightsBehavior';
import InsightsCampus from './Campus/InsightsCampus';
import InsightsCards from './Cards/InsightsCards';

export default class Insights extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Switch>
        <Route path="/insights/behavior" component={InsightsBehavior}/>
        <Route path="/insights/campus" component={InsightsCampus}/>
        <Route path="/insights/cards" component={InsightsCards}/>
        <Redirect exact to="/insights/behavior"/>
      </Switch>
    );
  }
}
