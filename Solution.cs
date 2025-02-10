
using System;

public class Solution
{
    private int rows;
    private int columns;

    public int[][] SortMatrix(int[][] matrix)
    {
        rows = matrix.Length;
        columns = matrix[0].Length;
        int[][] sortedByDiagonals = new int[rows][];
        for (int r = 0; r < rows; ++r)
        {
            sortedByDiagonals[r] = new int[columns];
        }

        SortDiagonalsIncludingMiddleByNonincreasingOrderInBottomLeft(matrix, sortedByDiagonals);
        SortDiagonalsExcludingMiddleByIncreasingOrderInTopRight(matrix, sortedByDiagonals);

        return sortedByDiagonals;
    }

    private void SortDiagonalsIncludingMiddleByNonincreasingOrderInBottomLeft(int[][] matrix, int[][] sortedByDiagonals)
    {

        for (int startColumn = columns - 1; startColumn >= 0; --startColumn)
        {
            int row = rows - 1;
            int[] diagonal = new int[startColumn + 1];
            for (int column = startColumn; column >= 0; --column)
            {
                diagonal[column] = matrix[row][column];
                --row;
            }

            row = rows - 1;
            Array.Sort(diagonal);
            for (int column = startColumn; column >= 0; --column)
            {
                sortedByDiagonals[row][column] = diagonal[startColumn - column];
                --row;
            }
        }
    }

    private void SortDiagonalsExcludingMiddleByIncreasingOrderInTopRight(int[][] matrix, int[][] sortedByDiagonals)
    {

        for (int startColumn = 1; startColumn < columns; ++startColumn)
        {
            int row = 0;
            int[] diagonal = new int[columns - startColumn];
            for (int column = startColumn; column < columns; ++column)
            {
                diagonal[column - startColumn] = matrix[row][column];
                ++row;
            }

            row = 0;
            Array.Sort(diagonal);
            for (int column = startColumn; column < columns; ++column)
            {
                sortedByDiagonals[row][column] = diagonal[column - startColumn];
                ++row;
            }
        }
    }
}
