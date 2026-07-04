document.querySelectorAll("[data-scroll-reel]").forEach((reel) => {
  const windowElement = reel.querySelector("[data-scroll-reel-window]");
  const track = reel.querySelector("[data-scroll-reel-track]");

  if (!windowElement || !track) {
    return;
  }

  const originalImages = Array.from(track.children);

  if (originalImages.length === 0) {
    return;
  }

  originalImages.forEach((image) => {
    track.appendChild(image.cloneNode(true));
  });

  function setWindowHeight() {
    const firstImage = originalImages[0];
    const reelStyles = getComputedStyle(reel);
    const cropTop = Number.parseFloat(reelStyles.getPropertyValue("--scroll-crop-top")) || 0;
    const cropBottom = Number.parseFloat(reelStyles.getPropertyValue("--scroll-crop-bottom")) || 0;

    if (firstImage.complete) {
      windowElement.style.height = `${firstImage.getBoundingClientRect().height - cropTop - cropBottom}px`;
      return;
    }

    firstImage.addEventListener(
      "load",
      () => {
        windowElement.style.height = `${firstImage.getBoundingClientRect().height - cropTop - cropBottom}px`;
      },
      { once: true },
    );
  }

  setWindowHeight();
  window.addEventListener("resize", setWindowHeight);
});
