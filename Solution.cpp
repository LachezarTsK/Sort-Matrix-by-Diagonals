
#include <span>
#include <ranges>
#include <vector>
using namespace std;

class Solution {

    int rows = 0;
    int columns = 0;

public:
    vector<vector<int>> sortMatrix(const vector<vector<int>>& matrix) {
        rows = matrix.size();
        columns = matrix[0].size();
        vector<vector<int>> sortedByDiagonals(rows, vector<int>(columns));

        sortDiagonalsIncludingMiddleByNonincreasingOrderInBottomLeft(matrix, sortedByDiagonals);
        sortDiagonalsExcludingMiddleByIncreasingOrderInTopRight(matrix, sortedByDiagonals);

        return sortedByDiagonals;
    }

private:
    void sortDiagonalsIncludingMiddleByNonincreasingOrderInBottomLeft(span<const vector<int>> matrix, span<vector<int>> sortedByDiagonals) const {

        for (int startColumn = columns - 1; startColumn >= 0; --startColumn) {
            int row = rows - 1;
            vector<int> diagonal(startColumn + 1);
            for (int column = startColumn; column >= 0; --column) {
                diagonal[column] = matrix[row][column];
                --row;
            }

            row = rows - 1;
            ranges::sort(diagonal);
            for (int column = startColumn; column >= 0; --column) {
                sortedByDiagonals[row][column] = diagonal[startColumn - column];
                --row;
            }
        }
    }

    void sortDiagonalsExcludingMiddleByIncreasingOrderInTopRight(span<const vector<int>> matrix, span<vector<int>> sortedByDiagonals) const {

        for (int startColumn = 1; startColumn < columns; ++startColumn) {
            int row = 0;
            vector<int> diagonal(columns - startColumn);
            for (int column = startColumn; column < columns; ++column) {
                diagonal[column - startColumn] = matrix[row][column];
                ++row;
            }

            row = 0;
            ranges::sort(diagonal);
            for (int column = startColumn; column < columns; ++column) {
                sortedByDiagonals[row][column] = diagonal[column - startColumn];
                ++row;
            }
        }
    }
};
