import { createDrawerNavigator } from 'react-navigation';

import HomeScreen from './Home';
import ChatScreen from './Chat';
import PerfilScreen from './Perfil';
import ConfiguracaoScreen from './Configuracao';


export default AppDrawerNatigation = createDrawerNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: 'Home',
        }
    },
    Chat: {
        screen: ChatScreen,
        navigationOptions: {
            header: 'Chat',
        }
    },
    Perfil: {
        screen: PerfilScreen,
        navigationOptions: {
            header: 'Perfil',
        }
    },
    Configuracao: {
        screen: ConfiguracaoScreen,
        navigationOptions: {
            header: 'Configuração',
        }
    },
});