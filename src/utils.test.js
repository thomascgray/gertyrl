import { positionsToCollisionGrid } from "./utils";
describe("utils", () => {
  describe("positionsToCollisionGrid", () => {
    it("points to grid", () => {
      let points = [
        {
          x: 0,
          y: 0
        },
        {
          x: 0,
          y: 3
        }
      ];

      const grid = positionsToCollisionGrid(points);

      expect(grid).toMatchObject([
        [1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]);
    });

    it("lots of points", () => {
      let points = [
        {
          x: 0,
          y: 0
        },
        {
          x: 0,
          y: 1
        },
        {
          x: 0,
          y: 2
        },
        {
          x: 0,
          y: 3
        },
        {
          x: 7,
          y: 4
        },
        {
          x: 7,
          y: 5
        },
        {
          x: 7,
          y: 6
        },
        {
          x: 7,
          y: 7
        }
      ];

      const grid = positionsToCollisionGrid(points);

      expect(grid).toMatchObject([
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1]
      ]);
    });
  });
});
