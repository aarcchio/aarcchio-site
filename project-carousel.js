document.querySelectorAll("[data-project-carousel]").forEach((carousel) => {
  const image = carousel.querySelector("[data-carousel-image]");
  const caption = carousel.querySelector("[data-carousel-caption]");
  const previous = carousel.querySelector("[data-carousel-previous]");
  const next = carousel.querySelector("[data-carousel-next]");
  const slides = JSON.parse(carousel.dataset.slides || "[]");

  if (!image || !previous || !next || slides.length === 0) {
    return;
  }

  let currentIndex = 0;

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    const slide = slides[currentIndex];

    image.src = slide.src;
    image.alt = slide.alt || "";

    if (caption) {
      caption.textContent = slide.caption || "";
    }
  }

  previous.addEventListener("click", () => {
    showSlide(currentIndex - 1);
  });

  next.addEventListener("click", () => {
    showSlide(currentIndex + 1);
  });

  showSlide(0);
});
