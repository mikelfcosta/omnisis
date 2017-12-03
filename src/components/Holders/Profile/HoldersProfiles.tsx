import * as React from 'react';
import TableCard, { TableCardState } from '../../core/Content/TableCard';
import HoldersProfileAdd from './HoldersProfileAdd';
import FabButton from '../../core/Elements/FabButton';
import Modal from 'reactstrap/lib/Modal';
import { ADD } from '../../../icons';

interface HoldersProfilesData {
  _id?: string;
  name: string;
  users: number;
  createdBy: string;
  updatedAt: string;
}

interface HoldersProfilesState {
  data: HoldersProfilesData[];
  modal: boolean;
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
        <FabButton icon={ADD} onClick={this.toggle.bind(this)} />
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <HoldersProfileAdd toggle={this.toggle.bind(this)} />
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
