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

interface SmartCardsAddProps {
  toggle: () => any;
}

interface SmartCardsAddState {
  cardId: string;
}

export default class SmartCardsAdd extends React.Component<SmartCardsAddProps, SmartCardsAddState> {

  constructor(props: SmartCardsAddProps) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <ModalHeader>Adicionar Cartão</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="cardId">ID do Cartão</Label>
            <Input type="text" name="cardId" id="cardId" placeholder="Insira o ID do cartão informado pela maquina"
                   onChange={e => this.setState({ cardId: e.target.value })} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={ this.props.toggle }>Cancelar</Button>{ ' ' }
          <Button color="primary" onClick={ this.submitForm.bind(this) }
                  disabled={false}>Adicionar</Button>
        </ModalFooter>
      </div>
    );
  }

  submitForm() {
    console.log(this.state);
  }
}
