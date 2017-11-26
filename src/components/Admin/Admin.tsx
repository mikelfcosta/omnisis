import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import AdminUsers from './Users/AdminUsers';
import AdminUsersRoles from './Roles/AdminUsersRoles';

export default class Admin extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Switch>
        <Route path="/admin/users" component={AdminUsers}/>
        <Route path="/admin/roles" component={AdminUsersRoles}/>
        <Redirect exact to="/admin/users"/>
      </Switch>
    );
  }
}
