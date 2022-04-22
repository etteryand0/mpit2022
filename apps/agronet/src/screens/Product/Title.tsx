import React from "react"
import {
  View,
  Text,
  StyleSheet,
} from "react-native"

const Title = ({ title }: { title: string }) => {
  return (
    <View style={styles.relative}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{flexGrow:1}} />
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8CB970",
    borderRadius: 50,
    justifyContent: "center",
    paddingHorizontal: 10,
    minHeight: 40,
    position: "absolute"
  },
  relative: {
    height: 40,
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EFFFD3",
  }
})