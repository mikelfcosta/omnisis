import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import App from './components/core/App/App';
import 'bootstrap/dist/css/bootstrap.css';
import './sass/base.scss';
import { Route, Switch } from 'react-router';
import Login from './components/Login/Login';

const rootEl = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
    <AppContainer>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/"><App /></Route>
      </Switch>
    </AppContainer>
  </BrowserRouter>,
  rootEl,
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/core/App/App', () => {
    const NextApp = require<{ default: typeof App }>('./components/core/App/App').default;
    ReactDOM.render(
      <AppContainer>
        <BrowserRouter>
          <NextApp />
        </BrowserRouter>
      </AppContainer>,
      rootEl,
    );
  });
}
