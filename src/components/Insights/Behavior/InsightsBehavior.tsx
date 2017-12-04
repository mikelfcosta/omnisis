import * as React from 'react';
import Card from '../../core/Content/Card';
import { cardHeader } from '../../core/Content/Card.scss';
import { chart } from './InsightsBehavior.scss';
import { MODULES } from '../../../constants';
import axios from 'axios';
import { LineChart, ResponsiveContainer, XAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';

interface InsightsBehaviorState {
  accessByDay: any[];
}

export default class InsightsBehavior extends React.Component<{}, InsightsBehaviorState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      accessByDay: [],
    };
  }

  componentWillMount() {
    this.getAccessByDay();
  }

  componentWillUnmount() {}

  getAccessByDay() {
    axios.get(`${MODULES}/insights/behavior/accessByDay`)
      .then(response => this.setState({ accessByDay: response.data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <Card size={100}>
          <div className={cardHeader}>
            Acessos por Dia
          </div>
          <ResponsiveContainer height={400}>
            <LineChart height={400} data={this.state.accessByDay}
                       margin={{ top: 40, right: 20, left: 20, bottom: 10 }}>
              <XAxis dataKey="name"/>
              <CartesianGrid strokeDasharray="2 3" vertical={false}/>
              <Tooltip/>
              <Legend />
              <Line type="monotone" dataKey="access" stroke="#004751" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card size={60}>
          <div className={cardHeader}>
            Média de Tempo de Acesso
          </div>
          <div className={chart}>
            <p>ChartType: Pizza</p>
            <p>ChartData: AverageAccessTime</p>
            <p>ChartOptions: Select StartDate/EndDate</p>
            <p>ChartLegend: [0-30m, 31m-60m, 1h-2h, 2h-3h, 3h+]</p>
          </div>
        </Card>
        <Card size={40}>
          <div className={cardHeader}>
            Média de Inatividade
          </div>
          <div className={chart}>
            <p>ChartType: Pizza</p>
            <p>ChartData: AverageAccessTime</p>
            <p>ChartOptions: Select StartDate/EndDate</p>
            <p>ChartLegend: [7d-15d, 16d-30d, 1m-2m, 3m+]</p>
          </div>
        </Card>
        <Card size={100}>
          <div className={cardHeader}>
            Ativos e Inativos
          </div>
          <div className={chart}>
            <p>ChartType: Lines</p>
            <p>ChartData: Inactives</p>
            <p>ChartOptions: Select StartDate/EndDate</p>
            <p>ChartLegend: [ActiveCount, InactiveCount]</p>
          </div>
        </Card>
      </div>
    );
  }
}
