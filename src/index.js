import React from 'react';
import { YellowBox } from 'react-native';

// Ignora algumas mensagens de alerta
// Precisarão ser tratadas posteriormente
YellowBox.ignoreWarnings([
  'Warning: componentWillUpdate is deprecated', // Navigation da tela Home
  'Warning: componentWillReceiveProps is deprecated' // Modal da tela de Login
]);

import Routes from './routes';

export default function App() {
  return <Routes />;
}
