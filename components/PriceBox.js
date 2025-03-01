import { View, Text } from "react-native";

import styles from "../assets/styles/styles";

export default function PriceBox({ price }) {
  return (
    <View style={styles.containers.priceContainer}>
      <Text style={styles.text.priceBoxText}>{price} €</Text>
    </View>
  );
}
