import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from "react-native"
import { RootStackParamList } from "../../constants"

export type ProductCardProps = {
  title: string,
  description: string,
  image: string,
  id: string,
  navigation: NativeStackNavigationProp<RootStackParamList, "Catalog", undefined>,
}

export const widthCard = (Dimensions.get("screen").width - 60 - 10)/ 2

const ProductCard = ({ title, description, image, id, navigation }: ProductCardProps) => {
  return (
    <Pressable style={styles.container} onPress={() => navigation.navigate('Product', { productId: id })}>
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image}
          source={{ uri: `http://sergin.space/static/${image}`}} />
      </View>
      <View>
        <Text numberOfLines={2} style={styles.title}>{title}</Text>
        <Text numberOfLines={3} style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFFFD3",
    paddingHorizontal: 13,
    paddingVertical: 18,
    borderRadius: 20,
    minHeight: 60,
    width: widthCard,
  },
  imageContainer: {
    height: 120,
    width: "100%",
    backgroundColor: "#a4a4a4",
    borderRadius: 15,
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover",
    width: widthCard - 26,
    height: 120,
  },
  title: {
    fontWeight: "600",
    color: "#8BB970",
  },
  description: {
    color: "#5A7729BA",
    fontSize: 12,
  },
})