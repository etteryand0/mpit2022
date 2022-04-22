import React from "react"
import {
  View,
  Text,
  StyleSheet,
} from "react-native"
import { ScreenProps } from "../../constants"

const Product = ({ navigation, route: { params: { productId } } }: ScreenProps<"Product">) => {
  return (
    <View style={styles.container}>
      <Text>Hello product</Text>
    </View>
  )
}

export default Product

const styles = StyleSheet.create({
  container: {

  }
})