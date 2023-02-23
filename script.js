let slideIndex = 1;
let slides = document.getElementsByClassName("slide");
let videoObservers = [];

showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    // Pause the video that is not being shown
    slides[i].pause();
  }
  // Show the current slide
  slides[slideIndex - 1].style.display = "block";

  // Start playing the video when it becomes visible
  if (videoObservers[slideIndex - 1]) {
    videoObservers[slideIndex - 1].unobserve(slides[slideIndex - 1]);
  }
  videoObservers[slideIndex - 1] = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        entries[0].target.play();
      } else {
        entries[0].target.pause();
      }
    },
    { threshold: 0.5 }
  );
  videoObservers[slideIndex - 1].observe(slides[slideIndex - 1]);
}

document.addEventListener("keydown", function (e) {
  if (e.code === "ArrowLeft") {
    showSlides((slideIndex -= 1));
  } else if (e.code === "ArrowRight") {
    showSlides((slideIndex += 1));
  }
});
