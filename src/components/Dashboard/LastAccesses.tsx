import * as React from 'react';
import Card from '../core/Content/Card';
import { Table } from 'reactstrap';
import { cardHeader } from '../core/Content/Card.scss';
import { table } from './LastAccesses.scss';
import axios from 'axios';
import { MODULES } from '../../constants';

interface LastAccessesData {
  _id: string;
  holderId: string;
  location: string;
  type: string;
  dateTime: string;
}

interface LastAccessesState {
  data: LastAccessesData[];
}

export default class LastAccesses extends React.Component<{}, LastAccessesState> {

  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    this.getData();
  }

  componentWillUnmount() {}

  getData() {
    axios.get(`${MODULES}/dashboard/logs`)
      .then(response => this.setState({ data: response.data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Card size={70}>
        <div className={cardHeader}>
          Últimos Acessos
        </div>
        <Table striped className={table}>
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Local</th>
              <th>Tipo</th>
              <th>Data / Hora</th>
            </tr>
          </thead>
          <tbody>
            {this.renderAccesses()}
          </tbody>
        </Table>
      </Card>
    );
  }

  renderAccesses() {
    return this.state.data.map((row) => {
      return (
        <tr key={row._id}>
          <th scope="row">{row.holderId}</th>
          <th>{row.location}</th>
          <th>{row.type}</th>
          <th>{row.dateTime}</th>
        </tr>
      );
    });
  }
}
