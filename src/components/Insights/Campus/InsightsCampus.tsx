import * as React from 'react';
import Card from '../../core/Content/Card';
import { cardHeader } from '../../core/Content/Card.scss';
import { chart } from './InsightsCampus.scss';

export default class InsightsCampus extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <Card size={100}>
          <div className={cardHeader}>
            Acessos por Campus
          </div>
          <div className={chart}>
            <p>ChartType: Lines</p>
            <p>ChartData: AccessByCampus</p>
            <p>ChartOptions: StartDate-EndDate</p>
            <p>ChartLegend: [Each of the Campus]</p>
          </div>
        </Card>
        <Card size={60}>
          <div className={cardHeader}>
            Acessos por Máquinas
          </div>
          <div className={chart}>
            <p>ChartType: Pizza</p>
            <p>ChartData: AccessByMachina</p>
            <p>ChartOptions: Filter by Campus, StartDate-EndDate</p>
            <p>ChartLegend: [Creation, Activation, Assignments, Unassignments, Inactivations]</p>
          </div>
        </Card>
        <Card size={40}>
          <div className={cardHeader}>
            Ativos por Campus
          </div>
          <div className={chart}>
            <p>ChartType: Pizza</p>
            <p>ChartData: ActivesByCampus</p>
            <p>ChartLegend: [Each of the Campus]</p>
          </div>
        </Card>
      </div>
    );
  }
}
