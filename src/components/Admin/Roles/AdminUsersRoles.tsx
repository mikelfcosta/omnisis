import * as React from 'react';
import TableCard, { TableCardState } from '../../core/Content/TableCard';

interface AdminUsersRolesData {
  _id?: string;
  name: string;
  level: string;
  users: string;
  createdBy: string;
  updatedAt: string;
}

interface AdminUsersRolesState {
  data: AdminUsersRolesData[];
}

const data: AdminUsersRolesData[] = [
  { name: 'SUPER ADMIN', level: '9', users: '1', createdBy: 'michel.costa', updatedAt: '01/11/2017' },
  { name: 'ADMIN', level: '8', users: '0', createdBy: 'michel.costa', updatedAt: '01/11/2017' },
  { name: 'MANAGER', level: '5', users: '0', createdBy: 'michel.costa', updatedAt: '01/11/2017' },
  { name: 'ANALYTICS', level: '3', users: '0', createdBy: 'michel.costa', updatedAt: '01/11/2017' },
];

export default class AdminUsersRoles extends React.Component<{}, AdminUsersRolesState> {
  private headers = ['Nome', 'Nível', 'Usuários', 'Criado por', 'Ultima Atualização'];

  componentWillMount() {
    this.setState({ data });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <TableCard data={this.state.data} headers={this.headers}
                   rowKey={'name'} length={4} onPaginate={this.getData} />
      </div>
    );
  }

  getData(event: TableCardState) {
    console.log(event);
  }
}
