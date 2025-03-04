import { Text, View } from "react-native";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { router } from "expo-router";

import styles from "../../assets/styles/styles";
import { DefaultButton } from "../../components/Index";

export default function Profile() {
  console.log("Rendering Profile");
  const { userInfo, logout, isConnected } = useContext(AuthContext);

  if (isConnected) {
    return (
      <View style={[styles.containers.fullScreen]}>
        <DefaultButton text="Logout" onPress={logout}></DefaultButton>
      </View>
    );
  }
}
