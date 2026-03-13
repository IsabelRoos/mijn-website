// Hamburger & mobile menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  hamburger.classList.toggle("active");

  // Accessibility: update aria-expanded
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !expanded);
});

document.querySelectorAll(".submenu-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const submenu = button.nextElementSibling;
    submenu.classList.toggle("open");
  });
});

// -----------------------------------------------------------------------------
// Slider Function Factory (Infinite & Responsive with optional speed)
function setupInfiniteSlider(
  trackSelector,
  prevSelector,
  nextSelector,
  imageUrls,
  autoInterval = 4000,
  transitionDuration = 0.5,
) {
  const track = document.querySelector(trackSelector);
  const prevBtn = document.querySelector(prevSelector);
  const nextBtn = document.querySelector(nextSelector);

  if (!track || !prevBtn || !nextBtn) return;

  // Add original images
  imageUrls.forEach((url) => {
    const img = document.createElement("img");
    img.src = url;
    track.appendChild(img);
  });

  const totalImages = imageUrls.length;

  // Clone first few images to the end for seamless looping
  const cloneCount = Math.min(3, totalImages);
  for (let i = 0; i < cloneCount; i++) {
    const clone = track.children[i].cloneNode(true);
    track.appendChild(clone);
  }

  let index = 0;

  function getImageWidth() {
    const img = track.querySelector("img");
    return img ? img.getBoundingClientRect().width : 0;
  }

  function getVisibleImages() {
    const trackContainer = track.parentElement;
    const containerWidth = trackContainer.getBoundingClientRect().width;
    const imageWidth = getImageWidth();
    return imageWidth > 0 ? Math.floor(containerWidth / imageWidth) : 1;
  }

  function moveSlide(newIndex, smooth = true) {
    const visibleCount = getVisibleImages();
    const imageWidth = getImageWidth();

    track.style.transition = smooth
      ? `transform ${transitionDuration}s ease-in-out`
      : "none";
    track.style.transform = `translateX(${-newIndex * imageWidth}px)`;
    index = newIndex;

    // Reset position when reaching clones
    if (index >= totalImages) {
      setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = `translateX(0px)`;
        index = 0;
      }, transitionDuration * 1000);
    }
    if (index < 0) {
      setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = `translateX(${-totalImages * imageWidth}px)`;
        index = totalImages - 1;
      }, transitionDuration * 1000);
    }
  }

  // Auto-slide
  let autoSlide = setInterval(
    () => moveSlide(index + getVisibleImages()),
    autoInterval,
  );

  prevBtn.addEventListener("click", () => {
    moveSlide(index - getVisibleImages());
    clearInterval(autoSlide);
    autoSlide = setInterval(
      () => moveSlide(index + getVisibleImages()),
      autoInterval,
    );
  });

  nextBtn.addEventListener("click", () => {
    moveSlide(index + getVisibleImages());
    clearInterval(autoSlide);
    autoSlide = setInterval(
      () => moveSlide(index + getVisibleImages()),
      autoInterval,
    );
  });

  window.addEventListener("resize", () => moveSlide(index, false));
}

// -----------------------------------------------------------------------------
// Slider Main Page (Infinite & Responsive)
setupInfiniteSlider(".image-track", ".prev-btn", ".next-btn", [
  "images/shoot-ava/pentax67-10.jpg",
  "images/kim-majorel/kim-majorel-6.jpg",
  "images/honey-jars.jpg",
  "images/shoot-britt/britt-6.jpg",
  "images/port-grimaud.jpg",
  "images/shoot-britt/britt-23.jpg",
  "images/flowers-in-alley.jpg",
  "images/along-the-ocean.jpg",
  "images/jaime-mathilde/kama-13.jpg",
  "images/shoot-ava/pentax67-6.jpg",
  "images/honey-pile.jpg",
  "images/jaime-mathilde/kama-10.jpg",
  "images/cassis-beach.jpg",
  "images/kim-majorel/kim-majorel-5.jpg",
  "images/kyra-aylene/almar-9.jpg",
  "images/sparkling-calanque.jpg",
  "images/imperia-gallery.jpg",
  "images/parasol-stand.jpg",
]);

// -----------------------------------------------------------------------------
// Slider Studio Collective (Infinite & Responsive, slower)
setupInfiniteSlider(
  ".image-track-two",
  ".prev-btn-two",
  ".next-btn-two",
  Array.from(
    { length: 71 },
    (_, i) => `images/studio-collective-frames/studio-col-${i + 1}.jpg`,
  ),
  6000, // auto-slide interval in ms (slower)
  1.2, // transition duration in seconds (smoother)
);

// -----------------------------------------------------------------------------
// Slider Wedding Photography France (Infinite & Responsive, slower)

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const weddingImages = shuffleArray(
  Array.from(
    { length: 103 },
    (_, i) => `images/bruiloft-saint-tropez/wedding-s-t-${i + 1}.jpg`,
  ),
);

setupInfiniteSlider(
  ".image-track-three",
  ".prev-btn-three",
  ".next-btn-three",
  weddingImages,
  6000, // auto-slide interval
  1.2, // transition duration
);

// setupInfiniteSlider(
//   ".image-track-three",
//   ".prev-btn-three",
//   ".next-btn-three",
//   Array.from(
//     { length: 104 },
//     (_, i) => `images/bruiloft-saint-tropez/wedding-s-t-${i + 1}.jpg`
//   ),
//   6000, // auto-slide interval in ms (slower)
//   1.2 // transition duration in seconds (smoother)
// );
