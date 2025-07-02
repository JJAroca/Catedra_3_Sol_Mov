import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from '../shared/theme'; 


import HomeScreen from '../features/home/screens/HomeScreen';
import LoginScreen from '../features/auth/login/screens/LoginScreen';
import RegisterScreen from '../features/auth/register/screens/RegisterScreen';
import MenuScreen from '../features/menu/screens/MenuScreen';
import DishDetailScreen from '../features/menu/screens/DishDetailScreen';
import ContactScreen from '../features/menu/screens/ContactScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Menu: undefined;
  DishDetail: { dishId: string; dish: any };
  Contact: undefined;
  Map: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.onPrimary,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Restaurante' }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ title: 'Iniciar Sesión' }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{ title: 'Registro' }}
          />
          <Stack.Screen 
            name="Menu" 
            component={MenuScreen}
            options={{ title: 'Menú' }}
          />
          <Stack.Screen 
            name="DishDetail" 
            component={DishDetailScreen}
            options={{ title: 'Detalle del Plato' }}
          />
          <Stack.Screen 
            name="Contact" 
            component={ContactScreen}
            options={{ title: 'Contacto' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default AppStack;