
import java.util.Arrays;

public class Solution {

    int rows;
    int columns;

    public int[][] sortMatrix(int[][] matrix) {
        rows = matrix.length;
        columns = matrix[0].length;
        int[][] sortedByDiagonals = new int[rows][columns];

        sortDiagonalsIncludingMiddleByNonincreasingOrderInBottomLeft(matrix, sortedByDiagonals);
        sortDiagonalsExcludingMiddleByIncreasingOrderInTopRight(matrix, sortedByDiagonals);

        return sortedByDiagonals;
    }

    private void sortDiagonalsIncludingMiddleByNonincreasingOrderInBottomLeft(int[][] matrix, int[][] sortedByDiagonals) {

        for (int startColumn = columns - 1; startColumn >= 0; --startColumn) {
            int row = rows - 1;
            int[] diagonal = new int[startColumn + 1];
            for (int column = startColumn; column >= 0; --column) {
                diagonal[column] = matrix[row][column];
                --row;
            }

            row = rows - 1;
            Arrays.sort(diagonal);
            for (int column = startColumn; column >= 0; --column) {
                sortedByDiagonals[row][column] = diagonal[startColumn - column];
                --row;
            }
        }
    }

    private void sortDiagonalsExcludingMiddleByIncreasingOrderInTopRight(int[][] matrix, int[][] sortedByDiagonals) {

        for (int startColumn = 1; startColumn < columns; ++startColumn) {
            int row = 0;
            int[] diagonal = new int[columns - startColumn];
            for (int column = startColumn; column < columns; ++column) {
                diagonal[column - startColumn] = matrix[row][column];
                ++row;
            }

            row = 0;
            Arrays.sort(diagonal);
            for (int column = startColumn; column < columns; ++column) {
                sortedByDiagonals[row][column] = diagonal[column - startColumn];
                ++row;
            }
        }
    }
}
