import * as React from 'react';
import Card from '../core/Content/Card';
import {
  header, headerTitle, headerLinks, headerLinksActive, chart, footer,
  footerCircle
} from './InsightsSummary.scss';

interface InsightsSummaryData {
  [key: string]: {
    summary: { students: number, activeStudents: number, time: string };
    data: number[];
  };
}

interface InsightsSummaryState {
  view: string;
  data: InsightsSummaryData;
}

const data: InsightsSummaryData = {
  daily: {
    summary: { students: 1231, activeStudents: 860, time: '02h 40m' },
    data: [],
  },
  monthly: {
    summary: { students: 1450, activeStudents: 860, time: '01h 55m' },
    data: [],
  },
  semester: {
    summary: { students: 1850, activeStudents: 860, time: '01h 30m' },
    data: [],
  },
  yearly: {
    summary: { students: 2600, activeStudents: 860, time: '01h 25m' },
    data: [],
  },
};

export default class InsightsSummary extends React.Component<{}, InsightsSummaryState> {

  constructor(props: any) {
    super(props);
  }

  componentWillMount() {
    this.setState({ data, view: 'daily' });
  }

  componentWillUnmount() {}

  render() {
    return (
      <Card size={100}>
        <div className={header}>
          <h2 className={headerTitle}>Resumo</h2>
          <ul className={headerLinks}>
            {this.renderLinks()}
          </ul>
        </div>
        <div className={chart}>
          <p>Chart will be here</p>
        </div>
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
      { view: 'yearly', text: 'Anual' },
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
      { data: summary.students, text: 'Alunos Matriculados' },
      { data: summary.activeStudents, text: 'Alunos Ativos' },
      { data: summary.time, text: 'Tempo Médio' },
    ];
    return areas.map((area) => {
      return (
        <div>
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
