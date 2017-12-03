import * as React from 'react';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import Button from 'reactstrap/lib/Button';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import Input from 'reactstrap/lib/Input';

interface SmartLocationsEditProps {
  toggle: () => any;
}

interface SmartLocationsEditState {
  campus: string;
  other_campus: string;
  location: string;
}

export default class SmartLocationsEdit extends React.Component<SmartLocationsEditProps, SmartLocationsEditState> {

  constructor(props: SmartLocationsEditProps) {
    super(props);
    this.state = {
      campus: '',
      other_campus: '',
      location: '',
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <ModalHeader>Adicionar Local</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="campus">Campus</Label>
            <Input type="select" name="campus" id="campus"
                   onChange={e => this.setState({ campus: e.target.value })}>
              <option value={'Morumbi'}>Morumbi</option>
              <option value={'Vila Olímpia'}>Vila Olímpia</option>
              <option value={'Paulista II'}>Paulista II</option>
              <option value={'Mooca'}>Mooca</option>
              <option value={'other'}>Outro</option>
            </Input>
          </FormGroup>
          {this.renderOtherCampus()}
          <FormGroup>
            <Label for="location">Nome do Local</Label>
            <Input type="text" name="location" id="location"placeholder="Escolha um nome descritivo para o local"
                   onChange={e => this.setState({ location: e.target.value })} />
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

  renderOtherCampus() {
    if (this.state.campus === 'other') {
      return (
        <FormGroup>
          <Label for="other_campus">Nome do Campus</Label>
          <Input type="text" name="other_campus" id="other_campus" placeholder="Dê um nome ao novo Campus"
                 onChange={e => this.setState({ other_campus: e.target.value })} />
        </FormGroup>
      );
    }
  }
}
