import * as React from 'react';
import {
  FormGroup,
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Label,
  Input,
} from 'reactstrap';
import { HoldersManageData } from '../HoldersManage';

interface HoldersDetailProps {
  toggle: () => any;
  data?: HoldersManageData;
}

interface HoldersDetailState {
  holderId: string;
  holderName: string;
  holderGroup: string;
  holderProfiles: string[];
  holderCourse: string;
  holderCampus: string;
  holderSemester: string;
}

export default class HoldersDetail extends React.Component<HoldersDetailProps, HoldersDetailState> {

  constructor(props: HoldersDetailProps) {
    super(props);

    if (props.data) {
      this.state = {
        holderId: props.data._id,
        holderName: props.data.name,
        holderGroup: props.data.group,
        holderProfiles: [],
        holderCourse: '',
        holderCampus: '',
        holderSemester: '',
      };
    } else {
      this.state = {
        holderId: '',
        holderName: '',
        holderGroup: '',
        holderProfiles: [],
        holderCourse: '',
        holderCampus: '',
        holderSemester: '',
      };
    }
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <ModalHeader>Adicionar Aluno</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="holderId">Matrícula</Label>
            <Input type="text" name="holderId" id="holderId" value={this.state.holderId}
                   onChange={e => this.setState({ holderId: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="holderName">Nome Completo</Label>
            <Input type="text" name="holderName" id="holderName" value={this.state.holderName}
                   onChange={e => this.setState({ holderName: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="holderGroup">Grupo</Label>
            <Input type="select" name="holderGroup" id="holderGroup" value={this.state.holderGroup}
                   onChange={e => this.setState({ holderGroup: e.target.value })}>
              {this.renderGroups()}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="holderCampus">Campus</Label>
            <Input type="select" name="holderCampus" id="holderCampus" value={this.state.holderCampus}
                   onChange={e => this.setState({ holderCampus: e.target.value })}>
              {this.renderCampus()}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="holderProfiles">Perfis</Label>
            <Input type="select" name="holderProfiles" id="holderProfiles" multiple value={this.state.holderProfiles}
                   onChange={this.handleProfileChange.bind(this)}>
              {this.renderProfiles()}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="holderCourse">Curso</Label>
            <Input type="text" name="holderCourse" id="holderCourse" value={this.state.holderCourse}
                   onChange={e => this.setState({ holderCourse: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="holderSemester">Semestre</Label>
            <Input type="select" name="holderSemester" id="holderSemester" value={this.state.holderSemester}
                   onChange={e => this.setState({ holderSemester: e.target.value })}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={ this.props.toggle }>Cancelar</Button>{ ' ' }
          <Button color="primary" onClick={ this.submitForm.bind(this) }
                  disabled={false}>{ this.props.data ? 'Salvar' : 'Adicionar' }</Button>
        </ModalFooter>
      </div>
    );
  }

  renderCampus() {
    const data = [
      { campus: 'Morumbi' },
      { campus: 'Vila Olimpia' },
      { campus: 'Paulista II' },
      { campus: 'Mooca' },
    ];

    return data.map((item) => {
      return (<option key={item.campus} value={item.campus}>{ item.campus }</option>);
    });
  }

  renderGroups() {
    const data = [
      { _id: '001', name: 'Alunos' },
      { _id: '002', name: 'Professores' },
      { _id: '003', name: 'Funcionários' },
    ];
    return data.map((group) => {
      return (<option key={group._id} value={group._id}>{ group.name }</option>);
    });
  }

  renderProfiles() {
    const data = [
      { _id: '001', name: 'Acesso Básico' },
      { _id: '002', name: 'Studio' },
      { _id: '003', name: 'Academia' },
    ];

    return data.map((profile) => {
      return (
        <option key={profile._id} value={profile._id}>{ profile.name }</option>
      );
    });
  }

  handleProfileChange(e: any) {
    const options = e.target.options;
    const values = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    this.setState({ holderProfiles: values });
  }

  submitForm() {
    console.log(this.state);
  }
}
