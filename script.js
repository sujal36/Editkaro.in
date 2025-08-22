// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Filter functionality
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    portfolioItems.forEach(item => {
      if (filterValue === "all" || item.dataset.category === filterValue) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, 100);
      } else {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        setTimeout(() => { item.style.display = "none"; }, 300);
      }
    });
  });
});

// Lightbox functionality
const lightbox = document.getElementById("lightbox");
const lightboxVideo = document.getElementById("lightbox-video");
const closeBtn = document.querySelector(".close-btn");

portfolioItems.forEach(item => {
  item.addEventListener("click", () => {
    const videoSource = item.querySelector("video source");
    if (videoSource && videoSource.src !== "#") {
      lightboxVideo.querySelector("source").src = videoSource.src;
      lightboxVideo.load();
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxVideo.pause();
  document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});

// Scroll animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  header.style.background = window.scrollY > 100
    ? "rgba(10, 10, 10, 0.98)"
    : "rgba(10, 10, 10, 0.95)";
});

// ===== Counter animation function (reusable) =====
function animateCounters(selector) {
  document.querySelectorAll(`${selector} h3`).forEach(counter => {
    const target = parseInt(counter.textContent.replace(/[^\d]/g, ""));
    const suffix = counter.textContent.replace(/[\d]/g, "");
    let current = 0;
    const increment = target / 100;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    };
    updateCounter();
  });
}

// Trigger counters when sections are visible
function observeStats(sectionSelector) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters(sectionSelector);
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  sectionObserver.observe(section);
}

// Run for hero stats and bottom stats
observeStats(".hero-stats");
observeStats(".stats");

// Portfolio hover animation
portfolioItems.forEach(item => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "translateY(-10px) scale(1.02)";
  });
  item.addEventListener("mouseleave", () => {
    item.style.transform = "translateY(0) scale(1)";
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.transform = `translateY(${window.pageYOffset * -0.5}px)`;
  }
});

// Loading animation + Hero fade-in stagger effect
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  document.querySelectorAll(".hero .fade-in").forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("visible");
    }, index * 250); // stagger delay
  });
});



document.addEventListener("DOMContentLoaded", function () {
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    const loadMoreBtn = document.getElementById("load-more");
    const filterBtns = document.querySelectorAll(".filter-btn");

    // Pehle last ke 3 hide karo
    const hiddenItems = Array.from(portfolioItems).slice(-3);
    hiddenItems.forEach(item => item.classList.add("hidden"));

    // Load More pe click hote hi show karo
    loadMoreBtn.addEventListener("click", function () {
        hiddenItems.forEach(item => item.classList.remove("hidden"));
        loadMoreBtn.style.display = "none"; // button hide kar dena
    });

    // Filter button pe click hote hi sare show karo
    filterBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            hiddenItems.forEach(item => item.classList.remove("hidden"));
            loadMoreBtn.style.display = "none";
        });
    });
});





