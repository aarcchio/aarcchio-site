document.querySelectorAll("[data-project-compare]").forEach((compare) => {
  const frame = compare.querySelector("[data-compare-frame]");

  if (!frame) {
    return;
  }

  function setPosition(clientX) {
    const rect = frame.getBoundingClientRect();
    const rawPosition = ((clientX - rect.left) / rect.width) * 100;
    const position = Math.max(0, Math.min(100, rawPosition));

    frame.style.setProperty("--compare-position", `${position}%`);
  }

  let isDragging = false;

  frame.addEventListener("pointerdown", (event) => {
    isDragging = true;
    frame.setPointerCapture(event.pointerId);
    setPosition(event.clientX);
  });

  frame.addEventListener("pointermove", (event) => {
    if (!isDragging) {
      return;
    }

    setPosition(event.clientX);
  });

  frame.addEventListener("pointerup", (event) => {
    isDragging = false;
    frame.releasePointerCapture(event.pointerId);
  });

  frame.addEventListener("pointercancel", () => {
    isDragging = false;
  });
});
