import * as React from 'react';
import TableCard, { TableCardState } from '../../core/Content/TableCard';

interface HoldersProfilesData {
  _id?: string;
  name: string;
  users: number;
  createdBy: string;
  updatedAt: string;
}

interface HoldersProfilesState {
  data: HoldersProfilesData[];
}

const data: HoldersProfilesData[] = [
  { name: 'Acesso Básico', users: 15005, createdBy: 'michel.costa', updatedAt: '16/11/2017' },
  { name: 'Studio', users: 80, createdBy: 'michel.costa', updatedAt: '14/11/2017' },
  { name: 'Academia', users: 130, createdBy: 'michel.costa', updatedAt: '14/11/2017' },
  { name: 'BSP', users: 650, createdBy: 'michel.costa', updatedAt: '08/11/2017' },
  { name: 'Ateliês', users: 452, createdBy: 'michel.costa', updatedAt: '04/11/2017' },
];

export default class HoldersProfiles extends React.Component<{}, HoldersProfilesState> {
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
