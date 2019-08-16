import { createDrawerNavigator } from 'react-navigation';

import HomeScreen from './Home';
import PerfilScreen from './Perfil';
import ConfiguracaoScreen from './Configuracao';

export default AppDrawerNatigation = createDrawerNavigator({
    Perfil: {
        screen: PerfilScreen,
        navigationOptions: {
            header: 'Perfil'
        }
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: 'Home'
        }
    },
    Configuracao: {
        screen: ConfiguracaoScreen,
        navigationOptions: {
            header: 'Configuração'
        }
    },
});