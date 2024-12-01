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

document.addEventListener("DOMContentLoaded", function () {
  const progressCircle = document.querySelector(".progress-circle .progress");
  const radius = progressCircle.getAttribute("r"); // Get the radius from the SVG element
  const circleLength = 2 * Math.PI * radius; // Calculate circumference dynamically
  const scrollProgressContainer = document.querySelector(".scroll-progress");

  // Set initial stroke properties for the circle
  progressCircle.style.strokeDasharray = circleLength; // Circumference
  progressCircle.style.strokeDashoffset = circleLength; // Start at 100% hidden

  // Set initial visibility of the scroll progress container
  scrollProgressContainer.style.opacity = "0"; // Hidden initially
  scrollProgressContainer.style.transition = "opacity 0.3s"; // Smooth transition for visibility

  // Function to update progress
  const updateProgress = () => {
    const scrollTop = window.scrollY; // Current scroll position
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight; // Total scrollable height
    const progress = scrollTop / docHeight; // Progress as a percentage

    // Update progress values for the circle
    const circleOffset = circleLength - progress * circleLength;
    progressCircle.style.strokeDashoffset = circleOffset;

    // Show the progress circle and arrow after a certain scroll length (e.g., 200px)
    if (scrollTop > 500) {
      scrollProgressContainer.style.opacity = "1"; // Show when scroll is greater than 200px
    } else {
      scrollProgressContainer.style.opacity = "0"; // Hide when scroll is less than 200px
    }
  };

  // Scroll to top on click
  scrollProgressContainer.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Update progress on scroll
  window.addEventListener("scroll", updateProgress);
});
