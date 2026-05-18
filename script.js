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
