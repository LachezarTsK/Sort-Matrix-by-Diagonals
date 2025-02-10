
package main

import "slices"

var rows int
var columns int

func sortMatrix(matrix [][]int) [][]int {
    rows = len(matrix)
    columns = len(matrix[0])
    sortedByDiagonals := make([][]int, rows)
    for r := range rows {
        sortedByDiagonals[r] = make([]int, columns)
    }

    sortDiagonalsIncludingMiddleByNonincreasingOrderInBottomLeft(matrix, sortedByDiagonals)
    sortDiagonalsExcludingMiddleByIncreasingOrderInTopRight(matrix, sortedByDiagonals)

    return sortedByDiagonals
}

func sortDiagonalsIncludingMiddleByNonincreasingOrderInBottomLeft(matrix [][]int, sortedByDiagonals [][]int) {

    for startColumn := columns - 1; startColumn >= 0; startColumn-- {
        row := rows - 1
        diagonal := make([]int, startColumn+1)
        for column := startColumn; column >= 0; column-- {
            diagonal[column] = matrix[row][column]
            row--
        }

        row = rows - 1
        slices.Sort(diagonal)
        for column := startColumn; column >= 0; column-- {
            sortedByDiagonals[row][column] = diagonal[startColumn-column]
            row--
        }
    }
}

func sortDiagonalsExcludingMiddleByIncreasingOrderInTopRight(matrix [][]int, sortedByDiagonals [][]int) {

    for startColumn := 1; startColumn < columns; startColumn++ {
        row := 0
        diagonal := make([]int, columns-startColumn)
        for column := startColumn; column < columns; column++ {
            diagonal[column-startColumn] = matrix[row][column]
            row++
        }

        row = 0
        slices.Sort(diagonal)
        for column := startColumn; column < columns; column++ {
            sortedByDiagonals[row][column] = diagonal[column-startColumn]
            row++
        }
    }
}
