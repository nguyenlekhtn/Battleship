import { CoordType } from "../../factories/type";
import { GameboardType } from "../Gameboard";
import { createFleet, randCoord } from "../helper";

export const Player = (type = "human") => {
  const fleet = createFleet();

  const atk =
    (enemyBoard: GameboardType) =>
    ([x, y]: CoordType) =>
      enemyBoard.receiveAtk([x, y]);

  const autoAtk = (enemyBoard: GameboardType) => {
    const [randomX, randomY] = enemyBoard.getValidRandCoordToAtk();
    return atk(enemyBoard)([randomX, randomY]);
  };

  return {
    getFleet: () => fleet,
    atk,
    autoAtk,
  };
};
