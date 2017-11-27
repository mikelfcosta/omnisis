import * as React from 'react';
import Card from '../../core/Content/Card';
import { cardHeader } from '../../core/Content/Card.scss';
import { chart } from './InsightsBehavior.scss';

export default class InsightsBehavior extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <Card size={100}>
          <div className={cardHeader}>
            Acessos por Dia
          </div>
          <div className={chart}>
            <p>ChartType: Lines</p>
            <p>ChartData: AccessesByDay</p>
            <p>ChartOptions: Select StartDate/EndDate</p>
            <p>ChartLegend: [ActiveAcesses, InactiveAcesses, Total]</p>
          </div>
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
