import { StyleSheet, View, Image, Pressable, Animated } from "react-native";
import { useRef, useState } from "react";

export default function HomeScreen() {
  const [isJumping, setIsJumping] = useState(false);

  const dinoBottom = useRef(new Animated.Value(352)).current;

  const jump = () => {
    console.log("Click Nobru apelão");

    if(isJumping) return;

    setIsJumping(true);

    Animated.sequence([
      Animated.timing(dinoBottom, {
        toValue: 500,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.delay(200),
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
      <Pressable style={styles.gameContainer} onPress={jump}>
        <View style={styles.ground}></View>
        <Animated.View style={[styles.dino, { bottom: dinoBottom }]}>
          <Image
            source={require("../../assets/images/dino.png")}
            style={styles.dinoImage}
          />
        </Animated.View>
      </Pressable>
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
    backgroundColor: "#000",
  },
  dinoImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});
