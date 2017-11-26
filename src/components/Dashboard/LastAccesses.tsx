import * as React from 'react';
import Card from '../core/Content/Card';
import { Table } from 'reactstrap';
import { cardHeader } from '../core/Content/Card.scss';
import { table } from './LastAccesses.scss';

interface LastAccessesData {
  _id: string;
  holderId: string;
  location: string;
  dateTime: string;
}

interface LastAccessesState {
  data: LastAccessesData[];
}

const data = [
  { _id: '0', holderId: '20709639', location: 'Morumbi', dateTime: '11/11/2017 13:20' },
  { _id: '1', holderId: '20751232', location: 'Morumbi', dateTime: '11/11/2017 13:15' },
  { _id: '2', holderId: '23156321', location: 'Vila Olímpia', dateTime: '11/11/2017 13:10' },
  { _id: '3', holderId: '20215613', location: 'Paulista', dateTime: '11/11/2017 13:00' },
  { _id: '5', holderId: '20513135', location: 'Morumbi', dateTime: '11/11/2017 12:55' },
  { _id: '4', holderId: '20684321', location: 'Vila Olímpia', dateTime: '11/11/2017 12:55' },
  { _id: '6', holderId: '20532153', location: 'Morumbi', dateTime: '11/11/2017 12:40' },
  { _id: '7', holderId: '20654312', location: 'Vila Olímpia', dateTime: '11/11/2017 12:32' },
  { _id: '8', holderId: '20709639', location: 'Morumbi', dateTime: '11/11/2017 12:22' },
  { _id: '9', holderId: '20354583', location: 'Pualista', dateTime: '11/11/2017 12:01' },
];

export default class LastAccesses extends React.Component<{}, LastAccessesState> {

  constructor(props: any) {
    super(props);
  }

  componentWillMount() {
    this.setState({ data });
  }

  componentWillUnmount() {}

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
          <th>{row.dateTime}</th>
        </tr>
      );
    });
  }
}
