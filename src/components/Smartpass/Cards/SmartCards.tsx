import * as React from 'react';
import TableCard, { TableCardState } from '../../core/Content/TableCard';
import SmartCardsAdd from './SmartCardsAdd';
import FabButton from '../../core/Elements/FabButton';
import { ADD } from '../../../icons';
import { Modal } from 'reactstrap';

interface SmartCardsData {
  _id: string;
  status: string;
  user: string | null;
  createdBy: string;
  updatedAt: string | null;
}

interface SmartCardsState {
  data: SmartCardsData[];
  modal: boolean;
}

const data: SmartCardsData[] = [
  { _id: '0001200', status: 'Ativo', user: '2153112', createdBy: 'michel.costa', updatedAt: '13/11/2017' },
  { _id: '0001199', status: 'Ativo', user: '2156312', createdBy: 'michel.costa', updatedAt: '12/11/2017' },
  { _id: '0001198', status: 'Ativo', user: '2113215', createdBy: 'michel.costa', updatedAt: '11/11/2017' },
  { _id: '0001197', status: 'Inativo', user: '2132155', createdBy: 'michel.costa', updatedAt: '05/11/2017' },
  { _id: '0001196', status: 'Vazio', user: null, createdBy: 'michel.costa', updatedAt: null },
  { _id: '0001195', status: 'Vazio', user: null, createdBy: 'michel.costa', updatedAt: null },
  { _id: '0001194', status: 'Ativo', user: '21351312', createdBy: 'michel.costa', updatedAt: '04/11/2017' },
  { _id: '0001193', status: 'Ativo', user: '21351321', createdBy: 'michel.costa', updatedAt: '01/11/2017' },
  { _id: '0001192', status: 'Vazio', user: null, createdBy: 'michel.costa', updatedAt: null },
  { _id: '0001191', status: 'Vazio', user: null, createdBy: 'michel.costa', updatedAt: null },
];

export default class SmartCards extends React.Component<{}, SmartCardsState> {
  private headers = ['ID', 'Status', 'Usuário', 'Criado por', 'Ultima Atualização'];

  componentWillMount() {
    this.setState({ data });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <TableCard data={this.state.data} headers={this.headers}
                   rowKey={'_id'} length={1200} onPaginate={this.getData} />
        <FabButton icon={ADD} onClick={this.toggle.bind(this)} />
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <SmartCardsAdd toggle={this.toggle.bind(this)} />
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
