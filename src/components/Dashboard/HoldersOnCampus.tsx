import * as React from 'react';
import Card from '../core/Content/Card';
import { cardHeader } from '../core/Content/Card.scss';
import { chart, table } from './HoldersOnCampus.scss';
import Table from 'reactstrap/lib/Table';

interface HoldersOnCampusData {
  campus: string;
  holders: number;
}

interface HoldersOnCampusState {
  data: HoldersOnCampusData[];
}

const data: HoldersOnCampusData[] = [
  { campus: 'Mooca', holders: 355 },
  { campus: 'Vila Olímpia', holders: 284 },
  { campus: 'Morumbi', holders: 232 },
  { campus: 'Paulista 1', holders: 181 },
  { campus: 'Paulista 2', holders: 163 },
];

export default class HoldersOnCampus extends React.Component<{}, HoldersOnCampusState> {

  componentWillMount() {
    this.setState({ data });
  }

  componentWillUnmount() {}

  render() {
    return (
      <Card size={30}>
        <div className={cardHeader}>
          Alunos nos Campus
        </div>
        <div className={chart}>
          <p>Chart will be here</p>
        </div>
        <Table className={table}>
          <thead>
            <tr>
              <th>Campus</th>
              <th>Alunos</th>
            </tr>
          </thead>
          <tbody>
            {this.renderData()}
          </tbody>
        </Table>
      </Card>
    );
  }

  renderData() {
    return this.state.data.map((row) => {
      return (
        <tr key={row.campus}>
          <th>{row.campus}</th>
          <th>{row.holders}</th>
        </tr>
      );
    });
  }
}
