import { SafeAreaView, View, Text, Button, TextInput } from "react-native";
import { Link, router } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import DefaultButton from "../../components/DefaultButton";
import styles from "../../assets/styles/styles";

export default function SignUp() {
  const { email, setEmail } = useState("");
  const { username, setUsername } = useState("");
  const { description, setDescription } = useState("");
  const { password, setPassword } = useState("");
  const { password2, setPassword2 } = useState("");

  return (
    <SafeAreaView style={[styles.containers.fullScreen, { borderWidth: 0 }]}>
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
        <View style={[styles.containers.default, { gap: 20 }]}>
          <FontAwesome5
            name="airbnb"
            size={120}
            color={styles.colors.mainRed}
          />
          <Text style={[styles.text.title, { color: styles.colors.darkGrey }]}>
            Sign up
          </Text>
        </View>
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
        <TextInput
          style={[styles.inputs.multiline, { height: 100 }]}
          placeHolder="Describe yourself in a frew words..."
          placeholderTextColor="red"
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <View style={[styles.containers.default, { gap: 20 }]}>
          <TextInput
            style={styles.inputs.default}
            placeHolder="password"
            placeholderTextColor="red"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.inputs.default}
            placeHolder="password2"
            placeholderTextColor="red"
            secureTextEntry
            value={password2}
            onChangeText={setPassword2}
          />
        </View>

        <View style={[styles.containers.default, { gap: 20 }]}>
          <DefaultButton text="Sign up"></DefaultButton>
          <Text>
            Already have an account? <Link href="/user/sign-in">Sign in</Link>
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
