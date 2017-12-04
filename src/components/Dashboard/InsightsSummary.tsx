import * as React from 'react';
import Card from '../core/Content/Card';
import {
  header, headerTitle, headerLinks, headerLinksActive, chart, footer,
  footerCircle,
} from './InsightsSummary.scss';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { MODULES } from '../../constants';

interface InsightsSummaryData {
  [key: string]: {
    summary: { students: number, activeStudents: number, time: string };
    data: any[];
  };
}

interface InsightsSummaryState {
  view: string;
  data: InsightsSummaryData;
}

const data: InsightsSummaryData = {
  daily: {
    summary: { students: 0, activeStudents: 0, time: '00h 00m' },
    data: [],
  },
  monthly: {
    summary: { students: 0, activeStudents: 0, time: '00h 00m' },
    data: [],
  },
  semester: {
    summary: { students: 0, activeStudents: 0, time: '00h 00m' },
    data: [],
  },
};

export default class InsightsSummary extends React.Component<{}, InsightsSummaryState> {

  constructor(props: any) {
    super(props);
    this.state = {
      data,
      view: 'daily',
    };
  }

  componentWillMount() {
    this.getData();
  }

  componentWillUnmount() {}

  getData() {
    axios.get(`${MODULES}/dashboard/summary`)
      .then(response => this.setState({ data: response.data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Card size={100}>
        <div className={header}>
          <h2 className={headerTitle}>Resumo</h2>
          <ul className={headerLinks}>
            {this.renderLinks()}
          </ul>
        </div>
        <ResponsiveContainer height={400}>
          <LineChart width={800} height={400} data={this.state.data[this.state.view].data}
                     margin={{ top: 40, right: 20, left: 20, bottom: 10 }}>
            <XAxis dataKey="name"/>
            <CartesianGrid strokeDasharray="2 3" vertical={false}/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" dataKey="registered" stroke="#ED9262" activeDot={{ r: 8 }}/>
            <Line type="monotone" dataKey="active" stroke="#004751" />
          </LineChart>
        </ResponsiveContainer>
        <div className={footer}>
          {this.renderNumbers()}
        </div>
      </Card>
    );
  }

  renderLinks() {
    const links = [
      { view: 'daily', text: 'Diário' },
      { view: 'monthly', text: 'Mensal' },
      { view: 'semester', text: 'Semestral' },
    ];

    return links.map((link) => {
      return (
        <li key={link.view} onClick={() => this.setView(link.view)} className={this.state.view === link.view ? headerLinksActive : ''}>
          {link.text}
        </li>
      );
    });
  }

  renderNumbers() {
    const currentView = this.state.view;
    const summary = this.state.data[currentView].summary;
    const areas = [
      { data: summary.students, text: 'Novos Alunos Matriculados' },
      { data: summary.activeStudents, text: 'Alunos Ativos' },
      { data: summary.time, text: 'Tempo Médio' },
    ];
    return areas.map((area) => {
      return (
        <div key={area.text}>
          <span className={footerCircle}>
            <span />
          </span>
          <div>
            <h1>{area.data}</h1>
            <h3>{area.text}</h3>
          </div>
        </div>
      );
    });
  }

  setView(view: string) {
    this.setState({ view });
  }
}
