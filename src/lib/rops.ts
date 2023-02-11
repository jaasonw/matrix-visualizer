import { simplify } from "mathjs";

// Interchange any 2 rows
export function rowSwap(matrix: string[][], row1: number, row2: number) {
  const _matrix = structuredClone(matrix);
  const temp = _matrix[row1];
  _matrix[row1] = _matrix[row2];
  _matrix[row2] = temp;
  return _matrix;
}

// multiply a row by a scaler (can be a number or a variable)
export function scalerMultiply(matrix: string[][], row: number, scaler: any) {
  const _matrix = structuredClone(matrix);
  for (let i = 0; i < _matrix[row].length; ++i) {
    _matrix[row][i] = simplify(
      `multiply(${scaler}, ${_matrix[row][i]})`
    ).toString({
      implicit: "hide",
      parenthesis: "auto",
    });
  }
  return _matrix;
}

// add a scaler multiple of row1 to row2
export function rowSum(
  matrix: string[][],
  row1: number,
  row2: number,
  scaler: any
) {
  const _matrix = structuredClone(matrix);
  const temp = [[..._matrix[row1]]];
  const _temp = scalerMultiply(temp, 0, scaler);
  for (let i = 0; i < _matrix[row2].length; ++i) {
    _matrix[row2][i] = simplify(
      `(${_temp[0][i]}) + (${_matrix[row2][i]})`
    ).toString({ implicit: "hide", parenthesis: "auto" });
  }
  return _matrix;
}
