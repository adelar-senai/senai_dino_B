import { StyleSheet, View, Image, Pressable} from 'react-native';
import { useState } from 'react';

export default function HomeScreen() {

  const [dinoBottom, setDinoBottom] = useState(350);

  const jump = () => {
    console.log('Click Nobru apelão');
    setDinoBottom(500);

    setTimeout(() => {
      setDinoBottom(350);
    }, 700);
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.gameContainer} onPress={jump}>
        <View style={styles.ground}></View>
        <View style={[styles.dino, { bottom: dinoBottom }]}>
          <Image source={require('../../assets/images/dino.png')}
            style={styles.dinoImage}
          />
        </View>
      </Pressable>
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
    backgroundColor: '#ffffff',
    position: 'relative',
    
  },
  ground: {
    position: 'absolute',
    bottom: 350,
    height: 2,
    width: '100%',
    backgroundColor: '#000',
    
  },
  dino: {
    position: 'absolute',
    left: 40,
    width: 40,
    height: 40,
    backgroundColor: '#000',
  },
  dinoImage: {
  width: 40,
  height: 40,
  resizeMode: 'contain',
}
});
