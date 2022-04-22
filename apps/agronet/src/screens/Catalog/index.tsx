import React from "react"
import {
  View,
  Text,
  StyleSheet,
} from "react-native"
import { ScreenProps } from "../../constants"

const Catalog = ({ navigation }: ScreenProps<"Catalog">) => {
  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
    </View>
  )
}

export default Catalog

const styles = StyleSheet.create({
  container: {

  }
})