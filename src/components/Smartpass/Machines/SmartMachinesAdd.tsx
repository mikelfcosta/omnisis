import * as React from 'react';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import Button from 'reactstrap/lib/Button';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import Input from 'reactstrap/lib/Input';

interface SmartMachinesAddProps {
  toggle: () => any;
}

interface SmartMachinesAddState {
  machineId: string;
  machineLocation: string;
}

export default class SmartMachinesAdd extends React.Component<SmartMachinesAddProps, SmartMachinesAddState> {

  constructor(props: SmartMachinesAddProps) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <ModalHeader>Adicionar Máquina</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="machineId">ID da Máquina</Label>
            <Input type="text" name="machineId" id="machineId" placeholder="Insira o ID do Máquina"
                   onChange={e => this.setState({ machineId: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="machineLocation">Local</Label>
            <Input type="select" name="machineLocation" id="machineLocation"
                   onChange={e => this.setState({ machineLocation: e.target.value })}>
              {this.renderLocations()}
            </Input>
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

  renderLocations() {
    const data = [
      {
        campus: 'Morumbi',
        locations: [
          { _id: '001', name: 'A' },
          { _id: '002', name: 'B' },
          { _id: '003', name: 'C' },
        ],
      },
      {
        campus: 'Vila Olímpia',
        locations: [
          { _id: '004', name: 'D' },
          { _id: '005', name: 'E' },
          { _id: '006', name: 'F' },
        ],
      },
    ];
    return data.map((campus) => {
      return (
        <optgroup label={campus.campus} key={campus.campus}>
          {campus.locations.map((location) => {
            return <option key={location._id} value={location._id}>{ location.name }</option>
          })}
        </optgroup>
      );
    });
  }

  submitForm() {
    console.log(this.state);
  }
}
