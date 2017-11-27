import * as React from 'react';
import TableCard, { TableCardState } from '../../core/Content/TableCard';

interface AdminUsersData {
  _id: string;
  name: string;
  status: string;
  role: string;
  createdBy: string;
  updatedAt: string;
}

interface AdminUsersState {
  data: AdminUsersData[];
}

const data: AdminUsersData[] = [
  { _id: 'michel.costa', name: 'Michel Costa', status: 'Ativo', role: 'SUPER ADMIN', createdBy: 'michel.costa', updatedAt: '01/11/2017' },
];

export default class AdminUsers extends React.Component<{}, AdminUsersState> {
  private headers = ['ID', 'Nome', 'Status', 'Perfil', 'Criado por', 'Ultima Atualização'];

  componentWillMount() {
    this.setState({ data });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <TableCard data={this.state.data} headers={this.headers}
                   rowKey={'_id'} length={1} onPaginate={this.getData} />
      </div>
    );
  }

  getData(event: TableCardState) {
    console.log(event);
  }
}
