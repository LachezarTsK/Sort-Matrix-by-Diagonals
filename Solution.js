
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var sortMatrix = function (matrix) {
    this.rows = matrix.length;
    this.columns = matrix[0].length;
    const sortedByDiagonals = Array.from(new Array(this.rows), () => new Array(this.columns));

    sortDiagonalsIncludingMiddleByNonincreasingOrderInBottomLeft(matrix, sortedByDiagonals);
    sortDiagonalsExcludingMiddleByIncreasingOrderInTopRight(matrix, sortedByDiagonals);

    return sortedByDiagonals;
};

/**
 * @param {number[][]} matrix
 * @param {number[][]} sortedByDiagonals
 * @return {void}
 */
function sortDiagonalsIncludingMiddleByNonincreasingOrderInBottomLeft(matrix, sortedByDiagonals) {

    for (let startColumn = this.columns - 1; startColumn >= 0; --startColumn) {
        let row = this.rows - 1;
        const diagonal = new Array(startColumn + 1);
        for (let column = startColumn; column >= 0; --column) {
            diagonal[column] = matrix[row][column];
            --row;
        }

        row = this.rows - 1;
        diagonal.sort((x, y) => x - y);
        for (let column = startColumn; column >= 0; --column) {
            sortedByDiagonals[row][column] = diagonal[startColumn - column];
            --row;
        }
    }
}

/**
 * @param {number[][]} matrix
 * @param {number[][]} sortedByDiagonals
 * @return {void}
 */
function sortDiagonalsExcludingMiddleByIncreasingOrderInTopRight(matrix, sortedByDiagonals) {

    for (let startColumn = 1; startColumn < this.columns; ++startColumn) {
        let row = 0;
        const diagonal = new Array(this.columns - startColumn);
        for (let column = startColumn; column < this.columns; ++column) {
            diagonal[column - startColumn] = matrix[row][column];
            ++row;
        }

        row = 0;
        diagonal.sort((x, y) => x - y);
        for (let column = startColumn; column < this.columns; ++column) {
            sortedByDiagonals[row][column] = diagonal[column - startColumn];
            ++row;
        }
    }
}
