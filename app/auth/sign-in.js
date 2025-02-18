import { SafeAreaView, View, Text, Button, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Logo, ScreenTitle, DefaultTextInput } from "../../components/Index";

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
        </View>

        <View style={[styles.containers.default, { gap: 20, borderWidth: 0 }]}>
          <DefaultButton text="Sign in"></DefaultButton>

          <Link href={"/auth/sign-up"}>
            <Text>No account? Sign up</Text>
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
