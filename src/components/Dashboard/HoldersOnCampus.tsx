import * as React from 'react';
import Card from '../core/Content/Card';
import { cardHeader } from '../core/Content/Card.scss';
import { chart, table } from './HoldersOnCampus.scss';
import Table from 'reactstrap/lib/Table';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface HoldersOnCampusData {
  name: string;
  holders: number;
}

interface HoldersOnCampusState {
  data: HoldersOnCampusData[];
}

const data: HoldersOnCampusData[] = [
  { name: 'Mooca', holders: 355 },
  { name: 'Vila Olímpia', holders: 284 },
  { name: 'Morumbi', holders: 232 },
  { name: 'Paulista 1', holders: 181 },
  { name: 'Paulista 2', holders: 163 },
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
        <ResponsiveContainer height={250}>
          <PieChart>
            <Pie data={this.state.data} innerRadius={40} outerRadius={80} fill="#82ca9d" dataKey="holders" label/>
            <Tooltip/>
          </PieChart>
        </ResponsiveContainer>
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
        <tr key={row.name}>
          <th>{row.name}</th>
          <th>{row.holders}</th>
        </tr>
      );
    });
  }
}
