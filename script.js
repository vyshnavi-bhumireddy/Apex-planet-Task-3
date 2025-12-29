// ================= IMAGE CAROUSEL WITH AUTO SLIDE + DOTS =================

let images = [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=800",
    "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=800"
];

let index = 0;
let img = document.getElementById("carouselImg");
let dotsContainer = document.getElementById("dots");
let interval;

if (img && dotsContainer) {
    img.classList.add("fade", "show");
    createDots();
    startAutoSlide();
}

function createDots() {
    dotsContainer.innerHTML = "";
    images.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = "dot" + (i === index ? " active" : "");
        dot.onclick = () => {
            index = i;
            showImage();
            resetAutoSlide();
        };
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    document.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

function showImage() {
    if (!img) return;
    img.classList.remove("show");
    setTimeout(() => {
        img.src = images[index];
        img.classList.add("show");
        updateDots();
    }, 300);
}

function nextImage() {
    index = (index + 1) % images.length;
    showImage();
    resetAutoSlide();
}

function prevImage() {
    index = (index - 1 + images.length) % images.length;
    showImage();
    resetAutoSlide();
}

function startAutoSlide() {
    interval = setInterval(() => {
        index = (index + 1) % images.length;
        showImage();
    }, 3000);
}

function resetAutoSlide() {
    clearInterval(interval);
    startAutoSlide();
}

// ================= API FETCH (ENHANCED UX) =================

function getJoke() {
    const jokeEl = document.getElementById("joke");
    const btn = document.querySelector("button");

    if (!jokeEl || !btn) return;

    // Loading state
    jokeEl.textContent = "Loading joke...";
    jokeEl.classList.remove("show");
    btn.disabled = true;
    btn.style.opacity = "0.6";

    fetch("https://official-joke-api.appspot.com/random_joke")
        .then(res => res.json())
        .then(data => {
            jokeEl.textContent = `${data.setup} 😂 ${data.punchline}`;
            jokeEl.classList.add("show");
        })
        .catch(() => {
            jokeEl.textContent = "Oops! Could not fetch joke 😢";
        })
        .finally(() => {
            btn.disabled = false;
            btn.style.opacity = "1";
        });
}
