
function sortMatrix(matrix: number[][]): number[][] {
    this.rows = matrix.length;
    this.columns = matrix[0].length;
    const sortedByDiagonals: number[][] = Array.from(new Array(this.rows), () => new Array(this.columns));

    sortDiagonalsIncludingMiddleByNonincreasingOrderInBottomLeft(matrix, sortedByDiagonals);
    sortDiagonalsExcludingMiddleByIncreasingOrderInTopRight(matrix, sortedByDiagonals);

    return sortedByDiagonals;
};


function sortDiagonalsIncludingMiddleByNonincreasingOrderInBottomLeft(matrix: number[][], sortedByDiagonals: number[][]): void {

    for (let startColumn = this.columns - 1; startColumn >= 0; --startColumn) {
        let row = this.rows - 1;
        const diagonal: number[] = new Array(startColumn + 1);
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

function sortDiagonalsExcludingMiddleByIncreasingOrderInTopRight(matrix: number[][], sortedByDiagonals: number[][]): void {

    for (let startColumn = 1; startColumn < this.columns; ++startColumn) {
        let row = 0;
        const diagonal: number[] = new Array(this.columns - startColumn);
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
