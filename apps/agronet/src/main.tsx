import * as React from 'react'
import { AppRegistry, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { RootStackParamList } from './constants'

import Catalog from './screens/Catalog'
import Profile from './screens/Profile'
import Product from './screens/Product'
import { Header } from './components/Header'

const Stack = createNativeStackNavigator<RootStackParamList>()

const screenOptions: NativeStackNavigationOptions = {
  // headerTransparent: true,
  // headerStyle: { backgroundColor: "#B1CC84" },
  // headerShadowVisible: false,
  // headerLeft: ({ canGoBack }) => <Text>blahblah</Text>,
  // headerRight: () => <Text>Agronet</Text>,
  // title: null,
  header: Header,
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Catalog">
        <Stack.Group screenOptions={screenOptions}>
          <Stack.Screen name="Catalog" component={Catalog} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Product" component={Product} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

AppRegistry.registerComponent('main', () => App);
