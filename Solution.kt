
class Solution {

    private var rows = 0
    private var columns = 0

    fun sortMatrix(matrix: Array<IntArray>): Array<IntArray> {
        rows = matrix.size
        columns = matrix[0].size
        val sortedByDiagonals = Array<IntArray>(rows) { IntArray(columns) }

        sortDiagonalsIncludingMiddleByNonincreasingOrderInBottomLeft(matrix, sortedByDiagonals);
        sortDiagonalsExcludingMiddleByIncreasingOrderInTopRight(matrix, sortedByDiagonals);

        return sortedByDiagonals
    }

    private fun sortDiagonalsIncludingMiddleByNonincreasingOrderInBottomLeft(matrix: Array<IntArray>, sortedByDiagonals: Array<IntArray>) {

        for (startColumn in columns - 1 downTo 0) {
            var row = rows - 1
            val diagonal = IntArray(startColumn + 1)
            for (column in startColumn downTo 0) {
                diagonal[column] = matrix[row][column]
                --row
            }

            row = rows - 1
            diagonal.sort()
            for (column in startColumn downTo 0) {
                sortedByDiagonals[row][column] = diagonal[startColumn - column]
                --row
            }
        }
    }

    private fun sortDiagonalsExcludingMiddleByIncreasingOrderInTopRight(matrix: Array<IntArray>, sortedByDiagonals: Array<IntArray>) {

        for (startColumn in 1..<columns) {
            var row = 0
            val diagonal = IntArray(columns - startColumn)
            for (column in startColumn..<columns) {
                diagonal[column - startColumn] = matrix[row][column]
                ++row
            }

            row = 0
            diagonal.sort()
            for (column in startColumn..<columns) {
                sortedByDiagonals[row][column] = diagonal[column - startColumn]
                ++row
            }
        }
    }
}
