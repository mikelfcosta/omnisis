import * as React from 'react';
import {
  FormGroup,
  Form,
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Label,
  Input,
  FormFeedback,
  FormText,
} from 'reactstrap';

interface HoldersGroupsEditProps {
  toggle: () => any;
}

interface HoldersGroupsEditState {
  groupNameValue: string;
  groupNameValidation: boolean;
  groupNameError: string;
}

export default class HoldersGroupsEdit extends React.Component<HoldersGroupsEditProps, HoldersGroupsEditState> {

  constructor(props: HoldersGroupsEditProps) {
    super(props);
    this.state = {
      groupNameValue: '',
      groupNameValidation: true,
      groupNameError: '',
    };
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <ModalHeader>Adicionar Grupo</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Nome do Grupo</Label>
              <Input type="text" valid={this.state.groupNameValidation}
                     value={this.state.groupNameValue}
                     onChange={e => this.setState({ groupNameValue: e.target.value })}
                     name="GroupName" placeholder="Escolha um nome para o grupo"/>
              <FormFeedback>{this.renderErrorMessage()}</FormFeedback>
              <FormText>Escolha um nome único para o Grupo</FormText>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={ this.props.toggle }>Cancelar</Button>{ ' ' }
          <Button color="primary" onClick={ this.submitForm.bind(this) }
                  disabled={!this.state.groupNameValue}>Adicionar</Button>
        </ModalFooter>
      </div>
    );
  }

  submitForm() {
    if (!this.state.groupNameValue) {
      return this.setState({ groupNameValidation: false, groupNameError: 'empty' });
    }
    else if (!this.state.groupNameValidation) this.setState({ groupNameValidation: true });
    console.log(this.state.groupNameValue);
    this.props.toggle();
  }

  renderErrorMessage(): string {
    switch (this.state.groupNameError) {
      case 'empty':
        return 'Por favor insira um nome para o Grupo';
      case 'duplicate':
        return 'Ja existe um Grupo com este nome';
      default:
        return '';
    }
  }
}
