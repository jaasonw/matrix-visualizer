import { simplify } from "mathjs";

/**
 * Creates a 2d matrix of n*n dimensions with initial values
 * @param n
 * @param initial (Optional) default = ""
 * @returns
 */
export function create2d(n: number, initial: any = "") {
  return [...Array(n)].map((_) => Array(n).fill(initial));
}

export function csvToArray(csv: string, sep = " ") {
  const rows = csv.split("\n");
  return rows.map((row) => row.split(sep).map((e) => (e === "" ? "0" : e)));
}

export function matrixToLatex(matrix: string[][]) {
  let latex = "\\begin{bmatrix}";
  for (let row of matrix) {
    for (let i = 0; i < row.length; ++i) {
      latex += `${simplify(row[i] ?? "0").toTex({
        implicit: "hide",
        parenthesis: "auto",
      })}${i == row.length - 1 ? "" : " & "}`;
    }
    latex += "\\\\";
  }
  latex += "\\end{bmatrix}";
  return latex;
}
