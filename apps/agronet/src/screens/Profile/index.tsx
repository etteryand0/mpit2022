import React from "react"
import {
  View,
  Text,
  StyleSheet,
} from "react-native"
import { ScreenProps } from "../../constants"

const Profile = ({ navigation }: ScreenProps<"Profile">) => {
  return (
    <View style={styles.container}>
      <Text>Hello profile</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {

  }
})