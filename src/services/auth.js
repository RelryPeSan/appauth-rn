import { AsyncStorage } from 'react-native';

export const TOKEN_KEY = 'usuario._id';

// export const onSignIn = () => AsyncStorage.setItem(TOKEN_KEY, "true");

// export const onSignOut = () => AsyncStorage.removeItem(TOKEN_KEY);

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  return token !== null;
};
