import { Ship } from "./Ship";

test("hit until sunk ship", () => {
  const ship = Ship("destroyer");

  ship.hit(0);
  ship.hit(1);
  expect(ship.isSunk()).toBe(true);
});

test("hit not enough to sunk", () => {
  const ship = Ship("destroyer");

  ship.hit(1);
  expect(ship.isSunk()).toBe(false);
});

test("map length correct", () => {
  const ship = Ship("destroyer");
  expect(ship.length).toBe(2);
});

test("changeDirection correct", () => {
  const ship = Ship("destroyer");

  ship.changeDirection();
  expect(ship.getRotated()).toBe(true);
});
