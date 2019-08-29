import { createDrawerNavigator } from 'react-navigation';

import FeedScreen from './Feed/Feed';
import NotificacoesScreen from './Notificacoes/Notificacoes';
import PessoasScreen from './Pessoas/Pessoas';

export default AppContainerNatigation = createDrawerNavigator(
  {
    Feed: {
      screen: FeedScreen,
      navigationOptions: {
        header: 'Feed',
        title: 'Feed',
      },
    },
    Notificacoes: {
      screen: NotificacoesScreen,
      navigationOptions: {
        header: 'Notificacoes',
        title: 'Notificações',
      },
    },
    Pessoas: {
      screen: PessoasScreen,
      navigationOptions: {
        header: 'Pessoas',
        title: 'Pessoas',
      },
    },
  },
  {
    defaultNavigationOptions: {},
  }
);
