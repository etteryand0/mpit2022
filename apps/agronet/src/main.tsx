import * as React from 'react'
import { AppRegistry } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { RootStackParamList } from './constants'

import Catalog from './screens/Catalog'
import Profile from './screens/Profile'
import Product from './screens/Product'

const Stack = createNativeStackNavigator<RootStackParamList>()

const screenOptions: NativeStackNavigationOptions = {

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
