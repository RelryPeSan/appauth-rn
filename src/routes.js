import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Init';
import Home from './pages/Main';

export default createAppContainer(
  createSwitchNavigator({
    Login,
    Home,
  })
);
