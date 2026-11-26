import { useRef, useState, useEffect } from "react";
import { Animated, Image, Pressable, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const screenRCorner = 2000;
  const screenLCorner = 0;
  // Define o estado inicial dos obstaculos, X sendo a posição horizontal e count sendo a quantidade de cactus q vão aparecer de acorodo com o index
  const [obstacles, setObstacles] = useState([
    { id: 1, x: 400, count: 1 },
    { id: 2, x: 800, count: 3 },
    { id: 3, x: 1200, count: 2 },
  ]);
  const [isJumping, setIsJumping] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Função q faz os porras se moverem, ela retorna o array anterior MAPEADO pra o X (a posição) perder 5 pixels rsrs
  // O reticencias ali é pra pegar o bagulho de antes e não perder as outras propriedades do objeto, só alterar o X msm
  const moveObstacles = () => {
    const randomGap = Math.floor(Math.random() * 300) + 300;

    setObstacles((prevObstacles) => {
      const rightMostObstacle = Math.max(
        ...prevObstacles.map((obstacle) => obstacle.x),
      );
      return prevObstacles.map((obstacle) => {
        // newX é como o nome diz, a nova posição dos cactus guardadas numa variável
        const newX = obstacle.x - 2;
        // esse condicional tá dizendo: Se a nova posição dos cactos(newX) + a largura dos pixels de cada cacto for menor que a borda esquerda
        // da tela, respawna os cactos no canto direito da tela denovo, se não, guarde o valor da posição deles na variavel newX
        if (newX + obstacle.count * 32 <= screenLCorner) {
          return { ...obstacle, x: (rightMostObstacle + randomGap) };
        } else {
          return { ...obstacle, x: newX };
        }
      });
    });
  };
  // useEffect de cria pra rodar tudo no momento q a tela for ligada né, o interval é um nome pra função q vai botar um intervalo
  // pra rodar a cada 20ms o moveObstacles(), e o return é pra quando a tela for fechada ele limpar o intervalo, pra não ficar rodando no fundo
  useEffect(() => {
    const interval = setInterval(() => {
      moveObstacles();
    }, 5);
    return () => clearInterval(interval);
  }, []);

  const [isJumping, setIsJumping] = useState(false);

  const dinoBottom = useRef(new Animated.Value(352)).current;

  // Função do pulo
  const play = () => {
    setGameStarted(true);
  };

  const jump = () => {
    console.log("Click Nobru apelão");

    // Quando a funçao inicia esse bagulho fala que o pulo é 'true', ou seja, ele está no ar
    if (isJumping) return;
    setIsJumping(true);

    // Essa equencia de animações é basicamente o pulo do dino, ele sobe pra 500, fica no ar durante 200ms e depois volta pra 352
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
      // Aqui esse start dá inicio  animação, e quando ela termina ele diz que o pulo é 'false', ou seja, ele voltou pro chão
    ]).start(() => {
      setIsJumping(false);
    });
  };

  return (
    <View style={styles.container}>
      {/* Aqui esse pressable pega a tela inteira o click de qualquer plataforma, o 'onPress={jump}' diz que quando um click acontece, faça a função 'jump' */}
      <Pressable style={styles.gameContainer} onPress={jump}>
        {/* A porra do chão */}
        <View style={styles.ground} />

        {/* Issae ta pegando aquele array lá de cima e alterando cada objeto, o '(obstacle)' é só um nome pra cada alteração */}
        {/* O view ali dentro é o que dá a posição dos obstáculos, o 'key' pega o id dos ojeto no array pra saber o que fazer com cada id */}
        {obstacles.map((obstacle) => (
          <View
            key={obstacle.id}
            style={{
              position: "absolute",
              left: obstacle.x,
              bottom: 352,
              flexDirection: "row",
            }}
          >
            {/* Array.from cria um array seguindo as regras que está dps do bagulho, oq significa q ele ta criando um array do tamanho da quantidade de obstaculos   */}
            {/* O .map tá correndo na porra toda que acabemo de criar e definindo cada posição com as tag 'img'   */}
            {Array.from({ length: obstacle.count }).map((_, index) => (
              <Image
                key={index}
                source={require("@/assets/images/dino.png")}
                style={styles.cactusImage}
              />
            ))}
          </View>
        ))}

        <Animated.View style={[styles.dino, { bottom: dinoBottom }]}>
          <Image
            source={require("@/assets/images/Dino.jpg")}
            style={styles.dinoImage}
          />
        </Animated.View>
      </Pressable>
      {gameStarted ? (
        <Pressable style={styles.gameContainer} onPress={jump}>
          <View style={styles.ground}></View>
          <Animated.View style={[styles.cactus, { right: cactusRight }]}>
            <Image
              source={require("@/assets/images/pênis-de-sorriso-erected-107203673.webp")}
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
          <Pressable style={styles.playButton} onPress={play}>
            <Image
              source={require("@/assets/images/play_dino.png")}
              style={styles.playButtonImage}
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
