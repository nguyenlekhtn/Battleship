import { Ship, ShipType } from "../Ship";
import {
  convertVectorToCoord,
  CoordType,
  createFleet,
  randCoord,
} from "../helper";
import { cloneDeep } from "lodash";

export const Gameboard = () => {
  const board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  let placedShip: ShipType[] = [];
  const fleet = createFleet();

  const isPlacedAllShip = placedShip.length === fleet.length;

  const isValid = (
    length: number,
    [x0, y0]: CoordType,
    rotated: boolean
  ): boolean => {
    const coords = convertVectorToCoord(length, [x0, y0], rotated);
    const isAllInside = coords.every(([x, y]) => x < 10 && y < 10);
    if (!isAllInside) return false;
    else if (
      coords.map(([x, y]) => board[x][y]).every((element) => element === null)
    )
      return true;
    else return false;
  };

  const placeShip = (ship: ShipType, [x0, y0]: CoordType) => {
    const valid = isValid(ship.length, [x0, y0], ship.getRotated());
    if (valid) {
      const shipCoords = convertVectorToCoord(
        ship.length,
        [x0, y0],
        ship.getRotated()
      );
      shipCoords.forEach(([x, y], index) => (board[x][y] = { ship, index }));
      placedShip.push(ship);
    }

    return valid;
  };

  const autoPlaceShip = (ship: ShipType): [CoordType, boolean] => {
    if (Math.random() < 0.5) ship.changeDirection();
    let randomCoord = randCoord();
    while (!isValid(ship.length, randomCoord, ship.getRotated())) {
      ship.changeDirection();
      randomCoord = randCoord();
    }
    placeShip(ship, randomCoord);

    return [randomCoord, ship.getRotated()];
  };

  const autoPlaceFleet = (fleet: ShipType[]): void => {
    fleet.forEach((ship) => autoPlaceShip(ship));
  };

  const receiveAtk = ([x, y]: CoordType) => {
    if (board[x][y] === null) {
      // nothing so it's missed
      board[x][y] = "missed";
    } else if (board[x][y].ship) {
      // hit the ship
      const index = board[x][y].index;
      const ship = board[x][y].ship;
      ship.hit(index);
      board[x][y] = "hit";
    } else {
      throw Error("Invalid boardCell value");
    }
    return board[x][y];
  };

  const isAllSunk = (): boolean => {
    return placedShip
      .map((ship) => ship.isSunk())
      .every((value) => value === true);
  };

  const reset = () => {
    board.forEach((row) => row.map((cell) => null));
    placedShip = [];
  };

  const getValidRandCoordToAtk = () => {
    let [x, y]: CoordType = randCoord();
    while (board[x][y] === "hit" || board[x][y] === "missed") {
      [x, y] = randCoord();
    }

    return [x, y];
  };

  return {
    isPlacedAllShip,
    autoPlaceFleet,
    getBoard: () => cloneDeep(board),
    placeShip,
    receiveAtk,
    isAllSunk,
    autoPlaceShip,
    reset,
    getValidRandCoordToAtk,
  };
};
export type BoardCellType = null | string | { ship: ShipType; index: number };

export type GameboardType = {
  getBoard: (argo0: void) => [][];
  placeShip: (arg0: ShipType, arg1: CoordType) => boolean;
  receiveAtk: (arg0: CoordType) => BoardCellType;
  isAllSunk: (arg0: void) => boolean;
  autoPlaceShip: (arg0: void) => void;
  reset: (arg0: void) => void;
  getValidRandCoordToAtk: (arg0: void) => CoordType;
};
