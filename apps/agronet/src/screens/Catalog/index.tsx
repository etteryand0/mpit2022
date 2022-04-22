import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native"
import Svg, { Path } from "react-native-svg"
import { useQuery } from "urql"
import { ScreenProps } from "../../constants"
import { findManyProduct, foodCategoryId, materialsCategoryId } from "./api"
import Category from "./Category"
import ProductCard from "./ProductCard"

const Catalog = ({ navigation }: ScreenProps<"Catalog">) => {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<null | "products" | "materials">(null)
  const [result, reexecuteSearch] = useQuery({
    query: findManyProduct,
    variables: { search }
  })

  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          onEndEditing={() => reexecuteSearch()}
          placeholderTextColor="#8BB970"
          placeholder="Поиск"
          style={styles.searchInput}
        />
        <Svg onPress={() => reexecuteSearch()} width="20" height="20" viewBox="0 0 84 84" fill="#8BB970">
          <Path d="M83.2321 79.4916L57.7261 53.8295C62.48 48.1359 65.3452 40.8109 65.3452 32.8125C65.3452 14.6908 50.6544 0 32.5327 0C14.411 0 -0.279785 14.6908 -0.279785 32.8125C-0.279785 50.9342 14.411 65.625 32.5327 65.625C40.766 65.625 48.2866 62.5852 54.0485 57.5741L79.5189 83.2046C80.5439 84.2297 82.2069 84.2297 83.232 83.2046C84.2558 82.1795 84.2558 80.5179 83.232 79.4916H83.2321ZM32.5327 60.4183C17.2867 60.4183 4.9269 48.0585 4.9269 32.8125C4.9269 17.5665 17.2867 5.20669 32.5327 5.20669C47.7787 5.20669 60.1385 17.5665 60.1385 32.8125C60.1385 48.0585 47.7787 60.4183 32.5327 60.4183Z" />
        </Svg>
      </View>

      <Category setCategory={setCategory} category={category} />

      {result.error ? <Text>Ошибка сервера</Text> : null}
      {result.fetching ? <ActivityIndicator size='small' /> : null}
      <FlatList
        data={result.data?.findManyProduct}
        renderItem={({ item, index }) => {
          if (category === null)
            return <ProductCard {...item} navigation={navigation} />

          const mustId = category === "products" ? foodCategoryId : materialsCategoryId
          if (mustId === item.category[0].id)
            return <ProductCard {...item} navigation={navigation} />

          return null
        }}
        numColumns={2}
        keyExtractor={(item, index) => `${index}-${item.id}`}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </View>
  )
}

export default Catalog

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#B1CC84",
    paddingHorizontal: 30,
    minHeight: "100%",
  },
  searchbar: {
    width: "100%",
    borderRadius: 30,
    backgroundColor: "#D3E5B4",
    height: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    fontSize: 14,
    color: "#8BB970",
    flexGrow: 1,
  },
})