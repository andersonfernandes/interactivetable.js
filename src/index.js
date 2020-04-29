import 'bootstrap'
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

const selectedCellsView = document.querySelector('.selected-cells')

document.querySelectorAll(".interactive-table td").forEach((element, _) => {
  element.querySelector('.cell').addEventListener("change", () => {
    element.classList.toggle("selected")

    let selectedCells = Array.from(document.querySelectorAll(".interactive-table .selected"))

    selectedCellsView.innerHTML = selectedCells.map((cellElement) =>{
      return cellElement.textContent
    })
  })
})
