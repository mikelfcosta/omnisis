import * as React from 'react';
import TableCard, { TableCardState } from '../../core/Content/TableCard';

interface HoldersGroupsData {
  _id?: string;
  name: string;
  users: number;
  createdBy: string;
  updatedAt: string;
}

interface HoldersGroupsState {
  data: HoldersGroupsData[];
}

const data: HoldersGroupsData[] = [
  { name: 'Alunos', users: 2501, createdBy: 'michel.costa', updatedAt: '13/11/2017' },
  { name: 'Professores', users: 188, createdBy: 'michel.costa', updatedAt: '13/11/2017' },
  { name: 'Funcionários', users: 355, createdBy: 'michel.costa', updatedAt: '12/11/2017' },
  { name: 'Visitantes', users: 941, createdBy: 'michel.costa', updatedAt: '02/11/2017' },
  { name: 'Ex Alunos', users: 12050, createdBy: 'michel.costa', updatedAt: '01/11/2017' },
];

export default class HoldersGroups extends React.Component<{}, HoldersGroupsState> {
  private headers = ['Nome', 'Usuários', 'Criado por', 'Ultima Atualização'];

  componentWillMount() {
    this.setState({ data });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <TableCard data={this.state.data} headers={this.headers}
                   rowKey={'name'} length={5} onPaginate={this.getData} />
      </div>
    );
  }

  getData(event: TableCardState) {
    console.log(event);
  }
}
