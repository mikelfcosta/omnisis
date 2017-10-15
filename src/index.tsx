import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/core/App/App';
import './sass/base.scss';

const rootEl = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl,
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/core/App/App', () => {
    const NextApp = require<{ default: typeof App }>('./components/core/App/App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>
      ,
      rootEl,
    );
  });
}
