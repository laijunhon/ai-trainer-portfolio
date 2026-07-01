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

const cursorGlow = document.querySelector(".cursor-glow");
if (cursorGlow && matchMedia("(pointer: fine)").matches) {
  document.body.classList.add("has-pointer");
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.transform = `translate3d(${event.clientX - 180}px, ${event.clientY - 180}px, 0)`;
  }, { passive: true });
}

const revealItems = document.querySelectorAll(".intro-strip, .metric-panel article, .skill-grid article, .knowledge-card, .work-card, .visual-grid figure, .tetris-frame, .video-slot");
revealItems.forEach((item) => item.classList.add("reveal-ready"));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("reveal-in");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.16 });

revealItems.forEach((item) => revealObserver.observe(item));

const metricNumbers = document.querySelectorAll("[data-count]");
const metricObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count || 0);
    const suffix = target === 100 ? "+" : "";
    const start = performance.now();
    const duration = 900;
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    metricObserver.unobserve(el);
  });
}, { threshold: 0.6 });

metricNumbers.forEach((number) => metricObserver.observe(number));
