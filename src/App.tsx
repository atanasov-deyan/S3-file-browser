import './init.js';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { Routes } from './components/pages/Routes';
import store from './store';

const MOUNT_NODE = document.getElementById('root');

if (!MOUNT_NODE) {
  throw new Error('no container to render to');
}

const root = createRoot(MOUNT_NODE);

const render = () => {
  root.render(
    <Provider store={store}>
      <Routes/>
    </Provider>,
  );
};

render();
