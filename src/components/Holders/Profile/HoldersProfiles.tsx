import * as React from 'react';
import TableCard, { TableCardState } from '../../core/Content/TableCard';
import HoldersProfileAdd from './HoldersProfileAdd';
import FabButton from '../../core/Elements/FabButton';
import { Modal } from 'reactstrap';
import { ADD } from '../../../icons';
import axios from 'axios';
import { MODULES } from '../../../constants';

interface HoldersProfilesData {
  _id?: string;
  name: string;
  users: number;
  createdBy: string;
  updatedAt: string;
}

interface HoldersProfilesState {
  data: HoldersProfilesData[];
  length: number;
  modal: boolean;
}

export default class HoldersProfiles extends React.Component<{}, HoldersProfilesState> {
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
        <TableCard data={this.state.data} headers={this.headers} edit={true} onEdit={this.onEdit.bind(this)}
                   rowKey={'name'} length={this.state.length} onPaginate={this.getData} />
        <FabButton icon={ADD} onClick={this.toggle.bind(this)} />
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <HoldersProfileAdd toggle={this.toggle.bind(this)} />
        </Modal>
      </div>
    );
  }

  getData(event: TableCardState) {
    axios.get(`${MODULES}/holders/profiles`, {
      params: {
        page: event.page,
        limit: event.limit,
        order: event.order,
        search: event.search,
      },
    })
      .then((response) => {
        this.setState({ data: response.data.profiles, length: response.data.total });
      })
      .catch(err => console.error(err));
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }


  onEdit(row: HoldersProfilesData) {
    console.log(row);
  }
}
