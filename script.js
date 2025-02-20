document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Select slider elements
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    // Only run slider if slides exist (Prevents errors on pages without the slider)
    if (slides.length > 0) {
        let currentSlide = 0;

        // Initialize first slide
        slides[0].classList.add('active');

        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        };

        // Event listeners for buttons (Check if buttons exist)
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
        }

        // Auto Slide
        setInterval(nextSlide, 5000);
    }

    // ✅ Navbar Scroll Effect (Runs on all pages)
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-links a");

    // Check localStorage for an active link and set it
    const activeLink = localStorage.getItem("activeLink");
    if (activeLink) {
        navLinks.forEach(link => link.classList.remove("active"));
        document.querySelector(`.nav-links a[href="${activeLink}"]`)?.classList.add("active");
    }

    // Add event listener to each link
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            // Remove "active" class from all links
            navLinks.forEach(nav => nav.classList.remove("active"));

            // Add "active" class to clicked link
            this.classList.add("active");

            // Save to localStorage
            localStorage.setItem("activeLink", this.getAttribute("href"));
        });
    });
});




//fetching footer in diffirent pages
document.addEventListener('DOMContentLoaded', () => {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-section').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});



document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".testimonial-track")
    const slides = Array.from(track.children)
    const nextButton = document.querySelector(".next")
    const prevButton = document.querySelector(".prev")
    let currentIndex = 0

    // Set slide width
    const slideWidth = slides[0].getBoundingClientRect().width
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + "px"
    })

    // Move slide
    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = "translateX(-" + targetSlide.style.left + ")"
        currentSlide.classList.remove("active")
        targetSlide.classList.add("active")
    }

    // Next button
    nextButton.addEventListener("click", (e) => {
        const currentSlide = track.querySelector(".active")
        let nextSlide = currentSlide.nextElementSibling
        if (!nextSlide) {
            nextSlide = slides[0]
        }
        moveToSlide(track, currentSlide, nextSlide)
        currentIndex = slides.indexOf(nextSlide)
    })

    // Previous button
    prevButton.addEventListener("click", (e) => {
        const currentSlide = track.querySelector(".active")
        let prevSlide = currentSlide.previousElementSibling
        if (!prevSlide) {
            prevSlide = slides[slides.length - 1]
        }
        moveToSlide(track, currentSlide, prevSlide)
        currentIndex = slides.indexOf(prevSlide)
    })

    // Auto slide
    function autoSlide() {
        currentIndex = (currentIndex + 1) % slides.length
        const currentSlide = track.querySelector(".active")
        const nextSlide = slides[currentIndex]
        moveToSlide(track, currentSlide, nextSlide)
    }

    // Set first slide as active
    slides[0].classList.add("active")

    // Start auto sliding
    let slideInterval = setInterval(autoSlide, 5000)

    // Pause auto sliding when hovering over the slider
    track.addEventListener("mouseenter", () => {
        clearInterval(slideInterval)
    })

    // Resume auto sliding when mouse leaves the slider
    track.addEventListener("mouseleave", () => {
        slideInterval = setInterval(autoSlide, 5000)
    })

    // Handle star ratings
    const starRatings = document.querySelectorAll(".star-rating")
    starRatings.forEach((rating) => {
        const stars = rating.querySelectorAll(".star")
        const ratingValue = Number.parseInt(rating.dataset.rating)

        stars.forEach((star, index) => {
            if (index >= ratingValue) {
                star.classList.add("inactive")
            }
        })
    })
})


// know_yourself
document.addEventListener('DOMContentLoaded', function () {
    const bmiForm = document.getElementById('bmiForm');
    const bmiResult = document.getElementById('bmiResult');
    const bmiValue = document.querySelector('.gym-bmi-value');
    const bmiMessage = document.querySelector('.gym-bmi-message');
    const resultCircle = document.querySelector('.gym-result-circle');

    bmiForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);

        // Convert height to meters
        const heightInMeters = height / 100;

        // Calculate BMI
        const bmi = weight / (heightInMeters * heightInMeters);

        // Display result
        bmiValue.textContent = bmi.toFixed(1);
        bmiResult.style.display = 'block';

        // Set message and color based on BMI
        let message;
        let color;

        if (bmi < 18.5) {
            message = "You are underweight";
            color = '#FFC107'; // Warning yellow
        } else if (bmi >= 18.5 && bmi < 25) {
            message = "You have a healthy weight";
            color = '#4CAF50'; // Success green
        } else if (bmi >= 25 && bmi < 30) {
            message = "You are overweight";
            color = '#FF9800'; // Warning orange
        } else {
            message = "You are obese";
            color = '#f44336'; // Danger red
        }

        bmiMessage.textContent = message;
        resultCircle.style.backgroundColor = color;

        // Smooth scroll to result
        bmiResult.scrollIntoView({ behavior: 'smooth' });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('gymContactForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log('Form submitted:', data);

        // Reset form
        form.reset();

        // Show success message
        alert('Message sent successfully!');
    });
});


let index = 0;
const container = document.querySelector(".trainers-container");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

nextBtn.addEventListener("click", () => {
    index = (index + 1) % 2;
    container.style.transform = `translateX(-${index * 100}%)`;
});

prevBtn.addEventListener("click", () => {
    index = (index - 1 + 2) % 2;
    container.style.transform = `translateX(-${index * 100}%)`;
});