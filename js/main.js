document.addEventListener("DOMContentLoaded", () => {
  // 로딩 및 초기 연출
  const loader = document.getElementById("loading-screen");
  const wrapper = document.querySelector(".wrapper");
  const logo = document.querySelector(".logo");

  setTimeout(() => {
    if (loader) {
      loader.style.opacity = "0";
      loader.style.transform = "translateY(-50px)";
    }
    if (wrapper) wrapper.classList.add("visible");
    setTimeout(() => {
      if (logo) logo.classList.add("visible");
    }, 1000);
    setTimeout(() => {
      if (loader) loader.style.display = "none";
    }, 1000);
  }, 1500);

  // 퀵 메뉴 (모바일)
  const quickBtn = document.querySelector(".quick_btn");
  const quickBtnImg = document.querySelector(".quick_btn img");
  const quickMenu = document.querySelector(".quick_menu_nav");
  const dim = document.querySelector(".dim");
  const navLinks = document.querySelectorAll(".nav_link");

  function toggleMenu(isOpen) {
    if (!quickMenu || !dim) return;
    quickMenu.classList.toggle("visible", isOpen);
    dim.classList.toggle("visible", isOpen);

    if (isOpen) {
      quickBtnImg?.setAttribute("src", "icon/ico_close.svg");
      quickBtnImg?.setAttribute("alt", "메뉴 닫기");
    } else {
      quickBtnImg?.setAttribute("src", "icon/ico_menu.svg");
      quickBtnImg?.setAttribute("alt", "전체 메뉴");
    }
  }

  // 메뉴 링크 클릭 시 메뉴 닫기
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 850) {
        toggleMenu(false);
      }
    });
  });

  quickBtn?.addEventListener("click", () => {
    if (window.innerWidth <= 850) {
      toggleMenu(!quickMenu.classList.contains("visible"));
    }
  });

  dim?.addEventListener("click", () => {
    if (window.innerWidth <= 850) toggleMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
      if (quickMenu?.classList.contains("visible")) {
        toggleMenu(false);
      }
    }
  });

  // Skills 그래프 관찰자
  const skillSection = document.querySelector(".skills_section");
  const progressBars = document.querySelectorAll(".graph_bar");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          progressBars.forEach((bar) => bar.classList.add("visible"));
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  if (skillSection) skillObserver.observe(skillSection);

  // .intro_section pocket animation
  const introSection = document.querySelector(".intro_section");

  const introObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          introObserver.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -50% 0px",
      threshold: 0,
    },
  );

  if (introSection) introObserver.observe(introSection);

  const select = document.querySelector(".custom_select");

  if (select) {
    const trigger = select.querySelector(".select_trigger");
    const list = select.querySelector(".option_list");
    const options = select.querySelectorAll(".option_item");
    const selectedText = select.querySelector(".selected_value");
    const triggerImg = trigger?.querySelector(".arrow_icon");

    function updateList() {
      options.forEach((opt) => {
        if (opt.textContent.trim() === selectedText?.textContent.trim()) {
          opt.classList.add("hidden");
        } else {
          opt.classList.remove("hidden");
        }
      });
    }

    function toggleSelect(isOpen) {
      list?.classList.toggle("active", isOpen);
      triggerImg?.setAttribute(
        "src",
        isOpen ? "icon/ico_arrow_open.svg" : "icon/ico_arrow_close.svg",
      );
    }

    trigger?.addEventListener("click", () =>
      toggleSelect(!list?.classList.contains("active")),
    );

    options.forEach((opt) => {
      opt.addEventListener("click", () => {
        if (selectedText) selectedText.textContent = opt.textContent;
        toggleSelect(false);
        updateList();
      });
    });

    window.addEventListener("click", (e) => {
      if (!select.contains(e.target)) toggleSelect(false);
    });

    updateList();
  }

  // Swiper
  if (document.querySelector(".mySwiper")) {
    new Swiper(".mySwiper", {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 800,
      loop: true,
      spaceBetween: 30,
      centeredSlides: true,
      mousewheel: {
        invert: false,
      },
      breakpoints: {
        601: { slidesPerView: 1.5 },
        1280: { slidesPerView: 2.5 },
        1920: { slidesPerView: 3.5 },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  // 상하단 이동 버튼
  const scrollBtn = document.getElementById("scrollToTop");
  const scrollIcon = document.getElementById("scrollIcon");
  let scrollTimer;

  function updateScrollIcon(direction) {
    if (!scrollIcon || !scrollIcon.parentElement) return;

    const arrowWrapper = scrollIcon.parentElement;

    if (direction === "up") {
      scrollIcon.src = "icon/ico_arrow_top.svg";
      scrollBtn.title = "최상단 이동";
      arrowWrapper.style.top = "49%";
    } else {
      scrollIcon.src = "icon/ico_arrow_bottom.svg";
      scrollBtn.title = "최하단 이동";
      arrowWrapper.style.top = "54%";
    }
  }

  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    if (!scrollBtn || !scrollIcon) return;

    scrollBtn.style.display = "block";
    scrollBtn.style.opacity = "1";

    clearTimeout(scrollTimer);

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    const isAtBottom = scrollTop + windowHeight >= fullHeight - 5;
    const isAtTop = scrollTop <= 5;

    if (isAtBottom) {
      updateScrollIcon("up");
    } else if (isAtTop) {
      updateScrollIcon("bottom");
    } else {
      if (scrollTop > lastScrollTop) {
        updateScrollIcon("bottom");
      } else {
        updateScrollIcon("up");
      }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    scrollTimer = setTimeout(() => {
      scrollBtn.style.opacity = "0";
      setTimeout(() => {
        scrollBtn.style.display = "none";
      }, 200);
    }, 2000);
  });

  scrollBtn?.addEventListener("click", () => {
    const isBottomDirection = scrollIcon?.src.includes("ico_arrow_bottom");

    if (isBottomDirection) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
      setTimeout(() => updateScrollIcon("up"), 500);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => updateScrollIcon("bottom"), 500);
    }
  });
});
