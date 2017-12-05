import * as React from 'react';
import Card from '../../core/Content/Card';
import { cardHeader } from '../../core/Content/Card.scss';
import { chart } from './InsightsCampus.scss';
import { CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import axios from 'axios';
import { MODULES } from '../../../constants';

interface InsightsCampusState {
  accessByCampus: any[];
  accessByMachines: any[];
  activesByCampus: any[];
}

export default class InsightsCampus extends React.Component<{}, InsightsCampusState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      accessByCampus: [],
      accessByMachines: [],
      activesByCampus: [],
    };
  }

  componentWillMount() {
    this.getAccessByCampus();
    this.getAccessByMachines();
    this.getActivesByCampus();
  }

  componentWillUnmount() {}

  getAccessByCampus() {
    axios.get(`${MODULES}/insights/campus/accessByCampus`)
      .then(response => this.setState({ accessByCampus: response.data }))
      .catch(err => console.error(err));
  }

  getAccessByMachines() {
    axios.get(`${MODULES}/insights/campus/accessByMachine`)
      .then(response => this.setState({ accessByMachines: response.data }))
      .catch(err => console.error(err));
  }

  getActivesByCampus() {
    axios.get(`${MODULES}/insights/campus/activesByCampus`)
      .then(response => this.setState({ activesByCampus: response.data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <Card size={100}>
          <div className={cardHeader}>
            Acessos por Campus
          </div>
          <ResponsiveContainer height={400}>
            <LineChart height={400} data={this.state.accessByCampus}
                       margin={{ top: 40, right: 20, left: 20, bottom: 10 }}>
              <XAxis dataKey="name"/>
              <CartesianGrid strokeDasharray="2 3" vertical={false}/>
              <Tooltip/>
              <Legend />
              <Line type="monotone" dataKey="Mooca" stroke="#004751" />
              <Line type="monotone" dataKey="Paulista II" stroke="#067A7C" />
              <Line type="monotone" dataKey="Morumbi" stroke="#ED9262" />
              <Line type="monotone" dataKey="Vila Olimpia" stroke="#1FB0B3" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card size={60}>
          <div className={cardHeader}>
            Acessos por Máquinas
          </div>
          <ResponsiveContainer height={300}>
            <PieChart>
              <Pie data={this.state.accessByMachines} innerRadius={40} outerRadius={80} fill="#ED9262" dataKey="Acessos"/>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card size={40}>
          <div className={cardHeader}>
            Ativos por Campus
          </div>
          <ResponsiveContainer height={300}>
            <PieChart>
              <Pie data={this.state.activesByCampus} innerRadius={40} outerRadius={80} fill="#ED9262" dataKey="Ativos" label/>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    );
  }
}
