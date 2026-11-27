import { Image, StyleSheet, View } from "react-native";
import { GAME_CONFIG } from "../constants/gameConfig";

type Props = {
  x: number;
  count: number;
};

export default function Obstacle({ x, count }: Props) {
  return (
    <View
      style={[
        styles.obstacleGroup,
        {
          left: x,
        },
      ]}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Image
          key={index}
          source={require("@/assets/images/Dino.jpg")}
          style={styles.obstacleImage}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  obstacleGroup: {
    position: "absolute",
    bottom: GAME_CONFIG.groundBottom,
    flexDirection: "row",
  },

  obstacleImage: {
    width: GAME_CONFIG.obstacle.width,
    height: GAME_CONFIG.obstacle.height,
    resizeMode: "contain",
  },
});
