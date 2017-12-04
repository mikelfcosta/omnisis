import * as React from 'react';
import TableCard, { TableCardState } from '../../core/Content/TableCard';
import FabButton from '../../core/Elements/FabButton';
import { ADD } from '../../../icons';
import { Modal } from 'reactstrap';
import HoldersDetail from './HolderDetail/HoldersDetail';
import axios from 'axios';
import { MODULES } from '../../../constants';

interface HoldersManageData {
  holderId: string;
  name: string;
  campus: string;
  course: string;
  semester: number;
}

interface HoldersManageState {
  data: HoldersManageData[];
  modal: boolean;
}

const data: HoldersManageData[] = [
  { holderId: '20709639', name: 'Michel Costa', campus: 'Morumbi', course: 'Design Digital', semester: 6 },
  { holderId: '23504602', name: 'Michel Costa', campus: 'Morumbi', course: 'Design Digital', semester: 6 },
  { holderId: '20135403', name: 'Michel Costa', campus: 'Morumbi', course: 'Design Digital', semester: 6 },
  { holderId: '25334523', name: 'Michel Costa', campus: 'Morumbi', course: 'Design Digital', semester: 6 },
  { holderId: '23745354', name: 'Michel Costa', campus: 'Morumbi', course: 'Design Digital', semester: 6 },
  { holderId: '23453545', name: 'Michel Costa', campus: 'Morumbi', course: 'Design Digital', semester: 6 },
  { holderId: '21354145', name: 'Michel Costa', campus: 'Morumbi', course: 'Design Digital', semester: 6 },
  { holderId: '24531235', name: 'Michel Costa', campus: 'Morumbi', course: 'Design Digital', semester: 6 },
  { holderId: '22120545', name: 'Michel Costa', campus: 'Morumbi', course: 'Design Digital', semester: 6 },
];

export default class HoldersManage extends React.Component<{}, HoldersManageState> {
  private headers = ['Matrícula', 'Nome', 'Campus', 'Curso', 'Semestre'];

  constructor(props: any) {
    super(props);

    this.state = {
      data,
      modal: false,
    };
  }

  componentWillMount() {
    axios.get(`${MODULES}/holders/manage/users`)
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

  componentWillUnmount() {
    console.log('Unmounting component');
  }

  render() {
    return (
      <div>
        <TableCard data={this.state.data} headers={this.headers}
                   rowKey={'holderId'} length={20} onPaginate={this.getData.bind(this)} />
        <FabButton icon={ADD} onClick={this.toggle.bind(this)} />
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <HoldersDetail toggle={this.toggle.bind(this)}/>
        </Modal>
      </div>
    );
  }

  getData(event: TableCardState) {
    console.log(event);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
}
