import React from 'react';
import { createRoot } from 'react-dom/client';

const MOUNT_NODE = document.getElementById('root');

if (!MOUNT_NODE) {
  throw new Error("no container to render to");
}

const root = createRoot(MOUNT_NODE)

const render = () => {
  root.render(
    <>S3 bucket browser</>
  )
}


render()
