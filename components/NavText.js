import { Text } from "react-native";
import { Link } from "expo-router";

export default function NavText({ text, screen }) {
  return (
    <Link href={screen} push>
      <Text>{text}</Text>
    </Link>
  );
}
