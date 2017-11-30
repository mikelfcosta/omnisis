import * as React from 'react';
import TableCard, { TableCardState } from '../../core/Content/TableCard';

interface SmartMachinesData {
  _id: string;
  active: string;
  location: string;
  createdBy: string;
  updatedAt: string;
}

interface SmartMachinesState {
  data: SmartMachinesData[];
}

const data: SmartMachinesData[] = [
  { _id: '000012', active: 'Ativo', location: 'Morumbi - Entrada Frontal', createdBy: 'michel.costa', updatedAt: '13/11/2017' },
  { _id: '000011', active: 'Ativo', location: 'Morumbi - Entrada Frontal', createdBy: 'michel.costa', updatedAt: '13/11/2017' },
  { _id: '000010', active: 'Ativo', location: 'Morumbi - Entrada Frontal', createdBy: 'michel.costa', updatedAt: '13/11/2017' },
  { _id: '000009', active: 'Ativo', location: 'Morumbi - Entrada Frontal', createdBy: 'michel.costa', updatedAt: '13/11/2017' },
  { _id: '000008', active: 'Inativo', location: 'Vila Olímpia - Academia', createdBy: 'michel.costa', updatedAt: '13/11/2017' },
  { _id: '000007', active: 'Ativo', location: 'Vila Olímpia - Prédio A', createdBy: 'michel.costa', updatedAt: '12/11/2017' },
  { _id: '000006', active: 'Ativo', location: 'Vila Olímpia - Prédio A', createdBy: 'michel.costa', updatedAt: '12/11/2017' },
  { _id: '000005', active: 'Ativo', location: 'Vila Olímpia - Prédio A', createdBy: 'michel.costa', updatedAt: '12/11/2017' },
  { _id: '000004', active: 'Inativo', location: 'Paulista I - Entrada Principal', createdBy: 'michel.costa', updatedAt: '11/11/2017' },
  { _id: '000003', active: 'Ativo', location: 'Paulista I - Entrada Principal', createdBy: 'michel.costa', updatedAt: '11/11/2017' },
];

export default class SmartMachines extends React.Component<{}, SmartMachinesState> {
  private headers = ['ID', 'Status', 'Local', 'Criado por', 'Ultima Atualização'];

  componentWillMount() {
    this.setState({ data });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <TableCard data={this.state.data} headers={this.headers}
                   rowKey={'_id'} length={12} onPaginate={this.getData} />
      </div>
    );
  }

  getData(event: TableCardState) {
    console.log(event);
  }
}
