import * as React from 'react';
import TableCard, { TableCardState } from '../../core/Content/TableCard';
import FabButton from '../../core/Elements/FabButton';
import { ADD } from '../../../icons';
import { Modal } from 'reactstrap';
import HoldersDetail from './HolderDetail/HoldersDetail';
import axios from 'axios';
import { MODULES } from '../../../constants';

interface HoldersManageData {
  _id: string;
  name: string;
  group: string;
  campus: string;
  activeCard: string;
}

interface HoldersManageState {
  data: HoldersManageData[];
  length: number;
  modal: boolean;
}

export default class HoldersManage extends React.Component<{}, HoldersManageState> {
  private headers = ['Matrícula', 'Nome', 'Grupo', 'Campus', 'Cartão'];

  constructor(props: any) {
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
        <TableCard data={this.state.data} headers={this.headers} order={'-lastUpdatedAt'}
                   rowKey={'_id'} length={this.state.length} onPaginate={this.getData.bind(this)} />
        <FabButton icon={ADD} onClick={this.toggle.bind(this)} />
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <HoldersDetail toggle={this.toggle.bind(this)}/>
        </Modal>
      </div>
    );
  }

  getData(event: TableCardState) {
    axios.get(`${MODULES}/holders/manage`, {
      params: {
        page: event.page,
        limit: event.limit,
        order: event.order,
        search: event.search,
      },
    })
      .then((response) => {
        this.setState({ data: response.data.holders, length: response.data.total });
      })
      .catch(err => console.error(err));
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
}
