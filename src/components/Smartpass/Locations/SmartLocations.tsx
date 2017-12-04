import * as React from 'react';
import TableCard, { TableCardState } from '../../core/Content/TableCard';
import FabButton from '../../core/Elements/FabButton';
import { ADD } from '../../../icons';
import { Modal } from 'reactstrap';
import SmartLocationsEdit from './SmartLocationsEdit';
import axios from 'axios';
import { MODULES } from '../../../constants';

interface SmartLocationsData {
  _id: string;
  location: string;
  machines: string;
  createdBy: string;
  updatedAt: string;
}

interface SmartLocationsState {
  data: SmartLocationsData[];
  length: number;
  modal: boolean;
}

export default class SmartLocations extends React.Component<{}, SmartLocationsState> {
  private headers = ['ID', 'Campus', 'Local', 'Maquinas', 'Criado por', 'Ultima Atualização'];

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
          <SmartLocationsEdit toggle={this.toggle.bind(this)} />
        </Modal>
      </div>
    );
  }

  getData(event: TableCardState) {
    axios.get(`${MODULES}/locations/locations`, {
      params: {
        page: event.page,
        limit: event.limit,
        order: event.order,
        search: event.search,
      },
    })
      .then((response) => {
        this.setState({ data: response.data.locations, length: response.data.total });
      })
      .catch(err => console.error(err));
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
}
