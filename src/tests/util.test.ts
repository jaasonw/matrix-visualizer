import { csvToArray } from "$lib/util";
import { describe, expect, it } from "vitest";

describe("converts csv to arrays", () => {
  it("converts csvs", () => {
    expect(csvToArray(`x 53 61\n10 x 7\n67 91 x`)).toStrictEqual([
      ["x", "53", "61"],
      ["10", "x", "7"],
      ["67", "91", "x"],
    ]);
  });
  it("converts csvs with custom separators", () => {
    expect(csvToArray(`x,53,61:10,x,7:67,91,x`, ":", ",")).toStrictEqual([
      ["x", "53", "61"],
      ["10", "x", "7"],
      ["67", "91", "x"],
    ]);
  });
  it("replaces undefineds with zeros", () => {
    expect(csvToArray(`x 53 \n10 x 7\n67 91 `)).toStrictEqual([
      ["x", "53", "0"],
      ["10", "x", "7"],
      ["67", "91", "0"],
    ]);
  });
});
