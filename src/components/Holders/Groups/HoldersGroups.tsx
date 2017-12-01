import * as React from 'react';
import TableCard, { TableCardState } from '../../core/Content/TableCard';
import FabButton from '../../core/Elements/FabButton';
import Modal from 'reactstrap/lib/Modal';
import HoldersGroupsEdit from './HoldersGroupsEdit';
import { ADD } from '../../../icons';

interface HoldersGroupsData {
  _id?: string;
  name: string;
  users: number;
  createdBy: string;
  updatedAt: string;
}

interface HoldersGroupsState {
  data: HoldersGroupsData[];
  modal: boolean;
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
        <FabButton icon={ADD} onClick={this.toggle.bind(this)} />
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <HoldersGroupsEdit toggle={this.toggle.bind(this)} />
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
