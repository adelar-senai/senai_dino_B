import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        <View style={styles.ground}></View>
        <View style={styles.dino}></View>
      </View>
      </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  gameContainer: {
    flex: 1,
    backgroundColor: '#fef222',
    position: 'relative',
  },
  ground: {
    position: 'absolute',
    bottom: 500,
    height: 2,
    width: '100%',
    backgroundColor: '#000',
    
  },
  dino: {
    position: 'absolute',
    bottom: 500,
    left: 40,
    width: 40,
    height: 40,
    backgroundColor: '#000',
  }
});
