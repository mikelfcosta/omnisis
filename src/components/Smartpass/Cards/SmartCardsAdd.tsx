import * as React from 'react';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import Button from 'reactstrap/lib/Button';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import Input from 'reactstrap/lib/Input';

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
