import * as React from 'react'
import { AppRegistry, StatusBar, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { RootStackParamList } from './constants'
import { createClient, Provider } from 'urql';

import Catalog from './screens/Catalog'
import Profile from './screens/Profile'
import Product from './screens/Product'
import { Header } from './components/Header'

const Stack = createNativeStackNavigator<RootStackParamList>()

const client = createClient({
  url: 'https://sergin.space/graphql',
});

const screenOptions: NativeStackNavigationOptions = {
  header: Header,
  animation: "simple_push"
}

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#B1CC84"  />
      <Provider value={client}>
        <Stack.Navigator initialRouteName="Catalog">
          <Stack.Group screenOptions={screenOptions}>
            <Stack.Screen name="Catalog" component={Catalog} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Product" component={Product} />
          </Stack.Group>
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

AppRegistry.registerComponent('main', () => App);
