import * as React from 'react';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import Button from 'reactstrap/lib/Button';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import Input from 'reactstrap/lib/Input';
import { ChangeEvent } from 'react';

interface HoldersProfileAddProps {
  toggle: () => any;
}

interface HoldersProfileAddState {
  name: string;
  locations: string[];
}

export default class HoldersProfileAdd extends React.Component<HoldersProfileAddProps, HoldersProfileAddState> {

  constructor(props: HoldersProfileAddProps) {
    super(props);
    this.state = {
      name: '',
      locations: [],
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <ModalHeader>Adicionar Máquina</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Nome do Perfil</Label>
            <Input type="text" name="name" id="name" value={this.state.name}
                   onChange={e => this.setState({ name: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="locations">Selecione os Locais</Label>
            <Input type="select" name="locations" id="locations" multiple value={this.state.locations}
                   onChange={this.handleSelectChange.bind(this)}>
              {this.renderSelection()}
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

  handleSelectChange(e: ChangeEvent<any>) {
    const options = e.target.options;
    const values = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    this.setState({ locations: values });
  }

  renderSelection() {
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
