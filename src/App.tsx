import './init'

import React from 'react';
import { createRoot } from 'react-dom/client';

import { Routes } from './Routes';

const MOUNT_NODE = document.getElementById('root');

if (!MOUNT_NODE) {
  throw new Error('no container to render to');
}

const root = createRoot(MOUNT_NODE)

const render = () => {
  root.render(
    <Routes/>,
  )
}

render()
