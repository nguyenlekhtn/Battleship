import { convertVectorToCoord, SHIPS_LENGTH } from "../helper";
import { CoordType } from "../helper";

export type ShipType = {
  id: string;
  length: number;
  isSunk: () => boolean;
  hit: (a: number) => void;
  getRotated: () => boolean;
  changeDirection: () => void;
  getBoard: () => boolean[];
};

export const Ship = (type: string): ShipType => {
  const id = type;
  const length: number = SHIPS_LENGTH[type];
  let rotated = false;
  const shipBoard = Array(length).fill(false);

  const isSunk = (): boolean => {
    return shipBoard.reduce((acc, cell) => acc && cell, true);
  };

  const hit = (cell: number) => {
    return shipBoard.splice(cell, 1, true);
  };

  const changeDirection = () => {
    rotated = !rotated;
  };

  const getRotated = () => rotated;
  return {
    id,
    getRotated,
    length,
    isSunk,
    hit,
    getBoard: () => [...shipBoard],
    changeDirection,
  };
};
