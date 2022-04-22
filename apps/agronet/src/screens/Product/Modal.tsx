import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet
} from "react-native"
import Svg, { Path } from "react-native-svg";

type Props = {
  isVisible: boolean
  closeModal: () => void,
  amount: number,
  setAmount: (a: any) => void,
}

export default ({ isVisible, closeModal, amount, setAmount }: Props) => {
  return (
    <Modal
      onRequestClose={closeModal}
      transparent
      visible={isVisible}>
      <View style={styles.modal}>
        <View style={styles.container}>
          <Svg onPress={closeModal} width="20" height="20" viewBox="0 0 59 55" fill="none" style={{ position: "absolute", right: 25, top: 20 }}>
            <Path d="M58.41 8.13338L37.524 27.3176L58.41 46.5019L50.091 54.1431L29.205 35.013L8.378 54.1431L0 46.4477L20.827 27.3176L0 8.18757L8.378 0.492188L29.205 19.6223L50.091 0.492188L58.41 8.13338Z" fill="#789443"/>
          </Svg>
          <Text style={styles.titleSum}>Введите сумму:</Text>
          <TextInput 
            value={amount.toString()}
            onChangeText={t => t ? setAmount(parseInt(t)) : setAmount(0)}
            keyboardType="number-pad"
            style={{ fontSize: 22, color: "#789443"}}
            underlineColorAndroid="#789443"
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 30,
    justifyContent: "center",
    minWidth: "70%",
    maxWidth: "90%",
    minHeight: "30%",
    alignItems: "center"
  },
  titleSum: {
    color: "#789443",
    fontWeight: "bold",
    fontSize: 22,
    textDecorationLine: "underline",
    textDecorationColor: "#789443"
  },
})