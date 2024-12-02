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

document
  .getElementById("bookingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Clear previous error or success messages
    document.getElementById("responseMessage").innerHTML = ""; // Use innerHTML to allow line breaks
    document.getElementById("responseMessage").style.color = "green";

    // Initial form validation
    let errors = [];

    // Validate Full Name
    const name = document.getElementById("name").value;
    if (!name.match(/^[A-Za-z\s]{3,20}$/)) {
      errors.push("Please enter a valid name (3-20 letters).");
    }

    // Validate Email
    const email = document.getElementById("email").value;
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zAZ0-9.-]{2,4}$/)) {
      errors.push("Please enter a valid email address.");
    }

    // Validate Phone Number (only check if it's not empty)
    const phone = document.getElementById("pnumber").value;
    if (phone.trim() === "") {
      errors.push("Please enter a phone number.");
    }

    // Validate Room Preference
    const room = document.getElementById("room-selection").value;
    if (room === "") {
      errors.push("Please select a room preference.");
    }

    // Validate Number of Guests
    const guests = document.getElementById("guest-number").value;
    if (guests < 1) {
      errors.push("Please enter a valid number of guests.");
    }

    // Validate Check-in and Check-out Dates
    const checkin = document.getElementById("checkin-date").value;
    const checkout = document.getElementById("checkout-date").value;
    if (!checkin || !checkout) {
      errors.push("Please select both check-in and check-out dates.");
    }

    // Validate Message (only check if it's not empty)
    const message = document.getElementById("message").value;
    if (message.trim() === "") {
      errors.push("Please enter a message.");
    }

    // If there are errors, display them
    if (errors.length > 0) {
      document.getElementById("responseMessage").innerHTML =
        errors.join("<br>");
      document.getElementById("responseMessage").style.color = "red"; // Show errors in red
      return; // Stop the form submission if validation fails
    }

    // Show "Sending..." message only after validation passes
    document.getElementById("responseMessage").textContent =
      "Sending your booking details... Please wait.";

    // Create FormData object to handle the form submission
    var formData = new FormData(this);

    // Perform AJAX request to submit the form
    fetch("mail.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Success message
          return response.text();
        } else {
          throw new Error("Form submission failed.");
        }
      })
      .then((data) => {
        document.getElementById("responseMessage").textContent =
          "Thank you! Your booking has been successfully submitted.";
        document.getElementById("responseMessage").style.color = "green";
      })
      .catch((error) => {
        document.getElementById("responseMessage").textContent =
          "Oops! Something went wrong, please try again.";
        document.getElementById("responseMessage").style.color = "red";
      });
  });
