import { useRef, useState } from "react";
import { Animated } from "react-native";
import { GAME_CONFIG } from "../constants/gameConfig";

export default function useDino() {
  const dinoBottom = useRef(
    new Animated.Value(GAME_CONFIG.dino.initialBottom),
  ).current;

  const [isJumping, setIsJumping] = useState(false);

  const jump = () => {
    if (isJumping) return;

    setIsJumping(true);

    Animated.sequence([
      Animated.timing(dinoBottom, {
        toValue: GAME_CONFIG.dino.jumpHeight,
        duration: GAME_CONFIG.dino.jumpDuration,
        useNativeDriver: false,
      }),

      Animated.delay(70),

      Animated.timing(dinoBottom, {
        toValue: GAME_CONFIG.dino.initialBottom,
        duration: GAME_CONFIG.dino.fallDuration,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIsJumping(false);
    });
  };

  return {
    dinoBottom,
    isJumping,
    jump,
  };
}
