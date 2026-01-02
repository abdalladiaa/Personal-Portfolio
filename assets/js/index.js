var sections = document.querySelectorAll("section");
var navLinks = document.querySelectorAll("nav a");
var sideBar = document.getElementById("settings-sidebar");
var settingToggle = document.getElementById("settings-toggle");
var fontsBtn = document.querySelectorAll(".my-fonts button");
var body = document.querySelector("body");
var modeToggle = document.getElementById("mode-toggle-button");
var html = document.querySelector("html");
var colorBtn = document.querySelectorAll("#theme-colors-grid button");
var scrollToTopBtn = document.getElementById("scroll-to-top");
var filters = document.querySelectorAll(".portfolio-filter");
var portfolioItems = document.querySelectorAll(".portfolio-item");
var testimonialCards = document.querySelectorAll(".testimonial-card");
var nextBtn = document.getElementById("next-testimonial");
var prevBtn = document.getElementById("prev-testimonial");
var indicator = document.querySelectorAll(".carousel-indicator");
// !================================ ScrollSpy ==========================================

window.addEventListener("scroll", scrollSpy);

function scrollSpy() {
  var targetSection = "";

  for (var i = 0; i < sections.length; i++) {
    if (window.scrollY >= sections[i].offsetTop - 100) {
      targetSection = sections[i].getAttribute("id");
    }
  }

  for (var i = 0; i < navLinks.length; i++) {
    if (navLinks[i].getAttribute("href") === `#${targetSection}`) {
      navLinks[i].classList.add("active");
    } else {
      navLinks[i].classList.remove("active");
    }
  }
}
scrollSpy();

// !================================ SideBar ==========================================
// ~ open sideBar

settingToggle.addEventListener("click", function () {
  sideBar.classList.remove("translate-x-full");
  this.style.right = "20rem";
});

// ~ Close sideBar

document
  .getElementById("close-settings")
  .addEventListener("click", function () {
    sideBar.classList.add("translate-x-full");
    settingToggle.style.right = "0";
  });
document.addEventListener("click", function (e) {
  if (!sideBar.classList.contains("translate-x-full")) {
    if (!sideBar.contains(e.target) && !settingToggle.contains(e.target)) {
      sideBar.classList.add("translate-x-full");
      settingToggle.style.right = "0";
    }
  }
});

// !================================ Toggle fonts ==========================================

// ~ check if local storage contains font or not
if (localStorage.getItem("font")) {
  body.classList.remove("font-cairo", "font-alexandria", "font-tajawal");
  body.classList.add(`font-${localStorage.getItem("font")}`);
} else {
  localStorage.setItem("font", "tajawal");
  body.classList.add("font-tajawal");
}

fontsBtn.forEach(function (btn) {
  fontsBtn.forEach(function (btn) {
    if (btn.dataset.font === localStorage.getItem("font")) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  btn.addEventListener("click", function () {
    fontsBtn.forEach(function (b) {
      b.classList.remove("active");
    });

    btn.classList.add("active");

    body.classList.remove("font-cairo", "font-tajawal", "font-alexandria");
    body.classList.add(`font-${btn.dataset.font}`);
    localStorage.setItem("font", btn.dataset.font);
  });
});

// !================================ MODE ==========================================

// ~ cleck if local storage contains mode or not
if (localStorage.getItem("mode")) {
  if (localStorage.getItem("mode") == "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
} else {
  localStorage.setItem("mode", "dark");
}

modeToggle.addEventListener("click", function () {
  html.classList.toggle("dark");

  if (html.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
});

// !================================ THEME ==========================================

colorBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var primary = btn.dataset.primary;
    var secondary = btn.dataset.secondary;
    document.documentElement.style.setProperty("--color-primary", primary);
    document.documentElement.style.setProperty("--color-secondary", secondary);
    localStorage.setItem("primary", primary);
    localStorage.setItem("secondary", secondary);
    colorBtn.forEach(function (e) {
      e.classList.remove(
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900"
      );
    });
    btn.classList.add(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900"
    );
  });
});

var savedPrimary = localStorage.getItem("primary");
var savedSecondary = localStorage.getItem("secondary");

if (savedPrimary && savedSecondary) {
  document.documentElement.style.setProperty("--color-primary", savedPrimary);
  document.documentElement.style.setProperty(
    "--color-secondary",
    savedSecondary
  );

  colorBtn.forEach(function (btn) {
    if (btn.dataset.primary === savedPrimary) {
      btn.classList.add(
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900"
      );
    }
  });
}

// !================================ scrollToTopBtn ==========================================

scrollToTopBtn.addEventListener("click", function () {
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", function () {
  if (window.scrollY > sections[0].offsetTop) {
    scrollToTopBtn.classList.remove("opacity-0", "invisible");
  } else {
    scrollToTopBtn.classList.add("opacity-0", "invisible");
  }
});

// !================================ portfolio filter ==========================================

filters.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var filter = btn.dataset.filter;
    portfolioItems.forEach(function (item) {
      var category = item.dataset.category;
      item.style.display = "none";
      if (filter == "all" || category == filter) {
        item.style.display = "block";
      }
    });
    filters.forEach(function (e) {
      e.classList.remove(
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
        "hover:shadow-lg",
        "hover:shadow-primary/50"
      );
      e.classList.add(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300",
        "border",
        "border-slate-300",
        "dark:border-slate-700"
      );
    });
    btn.classList.remove(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "border",
      "border-slate-300",
      "dark:border-slate-700"
    );
    btn.classList.add(
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
      "hover:shadow-lg",
      "hover:shadow-primary/50"
    );
  });
});

// !================================ carusile ==========================================
function getVisableCards() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth < 1024) return 2;
  if (window.innerWidth < 640) return 1;
}

function updateIndicators() {
  indicator.forEach(function (btn) {
    if (btn.dataset.index == currentIndex) {
      btn.classList.add("bg-primary", "scale-125", "active");
      btn.classList.remove("bg-slate-400", "dark:bg-slate-600");
    } else {
      btn.classList.remove("bg-primary", "scale-125", "active");
      btn.classList.add("bg-slate-400", "dark:bg-slate-600");
    }
  });
}

var currentIndex = 0;
var visableCards = getVisableCards();
var maxIndex = testimonialCards.length - visableCards;

function slideCards() {
  testimonialCards[currentIndex].scrollIntoView({
    behavior: "smooth",
    inline: "start",
  });
  updateIndicators();
}

nextBtn.addEventListener("click", function () {
  currentIndex++;
  if (currentIndex > maxIndex) {
    currentIndex = 0;
  }
  slideCards();
  console.log(currentIndex);
});
prevBtn.addEventListener("click", function () {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = maxIndex;
  }
  slideCards();
  console.log(currentIndex);
});

indicator.forEach(function (btn) {
  btn.addEventListener("click", function () {
    currentIndex = btn.dataset.index;
    slideCards();
  });
});
console.log(testimonialCards.length);
