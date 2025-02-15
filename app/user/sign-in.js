import { SafeAreaView, View, Text, Button, TextInput } from "react-native";
import { Link, router } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import DefaultButton from "../../components/DefaultButton";
import styles from "../../assets/styles/styles";

export default function SignIn() {
  const { email, setEmail } = useState("");
  const { username, setUsername } = useState("");

  return (
    <SafeAreaView
      style={[
        styles.containers.fullScreen,
        /* styles.debugging.redBorder */
        ,
      ]}
    >
      <KeyboardAwareScrollView
        style={[{ alignSelf: "stretch", borderWidth: 0 }]}
        contentContainerStyle={[
          styles.containers.fullScreen,

          {
            justifyContent: "space-between",
            padding: 30,
            gap: 20,
            borderWidth: 0,
          },
        ]}
      >
        <View style={[styles.containers.default, { gap: 20, borderWidth: 0 }]}>
          <FontAwesome5
            name="airbnb"
            size={120}
            color={styles.colors.mainRed}
          />
          <Text style={[styles.text.title, { color: styles.colors.darkGrey }]}>
            Sign in
          </Text>
        </View>

        <View style={[styles.containers.default, { gap: 20, borderWidth: 0 }]}>
          <TextInput
            style={styles.inputs.default}
            placeHolder="email"
            placeholderTextColor="red"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.inputs.default}
            placeHolder="username"
            placeholderTextColor="red"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={[styles.containers.default, { gap: 20, borderWidth: 0 }]}>
          <DefaultButton text="Sign in"></DefaultButton>
          <Text>
            No account? <Link href="/user/sign-up">Register</Link>
          </Text>
          <Button
            title="Home"
            onPress={() => {
              router.navigate("/");
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
