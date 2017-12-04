import * as React from 'react';
import Card from '../../core/Content/Card';
import { cardHeader } from '../../core/Content/Card.scss';
import { chart } from './InsightsBehavior.scss';
import { MODULES } from '../../../constants';
import axios from 'axios';
import { LineChart, ResponsiveContainer, XAxis, CartesianGrid, Tooltip, Legend, Line, PieChart, Pie } from 'recharts';

interface InsightsBehaviorState {
  accessByDay: any[];
  activeInactiveCount: any[];
  averageAccessTime: any[];
  averageInactiveTime: any[];
}

export default class InsightsBehavior extends React.Component<{}, InsightsBehaviorState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      accessByDay: [],
      activeInactiveCount: [],
      averageAccessTime: [],
      averageInactiveTime: [],
    };
  }

  componentWillMount() {
    this.getAccessByDay();
    this.getActiveInactiveCount();
    this.getAverageAccessTime();
    this.getAverageInactiveTime();
  }

  componentWillUnmount() {}

  getAccessByDay() {
    axios.get(`${MODULES}/insights/behavior/accessByDay`)
      .then(response => this.setState({ accessByDay: response.data }))
      .catch(err => console.error(err));
  }

  getActiveInactiveCount() {
    axios.get(`${MODULES}/insights/behavior/activeInactiveCount`)
      .then(response => this.setState({ activeInactiveCount: response.data }))
      .catch(err => console.error(err));
  }

  getAverageAccessTime() {
    axios.get(`${MODULES}/insights/behavior/averageAccessTime`)
      .then(response => this.setState({ averageAccessTime: response.data }))
      .catch(err => console.error(err));
  }

  getAverageInactiveTime() {
    axios.get(`${MODULES}/insights/behavior/averageInactiveTime`)
      .then(response => this.setState({ averageInactiveTime: response.data }))
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
          <ResponsiveContainer height={300}>
            <PieChart>
              <Pie data={this.state.averageAccessTime} innerRadius={40} outerRadius={80} fill="#ED9262" dataKey="value" label/>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card size={40}>
          <div className={cardHeader}>
            Média de Inatividade
          </div>
          <ResponsiveContainer height={300}>
            <PieChart>
              <Pie data={this.state.averageInactiveTime} innerRadius={40} outerRadius={80} fill="#ED9262" dataKey="value" label/>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card size={100}>
          <div className={cardHeader}>
            Ativos e Inativos
          </div>
          <ResponsiveContainer height={400}>
            <LineChart height={400} data={this.state.activeInactiveCount}
                       margin={{ top: 40, right: 20, left: 20, bottom: 10 }}>
              <XAxis dataKey="name"/>
              <CartesianGrid strokeDasharray="2 3" vertical={false}/>
              <Tooltip/>
              <Legend />
              <Line type="monotone" dataKey="active" stroke="#004751" />
              <Line type="monotone" dataKey="inactive" stroke="#004751" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    );
  }
}
