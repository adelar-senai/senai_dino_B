
import { Image, Pressable, StyleSheet, View } from "react-native";

type Props = {
  onPlay: () => void;
};

export default function StartScreen({ onPlay }: Props) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.playButton} onPress={onPlay}>
        <Image
          source={require("@/assets/images/play_dino.png")}
          style={styles.playButtonImage}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  playButton: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  playButtonImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
