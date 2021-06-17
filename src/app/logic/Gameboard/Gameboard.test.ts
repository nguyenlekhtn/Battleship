import { Gameboard } from "./Gameboard";
import { Ship } from "../Ship";

describe("place", () => {
  const ship = Ship("destroyer");
  const gameboard = Gameboard();

  test("place ship", () => {
    gameboard.placeShip(ship, [0, 0]);
    expect(gameboard.getBoard()[0][0].ship.id).toBe("destroyer");
    expect(gameboard.getBoard()[0][1].ship.id).toBe("destroyer");
  });

  test("auto place", () => {
    const submarine = Ship("submarine");
    const cruiser = Ship("cruiser");
    const coord1 = gameboard.autoPlace(submarine);
    const coord2 = gameboard.autoPlace(cruiser);
    expect(coord1).not.toBe(coord2);
    expect(gameboard.getBoard()[coord1[0]][coord1[1]].ship.id).toBe(
      "submarine"
    );
  });
});

describe("receiveAtk", () => {
  const ship = Ship("destroyer");
  const gameboard = Gameboard();
  gameboard.placeShip(ship, [0, 0]);

  test("miss", () => {
    gameboard.receiveAtk([2, 2]);
    expect(gameboard.getBoard()[2][2]).toBe("missed");
  });

  test("hit", () => {
    const index = gameboard.getBoard()[0][0].index;
    gameboard.receiveAtk([0, 0]);
    const result = ship.getBoard()[index];
    expect(result).toBe(true);
    expect(gameboard.getBoard()[0][0]).toBe("hit");
  });
});

describe("atked gameboard", () => {
  const destroyer1 = Ship("destroyer");
  const destroyer2 = Ship("destroyer");
  const gameboard = Gameboard();
  gameboard.placeShip(destroyer1, [0, 0]);
  gameboard.placeShip(destroyer2, [1, 0]);
  gameboard.receiveAtk([0, 0]);
  gameboard.receiveAtk([0, 1]);
  gameboard.receiveAtk([1, 0]);
  gameboard.receiveAtk([1, 1]);

  test("all sunk", () => {
    expect(gameboard.isAllSunk()).toBe(true);
  });

  test("random coord to atk correctly", () => {
    const [x1, y1] = gameboard.getValidRandCoordToAtk();
    const [x2, y2] = gameboard.getValidRandCoordToAtk();
    expect(gameboard.getBoard()[x1][y1]).not.toBe("hit");
    expect(gameboard.getBoard()[x1][y1]).not.toBe("missed");
    expect(gameboard.getBoard()[x2][y2]).not.toBe("hit");
    expect(gameboard.getBoard()[x2][y2]).not.toBe("missed");
  });
});
