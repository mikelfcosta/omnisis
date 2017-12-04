import * as React from 'react';
import TableCard, { TableCardState } from '../../core/Content/TableCard';
import SmartCardsAdd from './SmartCardsAdd';
import FabButton from '../../core/Elements/FabButton';
import { ADD } from '../../../icons';
import { Modal } from 'reactstrap';
import { MODULES } from '../../../constants';
import axios from 'axios';

interface SmartCardsData {
  _id: string;
  status: string;
  user: string | null;
  lastAssignedBy: string;
  lastAssignedAt: string;
}

interface SmartCardsState {
  data: SmartCardsData[];
  length: number;
  modal: boolean;
}

export default class SmartCards extends React.Component<{}, SmartCardsState> {
  private headers = ['ID', 'Status', 'Usuário', 'Criado por', 'Ultima Atualização'];

  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      length: 0,
      modal: false,
    };
  }

  componentWillMount() {
    this.getData({
      page: 0,
      limit: 10,
      order: '-lastUpdatedAt',
      search: '',
    });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <TableCard data={this.state.data} headers={this.headers}
                   rowKey={'_id'} length={this.state.length} onPaginate={this.getData.bind(this)} />
        <FabButton icon={ADD} onClick={this.toggle.bind(this)} />
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <SmartCardsAdd toggle={this.toggle.bind(this)} />
        </Modal>
      </div>
    );
  }

  getData(event: TableCardState) {
    axios.get(`${MODULES}/iot/cards`, {
      params: {
        page: event.page,
        limit: event.limit,
        order: event.order,
        search: event.search,
      },
    })
      .then((response) => {
        this.setState({ data: response.data.cards, length: response.data.total });
      })
      .catch(err => console.error(err));
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
}
