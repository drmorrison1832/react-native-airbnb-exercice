import { SafeAreaView, View } from "react-native";
import { Link } from "expo-router";

import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  Logo,
  ScreenTitle,
  ShortTextInput,
  NavText,
} from "../../components/Index";

import DefaultButton from "../../components/DefaultButton";
import styles from "../../assets/styles/styles";

export default function SignIn() {
  const { email, setEmail } = useState("");
  const { username, setUsername } = useState("");

  return (
    <SafeAreaView
      style={[
        styles.containers.fullScreen,
        // styles.debugging.redBorder,
      ]}
    >
      <KeyboardAwareScrollView
        style={[
          { alignSelf: "stretch", borderWidth: 0 },
          // styles.debugging.redBorder,
        ]}
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
          <Logo />
          <ScreenTitle title="Sign in" />
        </View>

        <View style={[styles.containers.default, { gap: 20, borderWidth: 0 }]}>
          <ShortTextInput
            placeholder="email"
            state={email}
            setState={setEmail}
          />
          <ShortTextInput
            placeholder="username"
            state={username}
            setState={setUsername}
          />
        </View>

        <View style={[styles.containers.default, { gap: 20, borderWidth: 0 }]}>
          <DefaultButton text="Sign in"></DefaultButton>

          <NavText screen="/sign-up" text="No account? Sign up" />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
