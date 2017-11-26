import * as React from 'react';
import TableCard from '../../core/Content/TableCard';

interface HoldersManageData {
  holderId: string;
  name: string;
  campus: string;
  course: string;
  semester: number;
}

interface HoldersManageState {
  data: HoldersManageData[];
}

const data: HoldersManageData[] = [
  { holderId: '20709639', name: 'Michel Costa', campus: 'Morumbi', course: 'Design Digital', semester: 6 },
  { holderId: '23504602', name: 'Michel Costa', campus: 'Morumbi', course: 'Design Digital', semester: 6 },
  { holderId: '20135403', name: 'Michel Costa', campus: 'Morumbi', course: 'Design Digital', semester: 6 },
  { holderId: '23504602', name: 'Michel Costa', campus: 'Morumbi', course: 'Design Digital', semester: 6 },
  { holderId: '23504602', name: 'Michel Costa', campus: 'Morumbi', course: 'Design Digital', semester: 6 },
  { holderId: '20709639', name: 'Michel Costa', campus: 'Morumbi', course: 'Design Digital', semester: 6 },
  { holderId: '20135403', name: 'Michel Costa', campus: 'Morumbi', course: 'Design Digital', semester: 6 },
  { holderId: '20135403', name: 'Michel Costa', campus: 'Morumbi', course: 'Design Digital', semester: 6 },
  { holderId: '20135403', name: 'Michel Costa', campus: 'Morumbi', course: 'Design Digital', semester: 6 },
];

export default class HoldersManage extends React.Component<{}, HoldersManageState> {
  private headers = ['Matrícula', 'Nome', 'Campus', 'Curso', 'Semestre'];

  componentWillMount() {
    this.setState({ data });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <TableCard data={this.state.data} headers={this.headers} key={'holderId'} />
      </div>
    );
  }
}
