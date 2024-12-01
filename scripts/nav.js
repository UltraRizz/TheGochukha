let lastScrollPosition = 0; // Keeps track of the last scroll position

document.addEventListener("scroll", () => {
  const heroSection = document.querySelector(".hero"); // Hero section
  const stickyNav = document.querySelector(".sticky-nav"); // Sticky navigation
  const primaryNav = document.querySelector(".primary-nav"); // Primary navigation

  // Calculate the bottom of the hero section
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  const scrollPosition = window.scrollY;

  // Determine scroll direction
  const scrollingDown = scrollPosition > lastScrollPosition;

  // Hide primary navigation while scrolling down
  if (scrollingDown && scrollPosition < heroBottom) {
    primaryNav.style.transform = "translateY(-100%)"; // Slide out the primary nav
  } else {
    primaryNav.style.transform = "translateY(0)"; // Slide in the primary nav
  }

  // Show sticky navigation when scrolling past the hero section
  if (scrollPosition > heroBottom) {
    stickyNav.classList.add("visible"); // Show sticky-nav
    stickyNav.style.backgroundColor = "#3C3C3C"; // Set background color
    primaryNav.style.backgroundColor = "#3C3C3C"; // Keep the primary-nav background if visible
  } else {
    stickyNav.classList.remove("visible"); // Hide sticky-nav
    stickyNav.style.backgroundColor = "transparent"; // Reset sticky-nav background
    primaryNav.style.backgroundColor = "transparent"; // Reset primary-nav background
  }

  // Update the last scroll position
  lastScrollPosition = scrollPosition;
});

const hiddenNav = document.getElementById("hiddenNav");
const openButton = document.querySelector(".menu");
const closeButton = document.getElementById("closeButton");

// Function to open the nav
openButton.addEventListener("click", () => {
  hiddenNav.style.display = "block";
  setTimeout(() => {
    hiddenNav.classList.add("visible");
  }, 20);
});

// Function to close the nav
const closeNav = () => {
  hiddenNav.classList.add("closing");
  setTimeout(() => {
    hiddenNav.classList.remove("visible", "closing");
    hiddenNav.style.display = "none";
  }, 600); // Match the animation duration
};

// Close when the close button is clicked
closeButton.addEventListener("click", closeNav);

// Close when clicking outside the nav
document.addEventListener("click", (event) => {
  if (!hiddenNav.contains(event.target) && !openButton.contains(event.target)) {
    if (hiddenNav.classList.contains("visible")) {
      closeNav();
    }
  }
});
