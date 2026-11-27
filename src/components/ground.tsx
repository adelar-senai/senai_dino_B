import { StyleSheet, View } from "react-native";
import { GAME_CONFIG } from "../constants/gameConfig";

export default function Ground() {
  return <View style={styles.ground} />;
}

const styles = StyleSheet.create({
  ground: {
    position: "absolute",
    bottom: GAME_CONFIG.groundBottom,
    height: 2,
    width: "100%",
    backgroundColor: "#000",
  },
});
