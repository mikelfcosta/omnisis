import * as React from 'react';
import { HoldersManageData } from './HoldersManage';
import { Button, ModalFooter, Input, Label, FormGroup, ModalBody, ModalHeader } from 'reactstrap';

interface HoldersManageAssignProps {
  toggle: () => any;
  data: HoldersManageData;
}

interface HoldersManageAssignState {
  holderId: string;
  cardId: string;
}

export default class HoldersManageAssign extends React.Component<HoldersManageAssignProps, HoldersManageAssignState> {

  constructor(props: HoldersManageAssignProps) {
    super(props);

    this.state = {
      holderId: props.data._id,
      cardId: '',
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <ModalHeader>Assignar Cartão</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="holderId">Matrícula</Label>
            <Input type="text" name="holderId" id="holderId" value={this.state.holderId}
                   onChange={e => this.setState({ holderId: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="holderName">Nome Completo</Label>
            <Input type="text" name="holderName" id="holderName" value={this.props.data.name} disabled/>
          </FormGroup>
          <FormGroup>
            <Label for="cardId">Cartão a Assignar</Label>
            <Input type="text" name="cardId" id="cardId" value={this.state.cardId}
                   onChange={e => this.setState({ cardId: e.target.value })} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={ this.props.toggle }>Cancelar</Button>{ ' ' }
          <Button color="primary" onClick={ this.submitForm.bind(this) }
                  disabled={false}>Assignar</Button>
        </ModalFooter>
      </div>
    );
  }

  submitForm() {
    console.log(this.state);
    this.props.toggle();
  }
}
