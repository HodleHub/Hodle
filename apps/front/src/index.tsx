import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@radix-ui/themes/styles.css';
import { Theme, ThemePanel } from '@radix-ui/themes';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <Theme accentColor="violet" grayColor="mauve" appearance='dark' panelBackground='translucent'>
        <App />
      </Theme>
    </React.StrictMode>,
  );
}
