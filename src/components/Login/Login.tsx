import * as React from 'react';
const logo = require('../../img/logo.svg');
import { login, loginContainer, loginLogo, loginBody, loginButton } from './Login.scss';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Button from 'reactstrap/lib/Button';

interface LoginState {
  username: string;
  password: string;
}

export default class Login extends React.Component<{}, LoginState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={login}>
        <div className={loginContainer}>
          <div className={loginLogo}>
            <img src={logo} alt="Logo"/>
          </div>
          <div className={loginBody}>
            <FormGroup>
              <Input type="text" name="username" id="username" placeholder={'Usuário'}
                     onChange={e => this.setState({ username: e.target.value })} />
            </FormGroup>
            <FormGroup>
              <Input type="password" name="password" id="password" value={this.state.password} placeholder={'Senha'}
                     onChange={e => this.setState({ password: e.target.value })} />
            </FormGroup>
            <Button color="secondary" onClick={ this.doLogin.bind(this) } className={loginButton}>Login</Button>
          </div>
        </div>
      </div>
    );
  }

  doLogin() {
    window.history.pushState('', 'Dasboard', '/');
    window.location.reload();
  }
}
