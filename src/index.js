import 'bootstrap'
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

function getCellColspan(cell) {
  return parseInt(cell.getAttribute('colspan')) || 1
}

function mergeCells() {
  let rows = document.querySelectorAll(".interactive-table tr:not(.hidden)")

  rows.forEach((row, rowIndex) => {
    let cells = Array.from(row.querySelectorAll("td"))

    let mergePreviousCell = false
    let mergesCount = 0
    let lastMergedCell = null
    cells.forEach((cell, cellIndex) => {
      if (cell.classList.contains('selected')) {
        mergesCount += getCellColspan(cell)

        if (mergePreviousCell) {
          lastMergedCell = lastMergedCell || cells[cellIndex-1]
          lastMergedCell.setAttribute("colspan", mergesCount)
          cell.remove()
        }

        mergePreviousCell = true
      } else {
        mergePreviousCell = false
      }

      cell.classList.remove('selected')
      cell.querySelector('.cell-checkbox').checked = false
    })
  })
}

function splitCells(tableData) {
  let rows = document.querySelectorAll(".interactive-table tr:not(.hidden)")

  rows.forEach((row, rowIndex) => {
    let cells = Array.from(row.querySelectorAll("td"))

    cells.forEach((cell, cellIndex) => {
      if (cell === undefined) return

      if (cell.classList.contains('selected') && getCellColspan(cell) > 1) {
        cell.setAttribute('colspan', getCellColspan(cell) -1) 

        let splitedCell = document.createElement('td')
        splitedCell.innerHTML = tableData[rowIndex][cellIndex+1]
        splitedCell.classList.remove('selected')
        splitedCell.addEventListener("change", () => {
          splitedCell.classList.toggle("selected")
        })
        row.insertBefore(splitedCell, cell.nextSibling)
      }

      cell.classList.remove('selected')
      cell.querySelector('.cell-checkbox').checked = false
    })
  })
}

function generateTableMatrixData() {
  let rows = document.querySelectorAll(".interactive-table tr:not(.hidden)")
  let tableMatrix = new Array(rows.length)

  rows.forEach((row, rowIndex) => {
    let cells = Array.from(row.querySelectorAll("td"))
    tableMatrix[rowIndex] = new Array(cells.length)

    cells.forEach((cell, cellIndex) => {
      tableMatrix[rowIndex][cellIndex] = cell.innerHTML
    })
  })

  return tableMatrix
}

const tableData = generateTableMatrixData()
document.querySelectorAll(".interactive-table td").forEach((element, _) => {
  if(element.querySelector('.cell-checkbox') === null) return

  element.querySelector('.cell-checkbox').addEventListener("change", () => {
    element.classList.toggle("selected")
  })
})

document.querySelector(".merge-button").addEventListener('click', () => {
  mergeCells()
})

document.querySelector(".split-button").addEventListener('click', () => {
  splitCells(tableData)
})
