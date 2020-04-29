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
    cells.forEach((cell, cellIndex) => {
      if (cell.classList.contains('selected')) {
        mergesCount += getCellColspan(cell)

        if (mergePreviousCell) {
          cells[cellIndex-1].setAttribute("colspan", mergesCount)
          cell.remove()
        } else {
          mergePreviousCell = true
        }
      } else {
        mergePreviousCell = false
      }

      cell.classList.remove('selected')
      cell.querySelector('.cell-checkbox').checked = false
    })
  })

}

document.querySelectorAll(".interactive-table td").forEach((element, _) => {
  if(element.querySelector('.cell-checkbox') === null) return

  element.querySelector('.cell-checkbox').addEventListener("change", () => {
    element.classList.toggle("selected")
  })
})

document.querySelector(".merge-button").addEventListener('click', () => {
  mergeCells()
})
