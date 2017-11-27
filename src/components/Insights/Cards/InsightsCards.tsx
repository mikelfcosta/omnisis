import * as React from 'react';
import Card from '../../core/Content/Card';
import { chart } from './InsightsCards.scss';
import { cardHeader } from '../../core/Content/Card.scss';

export default class InsightsCards extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <Card size={100}>
          <div className={cardHeader}>
            Cartões
          </div>
          <div className={chart}>
            <p>ChartType: Pizza</p>
            <p>ChartData: CardsByStatus</p>
            <p>ChartLegend: [Active, Inactive, Unassigned]</p>
          </div>
        </Card>
        <Card size={100}>
          <div className={cardHeader}>
            Ativações e Inativações
          </div>
          <div className={chart}>
            <p>ChartType: Lines</p>
            <p>ChartData: AssignmentsByTime</p>
            <p>ChartLegend: [Creation, Activation, Assignments, Unassignments, Inactivations]</p>
          </div>
        </Card>
      </div>
    );
  }
}
