// Animações modernas no scroll
const revealElements = document.querySelectorAll(".reveal");
const header = document.querySelector(".site-header");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -60px 0px",
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

updateHeader();
window.addEventListener("scroll", updateHeader);

// Carrossel de serviços 100% manual.
// Não existe autoplay neste arquivo.
function initServicesCarousel() {
  const carousel =
    document.querySelector("[data-services-carousel]") ||
    document.querySelector(".services-carousel");

  if (!carousel) return;

  const track =
    carousel.querySelector("[data-services-track]") ||
    carousel.querySelector(".services-track");

  if (!track) return;

  const prevButton =
    carousel.querySelector("[data-services-prev]") ||
    carousel.querySelector(".services-arrow-prev") ||
    carousel.querySelector(".carousel-btn.prev");

  const nextButton =
    carousel.querySelector("[data-services-next]") ||
    carousel.querySelector(".services-arrow-next") ||
    carousel.querySelector(".carousel-btn.next");

  const dotsContainer =
    carousel.querySelector("[data-services-dots]") ||
    carousel.querySelector(".services-dots");

  const cards = Array.from(track.querySelectorAll(".service-card"));
  if (!cards.length) return;

  let currentIndex = 0;

  function visibleCards() {
    if (window.innerWidth <= 720) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  }

  function maxIndex() {
    return Math.max(0, cards.length - visibleCards());
  }

  function cardStep() {
    const firstCard = cards[0];
    const rect = firstCard.getBoundingClientRect();
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.gap || styles.columnGap || "0");
    return rect.width + gap;
  }

  function buildDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";
    const count = maxIndex() + 1;

    for (let i = 0; i < count; i += 1) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "services-dot";
      dot.setAttribute("aria-label", `Ir para serviços ${i + 1}`);
      dot.addEventListener("click", () => {
        currentIndex = i;
        update();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function update() {
    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex()));
    track.style.transform = `translate3d(-${currentIndex * cardStep()}px, 0, 0)`;

    if (prevButton) prevButton.disabled = currentIndex === 0;
    if (nextButton) nextButton.disabled = currentIndex === maxIndex();

    if (dotsContainer) {
      Array.from(dotsContainer.children).forEach((dot, i) => {
        dot.classList.toggle("is-active", i === currentIndex);
      });
    }
  }

  prevButton?.addEventListener("click", (event) => {
    event.preventDefault();
    currentIndex -= 1;
    update();
  });

  nextButton?.addEventListener("click", (event) => {
    event.preventDefault();
    currentIndex += 1;
    update();
  });

  window.addEventListener("resize", () => {
    buildDots();
    update();
  });

  buildDots();
  update();
}

initServicesCarousel();

// Menu mobile premium
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const nav = document.querySelector(".nav");

if (mobileMenuToggle && nav) {
  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    mobileMenuToggle.classList.toggle("is-open", isOpen);
    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      mobileMenuToggle.classList.remove("is-open");
      mobileMenuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

