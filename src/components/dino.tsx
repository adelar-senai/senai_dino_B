import { Animated, Image, StyleSheet } from "react-native";
import { GAME_CONFIG } from "../constants/gameConfig";

type Props = {
  bottom: Animated.Value;
};

export default function Dino({ bottom }: Props) {
  return (
    <Animated.View
      style={[
        styles.dino,
        {
          bottom,
        },
      ]}
    >
      <Image
        source={require("@/assets/images/dino.png")}
        style={styles.dinoImage}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dino: {
    position: "absolute",
    left: GAME_CONFIG.dino.left,
    width: GAME_CONFIG.dino.width,
    height: GAME_CONFIG.dino.height,
  },

  dinoImage: {
    width: GAME_CONFIG.dino.width,
    height: GAME_CONFIG.dino.height,
    resizeMode: "contain",
  },
});
