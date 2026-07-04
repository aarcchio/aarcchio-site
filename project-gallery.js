document.querySelectorAll("[data-project-gallery]").forEach((gallery) => {
  const items = Array.from(gallery.querySelectorAll("[data-gallery-item]"));
  const feature = gallery.querySelector("[data-gallery-feature]");
  const image = gallery.querySelector("[data-gallery-feature-image]");
  const title = gallery.querySelector("[data-gallery-feature-title]");
  const description = gallery.querySelector("[data-gallery-feature-description]");
  const close = gallery.querySelector("[data-gallery-feature-close]");
  const previous = gallery.querySelector("[data-gallery-feature-previous]");
  const next = gallery.querySelector("[data-gallery-feature-next]");

  if (!feature || !image || items.length === 0) {
    return;
  }

  let currentIndex = 0;

  function showFeature(index) {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];

    image.src = item.dataset.gallerySrc || "";
    image.alt = item.dataset.galleryAlt || "";

    if (title) {
      title.textContent = item.dataset.galleryTitle || "";
    }

    if (description) {
      description.textContent = item.dataset.galleryDescription || "";
    }

    feature.classList.add("is-open");
  }

  function openFeature(item) {
    showFeature(items.indexOf(item));
  }

  function closeFeature() {
    feature.classList.remove("is-open");
  }

  items.forEach((item) => {
    item.addEventListener("click", () => {
      openFeature(item);
    });
  });

  if (close) {
    close.addEventListener("click", closeFeature);
  }

  if (previous) {
    previous.addEventListener("click", () => {
      showFeature(currentIndex - 1);
    });
  }

  if (next) {
    next.addEventListener("click", () => {
      showFeature(currentIndex + 1);
    });
  }

  feature.addEventListener("click", (event) => {
    if (event.target === feature) {
      closeFeature();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeFeature();
    }

    if (!feature.classList.contains("is-open")) {
      return;
    }

    if (event.key === "ArrowLeft") {
      showFeature(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showFeature(currentIndex + 1);
    }
  });
});
