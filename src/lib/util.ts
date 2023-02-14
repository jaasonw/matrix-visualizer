import { simplify } from "mathjs";

/**
 * Converts a csv with space as the default separator to a 2d array, replacing
 * all undefineds with "0"
 * @param csv
 * @param colSep
 * @returns
 */
export function csvToArray(csv: string, rowSep = "\n", colSep = " ") {
  const rows = csv.split(rowSep);
  return rows.map((row) => row.split(colSep).map((e) => (e === "" ? "0" : e)));
}

/**
 * Converts a matrix containing math expressions to latex statements
 * @param matrix
 * @returns
 */
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
