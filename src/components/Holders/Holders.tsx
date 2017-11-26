import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import HoldersManage from './Manage/HoldersManage';
import HoldersGroups from './Groups/HoldersGroups';
import HoldersProfiles from './Profile/HoldersProfiles';

export default class Holders extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Switch>
        <Route path="/holders/manage" component={HoldersManage}/>
        <Route path="/holders/groups" component={HoldersGroups}/>
        <Route path="/holders/profiles" component={HoldersProfiles}/>
        <Redirect exact to="/holders/manage"/>
      </Switch>
    );
  }
}
