// ─── Burger Menu ───
const burgerBtn = document.getElementById('burgerBtn');
const mobileNav = document.getElementById('mobileNav');

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('open');
    mobileNav.classList.toggle('open');
});

function closeMobile() {
    burgerBtn.classList.remove('open');
    mobileNav.classList.remove('open');
}

// Close on outside click
document.addEventListener('click', (e) => {
    if (!burgerBtn.contains(e.target) && !mobileNav.contains(e.target)) {
    closeMobile();
    }
});

// ─── Header Scroll Effect ───
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
});

// ─── Slideshow ───
const track = document.getElementById('slideshowTrack');
const dots = document.querySelectorAll('.dot');
const pauseBtn = document.getElementById('pauseBtn')
let currentIdx = 0;
let cardsPerView = 3;
let totalCards = 5;
let maxIdx = 0;
let autoInterval;

function getCardsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 1.1;
    return 3;
}

function updateMaxIdx() {
    cardsPerView = getCardsPerView();
    maxIdx = Math.max(0, Math.ceil(totalCards - Math.floor(cardsPerView)));
    dots.forEach((dot, i) => {
    dot.style.display = i <= maxIdx ? 'block' : 'none';
    });
}

function goToSlide(idx) {
    currentIdx = Math.max(0, Math.min(idx, maxIdx));
    const cardWidth = track.children[0].getBoundingClientRect().width + 28;
    track.style.transform = `translateX(-${currentIdx * cardWidth}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
}

document.getElementById('prevBtn').addEventListener('click', () => {
    goToSlide(currentIdx - 1);
    restartAuto();
});
document.getElementById('nextBtn').addEventListener('click', () => {
    goToSlide(currentIdx + 1 > maxIdx ? 0 : currentIdx + 1);
    restartAuto();
});
pauseBtn.addEventListener('click', function() {
    if (this.classList.contains('pause')) {
        this.classList.remove('pause');
        this.classList.add('play');
        stopAuto();
    } else {
        this.classList.remove('play');
        this.classList.add('pause');
        restartAuto();
    }
});
dots.forEach(dot => {
    dot.addEventListener('click', () => {
    goToSlide(parseInt(dot.dataset.index));
    restartAuto();
    });
});

function startAuto() {
    autoInterval = setInterval(() => {
    goToSlide(currentIdx + 1 > maxIdx ? 0 : currentIdx + 1);
    }, 4200);
}
function restartAuto() {
    clearInterval(autoInterval);
    if(pauseBtn.classList.contains('pause')) startAuto();
}
function stopAuto() {
    clearInterval(autoInterval);
}

updateMaxIdx();
startAuto();
window.addEventListener('resize', () => { updateMaxIdx(); goToSlide(0); });

// ─── Scroll Reveal ───
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));