import * as React from 'react';
import Card from '../../core/Content/Card';
import { cardHeader } from '../../core/Content/Card.scss';
import { ResponsiveContainer, Sector, PieChart, Pie } from 'recharts';
import axios from 'axios';
import { MODULES } from '../../../constants';

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} Cartões`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

interface InsightsCardsState {
  activeIndex: number;
  data: any[];
}

export default class InsightsCards extends React.Component<{}, InsightsCardsState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      activeIndex: 0,
      data: [],
    };
  }


  getInitialState() {
    return {
      activeIndex: 0,
    };
  }

  onPieEnter(data: any[], index: number) {
    this.setState({
      activeIndex: index,
    });
  }

  componentWillMount() {
    this.getData();
  }

  componentWillUnmount() {}

  getData() {
    axios.get(`${MODULES}/insights/cards`)
      .then(response => this.setState({ data: response.data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <Card size={100}>
          <div className={cardHeader}>
            Cartões
          </div>
          <ResponsiveContainer height={600}>
            <PieChart height={500}>
              <Pie
                height={500}
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape}
                data={this.state.data}
                dataKey={'Quantidade'}
                innerRadius={60}
                outerRadius={80}
                fill="#ED9262"
                onMouseEnter={this.onPieEnter.bind(this)}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    );
  }
}
