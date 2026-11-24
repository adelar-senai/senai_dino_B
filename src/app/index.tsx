import { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [isJumping, setIsJumping] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const dinoBottom = useRef(new Animated.Value(352)).current;

  const cactusRight = useRef(new Animated.Value(40)).current;

  const buttonSize = useRef(new Animated.Value(1)).current;

  const titleRotation = useRef(new Animated.Value(0)).current;

  const buttonInteraction = (scale: number) => {
    Animated.spring(buttonSize, {
      toValue: scale,
      useNativeDriver: true,
      speed: 15,
      bounciness: 7
    }).start();
  }
  
  const randomDelay = Math.floor(Math.random() * (600 - 300) + 300)
  
  const moveCactus = () => {
    Animated.sequence([
      Animated.timing(cactusRight, {
        toValue: 1800,
        duration: 3000,
        useNativeDriver: false,
      }),
      Animated.timing(cactusRight, {
        toValue:40,
        duration: 1,
        useNativeDriver: false
      }),
      Animated.delay(randomDelay),
    ]).start(({finished}) => {
      if(finished){
        
          moveCactus();
        }
      });
  };

  useEffect(() => {
    moveCactus();
  }, []);

  const play = () => {
    setGameStarted(true);
  };

  const jump = () => {
    console.log("Click Nobru apelão");

    if (isJumping) return;
    setIsJumping(true);

    Animated.sequence([
      Animated.timing(dinoBottom, {
        toValue: 500,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.delay(70),
      Animated.timing(dinoBottom, {
        toValue: 352,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIsJumping(false);
    });
  };
  return (
    <View style={styles.container}>
      {gameStarted ? (
        <Pressable style={styles.gameContainer} onPress={jump}>
          <View style={styles.ground}></View>
          <Animated.View style={[styles.cactus, { right: cactusRight }]}>
            <Image
              source={require("@/assets/images/dino.png")}
              style={styles.cactusImage}
            />
          </Animated.View>
          <Animated.View style={[styles.dino, { bottom: dinoBottom }]}>
            <Image
              source={require("@/assets/images/dino.png")}
              style={styles.dinoImage}
            />
          </Animated.View>
        </Pressable>
      ) : (
        <View>
          <Pressable style={styles.playButton} onPress={play}
            onHoverIn={() => buttonInteraction(0.90)}
            onHoverOut={() => buttonInteraction(1)}
          > 
            <Animated.Image
              source={require("@/assets/images/play_dino.png")}
              style={[
                styles.playButtonImage,
                {transform: [{scale: buttonSize}]}
              ]}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  gameContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    position: "relative",
  },
  ground: {
    position: "absolute",
    bottom: 350,
    height: 2,
    width: "100%",
    backgroundColor: "#000",
  },
  dino: {
    position: "absolute",
    left: 40,
    width: 40,
    height: 40,
  },
  dinoImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  cactus: {
    position: "absolute",
    bottom: 352,
    right: 40,
    width: 20,
    height: 45,
  },
  cactusImage: {
    width: 32,
    height: 45,
    resizeMode: "contain",
  },
  playButton: {
    position: "absolute",
    alignSelf: "center",
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff00",
  },
  playButtonImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
