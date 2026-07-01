const knowledgeSearch = document.querySelector("#knowledgeSearch");
const modalSearchInput = document.querySelector("#modalSearchInput");
const cards = [...document.querySelectorAll(".knowledge-card")];
const searchModal = document.querySelector("#searchModal");
const openSearch = document.querySelector("#openSearch");
const closeSearch = document.querySelector("#closeSearch");
const singingBtn = document.querySelector("#singingBtn");

function applyFilter(value) {
  const query = value.trim().toLowerCase();
  cards.forEach((card) => {
    const text = `${card.textContent} ${card.dataset.keywords}`.toLowerCase();
    const isMatch = query && text.includes(query);
    card.classList.toggle("is-match", isMatch);
    card.hidden = Boolean(query) && !isMatch;
  });
}

knowledgeSearch.addEventListener("input", (event) => {
  applyFilter(event.target.value);
});

modalSearchInput.addEventListener("input", (event) => {
  knowledgeSearch.value = event.target.value;
  applyFilter(event.target.value);
});

openSearch.addEventListener("click", () => {
  searchModal.hidden = false;
  modalSearchInput.focus();
});

closeSearch.addEventListener("click", () => {
  searchModal.hidden = true;
});

searchModal.addEventListener("click", (event) => {
  if (event.target === searchModal) {
    searchModal.hidden = true;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    searchModal.hidden = true;
  }
});

singingBtn.addEventListener("click", () => {
  document.querySelector("#hobby").scrollIntoView({ behavior: "smooth", block: "start" });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [
          { opacity: 0, transform: "translateY(18px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)", fill: "both" }
      );
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll(".knowledge-card, .work-item, .media-card, .capability-strip article").forEach((item) => {
  observer.observe(item);
});
