document.querySelectorAll("[data-feature-picker]").forEach((picker) => {
  const image = picker.querySelector("[data-feature-image]");
  const caption = picker.querySelector("[data-feature-caption]");
  const title = picker.querySelector("[data-feature-title]");
  const body = picker.querySelector("[data-feature-body]");
  const thumbnails = Array.from(picker.querySelectorAll("[data-feature-thumb]"));

  if (!image || thumbnails.length === 0) {
    return;
  }

  function setActiveThumbnail(activeThumbnail) {
    thumbnails.forEach((thumbnail) => {
      thumbnail.classList.toggle("is-active", thumbnail === activeThumbnail);
    });
  }

  function showFeature(thumbnail) {
    image.src = thumbnail.dataset.featureSrc || "";
    image.alt = thumbnail.dataset.featureAlt || "";

    if (caption) {
      caption.textContent = thumbnail.dataset.featureCaption || "";
    }

    if (title) {
      title.textContent = thumbnail.dataset.featureTitle || "";
    }

    if (body) {
      body.textContent = thumbnail.dataset.featureText || "";
    }

    setActiveThumbnail(thumbnail);
  }

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      showFeature(thumbnail);
    });
  });

  showFeature(thumbnails[0]);
});
