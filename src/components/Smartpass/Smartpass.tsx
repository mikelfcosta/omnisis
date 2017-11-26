import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import SmartMachines from './Machines/SmartMachines';
import SmartCards from './Cards/SmartCards';
import SmartLocations from './Locations/SmartLocations';
import { Redirect } from 'react-router';

export default class Smartpass extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Switch>
        <Redirect to="/iot/machines"/>
        <Route path="/iot/machines" component={SmartMachines}/>
        <Route path="/iot/cards" component={SmartCards}/>
        <Route path="/iot/locations" component={SmartLocations}/>
      </Switch>
    );
  }
}
