import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native"
import { useMutation, useQuery } from "urql"
import { ScreenProps } from "../../constants"
import { createUniqueDonation, findUniqueProduct } from "./api"
import Modal from "./Modal"
import Title from "./Title"

const Product = ({ navigation, route: { params: { productId } } }: ScreenProps<"Product">) => {
  const [result, reexecuteQuery] = useQuery({ query: findUniqueProduct, variables: { id: productId } })
  const [_, createDonation] = useMutation(createUniqueDonation)
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [amount, setAmount] = useState(500)

  useEffect(() => {
    StatusBar.setBackgroundColor("#E8F6CE")
    return () => StatusBar.setBackgroundColor("#B1CC84")
  }, [])

  if (result.fetching) return (
    <View style={[styles.container, styles.fetching]}>
      <ActivityIndicator size="large" />
    </View>
  )

  if (result.error) return (
    <View style={[styles.container, styles.fetching]}>
      <Text>Ошибка сервера или сети</Text>
    </View>
  )

  const {
    title,
    description,
    composition,
    owner,
    image,
  } = result.data.findUniqueProduct

  const closeModal = () => {
    setModalIsVisible(false)
    createDonation({ amount, crowdfundingId: owner.crowdfunding?.id })
      .then((o) => o.data ? reexecuteQuery({requestPolicy: "network-only"}) : console.log(o))
  }

  return (
    <View style={styles.container}>
      <Modal amount={amount} setAmount={setAmount} isVisible={modalIsVisible} closeModal={closeModal} />
      <ScrollView style={{ paddingHorizontal: 30 }} showsVerticalScrollIndicator={false}>
        <Image style={styles.image} source={{ uri: `https://sergin.space/static/${image}` }} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{owner.name}</Text>
        <Title title="Описание продукта" />
        <Text style={styles.description}>{description}</Text>
        <Title title="Состав" />
        <Text style={styles.description}>{composition}</Text>

        {owner.crowdfunding
          ? <>
            <Title title="Цель:" />
            <View style={styles.progressbarContainer}>
              <View style={{ ...styles.progressbar, width: `${100 * owner.crowdfunding.earned / owner.crowdfunding.goal}%` }} />
              <Text style={{ color: "white"}}>{owner.crowdfunding.earned} рб</Text>
              <Text style={{ color: "#8BB970"}}>{owner.crowdfunding.goal} рб</Text>
            </View>
          </>
          : null
        }
      </ScrollView>
      {owner.crowdfunding
        ? (
          <Pressable 
            onPress={() => setModalIsVisible(true)}
            style={({pressed}) => ({ opacity: pressed ? 0.6 : 1, ...styles.footer})}>
            <Text style={styles.footerText}>Поддержать</Text>
          </Pressable>
        )
        : null
      }
    </View>
  )
}

export default Product

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E8F6CE",
    height: "100%",
  },
  fetching: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get('screen').width - 60,
    height: 150,
    backgroundColor: "#a4a4a4",
    borderRadius: 15,
    resizeMode: "cover",
  },
  title: {
    marginVertical: 10,
    fontSize: 22,
    fontWeight: "600",
    color: "#5A7729",
  },
  description: {
    fontSize: 16,
    color: "#5A7729",
    fontWeight: "600",
    marginBottom: 5,
  },
  progressbarContainer: {
    width: "100%",
    height: 30,
    borderRadius: 100,
    backgroundColor: "#D3E5B4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  progressbar: {
    backgroundColor: "#8BB970",
    height: 30,
    position: 'absolute',
    minWidth: (Dimensions.get('screen').width - 60) * 0.13,
    maxWidth: Dimensions.get('screen').width - 60,
    borderRadius: 100,
  },
  footer: {
    backgroundColor: "#B1CC84",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#5A7729",
    fontSize: 22,
    fontWeight: "bold",
  }
})