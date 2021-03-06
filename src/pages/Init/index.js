import ReactNavigation, { createStackNavigator } from 'react-navigation';

import LoginScreen from './Login/Login';
import CadastroScreen from './Cadastro/Cadastro';

export default AppStackNatigation = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  Cadastro: {
    screen: CadastroScreen,
    navigationOptions: {
      title: 'Cadastro',
    },
  },
}, {
  transitionConfig: () => ReactNavigation.StackViewTransitionConfigs.SlideFromRightIOS
  ,
});
