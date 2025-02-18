import { SafeAreaView, View, Text, Button, TextInput } from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Logo, ScreenTitle, DefaultTextInput } from "../../components/Index";

import Entypo from "@expo/vector-icons/Entypo";

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
        <DefaultTextInput
          placeholder="email"
          state={email}
          setState={setEmail}
        />
        <DefaultTextInput
          placeholder="username"
          state={username}
          setState={setUsername}
        />
        <TextInput
          style={[styles.inputs.multiline, { height: 100 }]}
          placeholder="Describe yourself in a frew words..."
          multiline
          maxLength={250}
          value={description}
          onChangeText={setDescription}
        />

        <View style={[styles.containers.default, { gap: 20 }]}>
          <DefaultTextInput
            placeholder="password"
            state={password}
            setState={setPassword}
            secureTextEntry
          />

          <Entypo name="eye" size={24} color="black" />
          <Entypo name="eye-with-line" size={24} color="black" />
          <DefaultTextInput
            placeholder="confirm password"
            state={confirmPassword}
            setState={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <View style={[styles.containers.default, { gap: 20 }]}>
          <DefaultButton text="Sign up" />

          <Link href={"/auth/sign-in"}>
            <Text> Already have an account? Sign in</Text>
          </Link>

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
