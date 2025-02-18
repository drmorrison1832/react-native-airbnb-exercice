import { SafeAreaView, View, Text, Button } from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  Logo,
  ScreenTitle,
  ShortTextInput,
  LongTextInput,
  NavText,
} from "../../components/Index";

import DefaultButton from "../../components/DefaultButton";

import styles from "../../assets/styles/styles";

export default function SignUp() {
  const { email, setEmail } = useState("");
  const { username, setUsername } = useState("");
  const { description, setDescription } = useState("");
  const { password, setPassword } = useState("");
  const { confirmPassword, setConfirmPassword } = useState("");
  const { showPassword, setShowPassword } = useState();

  return (
    <SafeAreaView style={[styles.containers.fullScreen, { borderWidth: 0 }]}>
      <KeyboardAwareScrollView
        style={[{ alignSelf: "stretch", borderWidth: 0 }]}
        contentContainerStyle={[
          {
            justifyContent: "space-between",
            padding: 30,
            gap: 20,
            borderWidth: 0,
          },
        ]}
      >
        <View style={[styles.containers.default, { gap: 20 }]}>
          <Logo />
          <ScreenTitle title="Sign up" />
        </View>
        <ShortTextInput placeholder="email" state={email} setState={setEmail} />
        <ShortTextInput
          placeholder="username"
          state={username}
          setState={setUsername}
        />

        <LongTextInput
          placeholder="Describe yourself in a frew words..."
          value={description}
          onChangeText={setDescription}
        />

        <View style={[styles.containers.default, { gap: 20 }]}>
          <ShortTextInput
            placeholder="password"
            state={password}
            setState={setPassword}
            secureTextEntry
          />

          <ShortTextInput
            placeholder="confirm password"
            state={confirmPassword}
            setState={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <View style={[styles.containers.default, { gap: 20 }]}>
          <DefaultButton text="Sign up" />

          <NavText screen="/index" text="Already have an account? Sign in" />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
