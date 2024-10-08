import React from 'react';
import { createRoot } from 'react-dom/client'; // Use createRoot in React 18
import axe from 'react-axe';
import App from './app';

window.onload = () => {
  axe(React, ReactDOM, 1000);

  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(<App />);
};
