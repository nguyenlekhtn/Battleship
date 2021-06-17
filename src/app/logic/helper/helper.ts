import { cloneDeep } from "lodash";
import { Ship } from "../Ship";

type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;

type Tuple10<T> = Tuple<T, 10>;
export type Board10x10<P> = Tuple10<Tuple10<P>>;

export type BoardType = Board10x10<any>;
export type CoordType = [number, number];

export function convertVectorToCoord(
  length: number,
  origin: CoordType,
  rotated: boolean
): CoordType[] {
  const array: [number, number][] = Array.from(Array(length), () => [
    origin[0],
    origin[1],
  ]);
  if (!rotated) return array.map(([x, y], index) => [x, y + index]);
  return array.map(([x, y], index) => [x + index, y]);
}

export const markMap =
  (map: BoardType) =>
  (obj: any) =>
  (coords: CoordType[]): BoardType => {
    const newMap = cloneDeep(map);
    coords.forEach(([x, y]) => (newMap[x][y] = obj));
    return newMap;
  };

export const SHIPS_LENGTH: { [key: string]: number } = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
} as const;

export const randCoord = (sizeX = 10, sizeY = 10): CoordType => [
  Math.floor(Math.random() * sizeX),
  Math.floor(Math.random() * sizeY),
];

export const createFleet = () => {
  return Object.keys(SHIPS_LENGTH).map((key) => Ship(key));
};
