const slider = document.querySelector(".slider");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;
const totalSlides = dots.length;
let interval;

// Function to update slider position
function updateSlider(index) {
  slider.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
  currentIndex = index;
}

// Function to handle automatic sliding
function startAutoSlide() {
  interval = setInterval(() => {
    const nextIndex = (currentIndex + 1) % totalSlides;
    updateSlider(nextIndex);
  }, 3000); // Adjust time (ms) for slide duration
}

// Event listener for navigation dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    clearInterval(interval); // Stop auto sliding when a dot is clicked
    updateSlider(index);
    startAutoSlide(); // Restart auto sliding
  });
});

// Initialize
updateSlider(0);
startAutoSlide();
