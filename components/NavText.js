import { Text } from "react-native";
import { Link } from "expo-router";

export default function NavText({ text, screen, underline }) {
  return (
    <Link href={screen} replace>
      <Text style={underline && { textDecorationLine: "underline" }}>
        {text}
      </Text>
    </Link>
  );
}
