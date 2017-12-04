import * as React from 'react';
import TableCard, { TableCardState } from '../../core/Content/TableCard';
import FabButton from '../../core/Elements/FabButton';
import { Modal } from 'reactstrap';
import HoldersGroupsEdit from './HoldersGroupsEdit';
import { ADD } from '../../../icons';
import { MODULES } from '../../../constants';
import axios from 'axios';

interface HoldersGroupsData {
  _id?: string;
  name: string;
  users: number;
  createdBy: string;
  updatedAt: string;
}

interface HoldersGroupsState {
  data: HoldersGroupsData[];
  length: number;
  modal: boolean;
}

export default class HoldersGroups extends React.Component<{}, HoldersGroupsState> {
  private headers = ['Nome', 'Usuários', 'Criado por', 'Ultima Atualização'];

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
      order: 'name',
      search: '',
    });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <TableCard data={this.state.data} headers={this.headers} order={'name'}
                   rowKey={'name'} length={this.state.length} onPaginate={this.getData} />
        <FabButton icon={ADD} onClick={this.toggle.bind(this)} />
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <HoldersGroupsEdit toggle={this.toggle.bind(this)} />
        </Modal>
      </div>
    );
  }

  getData(event: TableCardState) {
    axios.get(`${MODULES}/holders/groups`, {
      params: {
        page: event.page,
        limit: event.limit,
        order: event.order,
        search: event.search,
      },
    })
      .then((response) => {
        this.setState({ data: response.data.groups, length: response.data.total });
      })
      .catch(err => console.error(err));
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
}
