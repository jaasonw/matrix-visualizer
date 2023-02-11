import { describe, expect, it } from "vitest";
import { rowSum, rowSwap, scalerMultiply } from "./rops";

describe("row swapping", () => {
  it("swaps rows", () => {
    const matrix = [
      ["1", "1", "1"],
      ["2", "2", "2"],
      ["3", "3", "3"],
    ];
    expect(rowSwap(matrix, 0, 1)).toStrictEqual([
      ["2", "2", "2"],
      ["1", "1", "1"],
      ["3", "3", "3"],
    ]);
  });
});

describe("scaler multiplication", () => {
  it("scaler multiplies numbers", () => {
    const matrix = [
      ["1", "1", "1"],
      ["2", "2", "2"],
      ["3", "3", "3"],
    ];
    expect(scalerMultiply(matrix, 0, 4)).toStrictEqual([
      ["4", "4", "4"],
      ["2", "2", "2"],
      ["3", "3", "3"],
    ]);
  });
  it("scaler multiplies variables", () => {
    const matrix = [
      ["1", "1", "1"],
      ["2", "2", "2"],
      ["3", "3", "3"],
    ];
    expect(scalerMultiply(matrix, 0, "x")).toStrictEqual([
      ["x", "x", "x"],
      ["2", "2", "2"],
      ["3", "3", "3"],
    ]);
  });
});

describe("row sum", () => {
  it("adds 1 row to another multiplied by a number", () => {
    const matrix = [
      ["1", "1", "1"],
      ["2", "2", "2"],
      ["3", "3", "3"],
    ];
    expect(rowSum(matrix, 0, 1, 5)).toStrictEqual([
      ["1", "1", "1"],
      ["7", "7", "7"],
      ["3", "3", "3"],
    ]);
  });
  it("adds 1 row to another multiplied by a variable", () => {
    const matrix = [
      ["1", "1", "1"],
      ["2", "2", "2"],
      ["3", "3", "3"],
    ];
    expect(rowSum(matrix, 0, 1, "x")).toStrictEqual([
      ["1", "1", "1"],
      ["x + 2", "x + 2", "x + 2"],
      ["3", "3", "3"],
    ]);
  });
});
