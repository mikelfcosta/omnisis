import * as React from 'react';
import TableCard, { TableCardState } from '../../core/Content/TableCard';

interface SmartLocationsData {
  _id: string;
  location: string;
  machines: string;
  createdBy: string;
  updatedAt: string;
}

interface SmartLocationsState {
  data: SmartLocationsData[];
}

const data: SmartLocationsData[] = [
  { _id: '000004', location: 'Morumbi - Entrada Frontal', machines: '4', createdBy: 'michel.costa', updatedAt: '16/11/2017' },
  { _id: '000003', location: 'Vila Olímpia - Academia', machines: '2', createdBy: 'michel.costa', updatedAt: '16/11/2017' },
  { _id: '000002', location: 'Vila Olímpia - Prédio A', machines: '3', createdBy: 'michel.costa', updatedAt: '15/11/2017' },
  { _id: '000001', location: 'Paulista I - Entrada Principal', machines: '4', createdBy: 'michel.costa', updatedAt: '15/11/2017' },
];

export default class SmartLocations extends React.Component<{}, SmartLocationsState> {
  private headers = ['ID', 'Local', 'Maquinas', 'Criado por', 'Ultima Atualização'];

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
