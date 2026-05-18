// Animações modernas no scroll
// Este arquivo observa os elementos com a classe .reveal
// e adiciona a classe .is-visible quando eles entram na tela.

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

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

function updateHeader() {
  if (window.scrollY > 24) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
}

updateHeader();
window.addEventListener("scroll", updateHeader);

// Carrossel premium de serviços
const servicesCarousel = document.querySelector(".services-carousel");

if (servicesCarousel) {
  const track = servicesCarousel.querySelector(".services-track");
  const slides = Array.from(servicesCarousel.querySelectorAll(".service-slide"));
  const prevButton = servicesCarousel.querySelector(".carousel-arrow-left");
  const nextButton = servicesCarousel.querySelector(".carousel-arrow-right");
  const dotsContainer = document.querySelector(".carousel-dots");
  const autoplayDelay = Number(servicesCarousel.dataset.autoplay || 4500);

  let currentIndex = 0;
  let autoplayId;

  function slidesPerView() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 960) return 2;
    return 3;
  }

  function maxIndex() {
    return Math.max(0, slides.length - slidesPerView());
  }

  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    for (let index = 0; index <= maxIndex(); index++) {
      const dot = document.createElement("button");
      dot.className = "carousel-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Ir para grupo de serviços ${index + 1}`);
      dot.addEventListener("click", () => {
        goTo(index);
        restartAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = Array.from(dotsContainer.querySelectorAll(".carousel-dot"));
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });
  }

  function updateCarousel() {
    currentIndex = Math.min(currentIndex, maxIndex());
    const slide = slides[0];
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
    const movement = (slide.offsetWidth + gap) * currentIndex;
    track.style.transform = `translateX(-${movement}px)`;
    updateDots();
  }

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex()));
    updateCarousel();
  }

  function nextSlide() {
    currentIndex = currentIndex >= maxIndex() ? 0 : currentIndex + 1;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = currentIndex <= 0 ? maxIndex() : currentIndex - 1;
    updateCarousel();
  }

  function startAutoplay() {
    autoplayId = window.setInterval(nextSlide, autoplayDelay);
  }

  function stopAutoplay() {
    window.clearInterval(autoplayId);
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  prevButton?.addEventListener("click", () => {
    prevSlide();
    restartAutoplay();
  });

  nextButton?.addEventListener("click", () => {
    nextSlide();
    restartAutoplay();
  });

  servicesCarousel.addEventListener("mouseenter", stopAutoplay);
  servicesCarousel.addEventListener("mouseleave", startAutoplay);
  servicesCarousel.addEventListener("focusin", stopAutoplay);
  servicesCarousel.addEventListener("focusout", startAutoplay);

  window.addEventListener("resize", () => {
    createDots();
    updateCarousel();
  });

  createDots();
  updateCarousel();
  startAutoplay();
}
