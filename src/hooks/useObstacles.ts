import { useEffect, useState } from "react";
import { GAME_CONFIG } from "../constants/gameConfig";

type ObstacleData = {
  id: number;
  x: number;
  count: number;
};

export default function useObstacles(gameStarted: boolean) {
  const [obstacles, setObstacles] = useState<ObstacleData[]>([
    { id: 1, x: 400, count: 1 },
    { id: 2, x: 800, count: 3 },
    { id: 3, x: 1200, count: 2 },
  ]);

  const moveObstacles = () => {
    setObstacles((prevObstacles) => {
      const rightMostObstacle = Math.max(
        ...prevObstacles.map(
          (obstacle) =>
            obstacle.x + obstacle.count * GAME_CONFIG.obstacle.width,
        ),
      );

      return prevObstacles.map((obstacle) => {
        const newX = obstacle.x - GAME_CONFIG.obstacle.speed;

        if (newX + obstacle.count * GAME_CONFIG.obstacle.width <= 0) {
          const randomCount =
            Math.floor(Math.random() * GAME_CONFIG.obstacle.maxCount) + 1;

          const randomGap =
            Math.floor(
              Math.random() *
                (GAME_CONFIG.obstacle.maxGap - GAME_CONFIG.obstacle.minGap),
            ) + GAME_CONFIG.obstacle.minGap;

          return {
            ...obstacle,
            x: rightMostObstacle + randomGap,
            count: randomCount,
          };
        }

        return {
          ...obstacle,
          x: newX,
        };
      });
    });
  };

  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(moveObstacles, GAME_CONFIG.obstacle.interval);

    return () => clearInterval(interval);
  }, [gameStarted]);

  return {
    obstacles,
  };
}
