import * as React from 'react';
import TableCard, { TableCardState } from '../../core/Content/TableCard';
import FabButton from '../../core/Elements/FabButton';
import { ADD } from '../../../icons';
import { Modal } from 'reactstrap';
import SmartLocationsEdit from './SmartLocationsEdit';

interface SmartLocationsData {
  _id: string;
  location: string;
  machines: string;
  createdBy: string;
  updatedAt: string;
}

interface SmartLocationsState {
  data: SmartLocationsData[];
  modal: boolean;
}

const data: SmartLocationsData[] = [
  { _id: '000004', location: 'Morumbi - Entrada Frontal', machines: '4', createdBy: 'michel.costa', updatedAt: '16/11/2017' },
  { _id: '000003', location: 'Vila Olímpia - Academia', machines: '2', createdBy: 'michel.costa', updatedAt: '16/11/2017' },
  { _id: '000002', location: 'Vila Olímpia - Prédio A', machines: '3', createdBy: 'michel.costa', updatedAt: '15/11/2017' },
  { _id: '000001', location: 'Paulista I - Entrada Principal', machines: '4', createdBy: 'michel.costa', updatedAt: '15/11/2017' },
];

export default class SmartLocations extends React.Component<{}, SmartLocationsState> {
  private headers = ['ID', 'Local', 'Maquinas', 'Criado por', 'Ultima Atualização'];

  constructor(props: any) {
    super(props);

    this.state = {
      data,
      modal: false,
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <TableCard data={this.state.data} headers={this.headers}
                   rowKey={'_id'} length={4} onPaginate={this.getData} />
        <FabButton icon={ADD} onClick={this.toggle.bind(this)} />
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <SmartLocationsEdit toggle={this.toggle.bind(this)} />
        </Modal>
      </div>
    );
  }

  getData(event: TableCardState) {
    console.log(event);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
}
