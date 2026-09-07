// Hamburger toggle
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');

navToggle.addEventListener('click', ()=>{
  const open = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(href === '#') { e.preventDefault(); return; }
    const el = document.querySelector(href);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth',block:'start'});
      // close mobile nav after click
      if(siteNav.classList.contains('open')){
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded','false');
      }
    }
  })
});

// modal removed — details moved to separate pages

// Carousel for services
const track = document.querySelector('.cards-inner');
const slides = Array.from(document.querySelectorAll('.cards-inner .card'));
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let current = 0;

function updateCarousel(){
  const w = track.clientWidth;
  track.style.transform = `translateX(-${current * w}px)`;
  slides.forEach((s,i)=> s.setAttribute('aria-hidden', i===current ? 'false' : 'true'));
}

prevBtn.addEventListener('click', ()=>{ current = (current-1+slides.length)%slides.length; updateCarousel(); });
nextBtn.addEventListener('click', ()=>{ current = (current+1)%slides.length; updateCarousel(); });

// keyboard navigation for carousel
document.addEventListener('keydown', (e)=>{
  if(e.key === 'ArrowLeft') prevBtn.click();
  if(e.key === 'ArrowRight') nextBtn.click();
});

// adjust on resize
window.addEventListener('resize', updateCarousel);

// init
updateCarousel();
