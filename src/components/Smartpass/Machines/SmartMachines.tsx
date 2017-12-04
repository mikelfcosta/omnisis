import * as React from 'react';
import TableCard, { TableCardState } from '../../core/Content/TableCard';
import FabButton from '../../core/Elements/FabButton';
import { ADD } from '../../../icons';
import { Modal } from 'reactstrap';
import SmartMachinesAdd from './SmartMachinesAdd';
import axios from 'axios';
import { MODULES } from '../../../constants';

interface SmartMachinesData {
  _id: string;
  active: string;
  location: string;
  createdBy: string;
  updatedAt: string;
}

interface SmartMachinesState {
  data: SmartMachinesData[];
  length: number;
  modal: boolean;
}

export default class SmartMachines extends React.Component<{}, SmartMachinesState> {
  private headers = ['ID', 'Status', 'Campus', 'Local', 'Criado por', 'Ultima Atualização'];

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
      order: '-_id',
      search: '',
    });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <TableCard data={this.state.data} headers={this.headers} order={'-_id'}
                   rowKey={'_id'} length={this.state.length} onPaginate={this.getData.bind(this)} />
        <FabButton icon={ADD} onClick={this.toggle.bind(this)} />
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <SmartMachinesAdd toggle={this.toggle.bind(this)} />
        </Modal>
      </div>
    );
  }

  getData(event: TableCardState) {
    axios.get(`${MODULES}/locations/machines`, {
      params: {
        page: event.page,
        limit: event.limit,
        order: event.order,
        search: event.search,
      },
    })
      .then((response) => {
        this.setState({ data: response.data.machines, length: response.data.total });
      })
      .catch(err => console.error(err));
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
}
