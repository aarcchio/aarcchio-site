(function () {
  const isSubpage = window.location.pathname.includes("-sublinks/");
  const homeHref = isSubpage ? "../index.html" : "index.html";
  const title = document.querySelector(".top-right-title");

  if (title && title.tagName.toLowerCase() !== "a" && !title.querySelector("a")) {
    const link = document.createElement("a");
    link.href = homeHref;
    link.textContent = title.textContent.trim();
    title.textContent = "";
    title.appendChild(link);
  }

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest(".sidebar-toggle");
    const sidebarLink = event.target.closest(".sidebar a");

    if (toggle) {
      const isOpen = document.body.classList.toggle("sidebar-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      return;
    }

    if (sidebarLink) {
      document.body.classList.remove("sidebar-open");
      document.querySelector(".sidebar-toggle")?.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    document.body.classList.remove("sidebar-open");
    document.querySelector(".sidebar-toggle")?.setAttribute("aria-expanded", "false");
  });
})();
