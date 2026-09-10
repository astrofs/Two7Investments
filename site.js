(function () {
  var viewport = document.querySelector(".logo-viewport");
  if (viewport && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var inView = false;
    function pauseMarquee() {
      viewport.classList.toggle("is-paused", document.hidden || !inView);
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        pauseMarquee();
      }, { rootMargin: "80px 0px" });
      io.observe(viewport);
    } else {
      inView = true;
    }
    document.addEventListener("visibilitychange", pauseMarquee);
    pauseMarquee();
  }

  var toggle = document.querySelector("[data-nav-toggle]");
  var menu = document.querySelector("[data-mobile-menu]");
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }

  toggle.addEventListener("click", function () {
    setOpen(!menu.classList.contains("is-open"));
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 860) setOpen(false);
  });
})();
