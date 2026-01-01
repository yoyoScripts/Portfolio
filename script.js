const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// Toast Notification Logic
const toast = $("#toast");
let toastTimer;

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
};

// Clipboard Logic
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy", err);
    showToast("Failed to copy");
  }
};

// Bind Copy Buttons
const bindCopy = (selector) => {
  const el = $(selector);
  if (el) {
    el.addEventListener("click", () => {
      const text = el.getAttribute("data-copy");
      copyToClipboard(text);
    });
  }
};

bindCopy("#copyEmail");
bindCopy("#copyEmail2");
bindCopy("#copyDiscord");

// Smooth Scrolling
$("#scrollCta")?.addEventListener("click", () => {
  $("#work").scrollIntoView({ behavior: "smooth" });
});

// Dynamic Year
$("#year").textContent = new Date().getFullYear();

// Simple Reveal Animation on Scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, { threshold: 0.1 });

// Add fade class to major sections
$$("section").forEach((sec) => {
  sec.style.opacity = "0";
  sec.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  sec.style.transform = "translateY(20px)";
  observer.observe(sec);
});

// Animation Class Logic
document.addEventListener("scroll", () => {
  $$("section").forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100) {
      sec.style.opacity = "1";
      sec.style.transform = "translateY(0)";
    }
  });
});
