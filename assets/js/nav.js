document.addEventListener("scroll", () => {
  const heroSection = document.querySelector(".hero"); // Hero section
  const stickyNav = document.querySelector(".sticky-nav"); // Sticky navigation
  const primaryNav = document.querySelector(".primary-nav"); // Primary navigation

  // Calculate the bottom of the hero section
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  const scrollPosition = window.scrollY;

  // Show sticky navigation when the user scrolls past the hero section
  if (scrollPosition > heroBottom) {
    stickyNav.classList.add("visible"); // Show sticky-nav
    stickyNav.style.backgroundColor = "#3C3C3C";
    primaryNav.style.backgroundColor = "#3C3C3C";
  } else {
    stickyNav.classList.remove("visible"); // Hide sticky-nav
    stickyNav.style.backgroundColor = "transparent";
    primaryNav.style.backgroundColor = "transparent";
  }
});
