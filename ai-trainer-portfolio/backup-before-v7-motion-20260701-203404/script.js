const knowledgeSearch = document.querySelector("#knowledgeSearch");
const cards = [...document.querySelectorAll(".knowledge-card")];

function filterKnowledge(value) {
  const query = value.trim().toLowerCase();
  cards.forEach((card) => {
    const text = `${card.textContent} ${card.dataset.keywords || ""}`.toLowerCase();
    const matched = !query || text.includes(query);
    card.hidden = !matched;
    card.classList.toggle("is-match", Boolean(query && matched));
  });
}

if (knowledgeSearch) {
  knowledgeSearch.addEventListener("input", (event) => filterKnowledge(event.target.value));
}

const revealItems = document.querySelectorAll(".skill-grid article, .knowledge-card, .work-card, .visual-grid figure");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.animate(
      [{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 360, easing: "cubic-bezier(.2,.8,.2,1)", fill: "both" }
    );
    observer.unobserve(entry.target);
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => observer.observe(item));
