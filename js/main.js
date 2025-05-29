
document.addEventListener("DOMContentLoaded", function () {
  // page loader
  window.addEventListener("load", function () {
    document.querySelector(".js-page-loader").classList.add("fade-out");
    setTimeout(() => {
      this.document.querySelector(".js-page-loader").style.display = "none";
    }, 600);
  });

  // testimonial Slider

  function testimonialSlider() {
    const carouselOne = document.getElementById("carouselOne");
    if (carouselOne) {
      carouselOne.addEventListener("slid.bs.carousel", function () {
        const activeItem = this.querySelector(".active");

        document.querySelector(".js-testimonial-img").src =
          activeItem.getAttribute("data-js-testimonial-img");
      });
    }
  }
  testimonialSlider();

  // Style Switcher
  function styleSwitcherToggle() {
    const styleSwitcher = document.querySelector(".js-style-switcher");
    const styleSwitchToggler = document.querySelector(
      ".js-style-switcher-toggler"
    );
    if (styleSwitchToggler && styleSwitcher) {
      styleSwitchToggler.addEventListener("click", function () {
        styleSwitcher.classList.toggle("open");
      });
    }
  }
  styleSwitcherToggle();

  // video course-detail
  const video = document.getElementById("myVideo");
  const playIcon = document.getElementsByClassName("play-icon")[0];

  if (playIcon && video) {
    playIcon.addEventListener("click", function () {
      if (video.paused) {
        video.play();
        playIcon.style.display = "none";
      }
    });

    video.addEventListener("click", function () {
      if (video.paused) {
        video.play();
        playIcon.style.display = "none";
      } else {
        video.pause();
        playIcon.style.display = "flex";
      }
    });

    video.addEventListener("ended", function () {
      playIcon.style.display = "flex";
    });
  }

  function themeColors() {
    const colorStyle = document.querySelector(".js-color-style");
    const themeColorsContainer = document.querySelector(".js-theme-colors");

    if (colorStyle && themeColorsContainer) {
      themeColorsContainer.addEventListener("click", ({ target }) => {
        localStorage.setItem(
          "colors",
          target.getAttribute("data-js-theme-color")
        );
        setColor();
      });
      function setColor() {
        let path = colorStyle.getAttribute("href").split("/");
        path = path.slice(0, path.length - 1);
        colorStyle.setAttribute(
          "href",
          path.join("/") + "/" + localStorage.getItem("colors") + ".css"
        );
      }

      if (localStorage.getItem("colors") !== null) {
        setColor();
      } else {
        const defaultColor = colorStyle
          .getAttribute("href")
          .split("/")
          .pop()
          .split(".")
          .shift();
        document
          .querySelector("[data-js-theme-color=" + defaultColor + "]")
          .classList.add("active");
      }
    }
  }
  themeColors();

  // Light and Dark Mode

  function themeLightDark() {
    const darkModeCheckBox = document.querySelector(".js-dark-mode");

    darkModeCheckBox.addEventListener("click", function () {
      if (this.checked) {
        localStorage.setItem("theme-dark", "true");
      } else {
        localStorage.setItem("theme-dark", "false");
      }
      themeMode();
    });

    function themeMode() {
      if (localStorage.getItem("theme-dark") === "false") {
        document.body.classList.remove("t-dark");
      } else {
        document.body.classList.add("t-dark");
      }
    }
    if (localStorage.getItem("theme-dark") !== null) {
      themeMode();
    }
    if (document.body.classList.contains("t-dark")) {
      darkModeCheckBox.checked = true;
    }
  }
  themeLightDark();

  // header menu

  function headerMenu() {
    const menu = document.querySelector(".js-header-menu"),
      backdrop = document.querySelector(".js-header-backdrop"),
      menuCollapseBreakpoint = 991;

    function toggleMenu() {
      menu.classList.toggle("open");
      backdrop.classList.toggle("active");
      document.body.classList.toggle("overflow-hidden");
    }

    document.querySelectorAll(".js-header-menu-toggler").forEach((item) => {
      item.addEventListener("click", toggleMenu);
    });
    //  closing the menu by clicking outside of it
    backdrop.addEventListener("click", toggleMenu);

    function collapse() {
      menu.querySelector(".active .js-sub-menu").removeAttribute("style");
      menu.querySelector(".active").classList.remove("active");
    }

    menu.addEventListener("click", (event) => {
      const { target } = event;

      if (
        target.classList.contains("js-toggle-sub-menu") &&
        window.innerWidth <= menuCollapseBreakpoint
      ) {
        // prevent default anchor click behavior
        event.preventDefault();
        // if menu-item already expanded, collapse it and exit
        if (target.parentElement.classList.contains("active")) {
          collapse();
          return;
        }

        // collapse the other expanded menu-item if exists
        if (menu.querySelector(".active")) {
          collapse();
        }

        //  expand new-item
        target.parentElement.classList.add("active");
        target.nextElementSibling.style.maxHeight =
          target.nextElementSibling.scrollHeight + "px";
      }
    });
  }
  headerMenu();
});
