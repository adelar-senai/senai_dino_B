import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import Dino from "@/components/dino";
import Obstacle from "@/components/obstacle";
import Ground from "@/components/ground";
import StartScreen from "@/components/startScreen";

import useDino from "@/hooks/useDino";
import useObstacles from "@/hooks/useObstacles";

export default function HomeScreen() {
  const [gameStarted, setGameStarted] = useState(false);

  const { dinoBottom, jump } = useDino();
  const { obstacles } = useObstacles(gameStarted);

  const play = () => {
    setGameStarted(true);
  };

  if (!gameStarted) {
    return <StartScreen onPlay={play} />;
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.gameContainer} onPress={jump}>
        <Ground />

        {obstacles.map((obstacle) => (
          <Obstacle key={obstacle.id} x={obstacle.x} count={obstacle.count} />
        ))}

        <Dino bottom={dinoBottom} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  gameContainer: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    overflow: "hidden",
  },
});
