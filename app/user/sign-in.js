import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import globalStyle from "../../assets/styles/globalStyle";
const styles = StyleSheet.create(globalStyle);

export default function SignIn() {
  return (
    <SafeAreaView>
      <Text style={styles.text.title}>SingIn</Text>
    </SafeAreaView>
  );
}
