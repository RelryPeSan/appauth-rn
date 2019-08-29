import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './Home/index';
import ChatScreen from './Chat/Chat';
import PerfilScreen from './Perfil/Perfil';
import ConfiguracaoScreen from './Configuracao/Configuracao';

const sizeIcons = 24;

export default createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: () => <Icon name="home" size={sizeIcons}/>,
    },
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: {
      tabBarLabel: 'Chat',
      tabBarIcon: () => <Icon name="chat" size={sizeIcons}/>,
    },
  },
  Perfil: {
    screen: PerfilScreen,
    navigationOptions: {
      tabBarLabel: 'Perfil',
      tabBarIcon: () => <Icon name="person" size={sizeIcons}/>,
    },
  },
  Configuracao: {
    screen: ConfiguracaoScreen,
    navigationOptions: {
      tabBarLabel: 'Configuração',
      tabBarIcon: ({focused, tintColor}) => <Icon name="settings" size={sizeIcons}/>,
    },
  },
}, {
  
});
