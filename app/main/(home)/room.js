import { useLocalSearchParams } from "expo-router";
import { ShowRoom } from "../../../components/Index";

export default function Room() {
  const { roomID } = useLocalSearchParams();

  return <ShowRoom roomID={roomID} />;
}
