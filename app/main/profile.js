import { Text, View } from "react-native";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import styles from "../../assets/styles/styles";
import { DefaultButton } from "../../components/Index";

export default function Profile() {
  const { logout } = useContext(AuthContext);

  return (
    <View style={[styles.containers.fullScreen]}>
      <DefaultButton text="Logout" onPress={logout}></DefaultButton>
    </View>
  );
}
