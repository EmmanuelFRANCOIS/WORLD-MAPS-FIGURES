import React from 'react';
import ReactDOM from 'react-dom/client';

import "./helpers/i18next";

import App from './App';

import "./styles/index.scss";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
