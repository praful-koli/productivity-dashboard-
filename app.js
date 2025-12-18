function openCard() {
  const fullElems = document.querySelectorAll(".fullElem");

  document.addEventListener("click", function (evt) {
    const card = evt.target.closest(".element");
    if (card) {
      let id = card.dataset.id;
      fullElems[id].style.display = "block";
      return;
    }

    const btn = evt.target.closest(".btn");
    if (btn) {
      let id = btn.dataset.id;
      fullElems[id].style.display = "none";
    }
  });
}
openCard()
