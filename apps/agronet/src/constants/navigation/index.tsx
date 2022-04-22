import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Profile: undefined,
  Product: { productId: string },
  Catalog: undefined,
};

export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>