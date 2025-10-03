// ---------------------- DOM Loaded ----------------------
document.addEventListener('DOMContentLoaded', () => {

  // ---------- Header Entrance Animation ----------
  const header = document.querySelector('.site-header');
  setTimeout(() => header.classList.add('visible'), 140);

  // ---------- Preload Hero Background ----------
  const hero = document.querySelector('.hero');
  if (hero) {
    const img = new Image();
    img.src = getComputedStyle(hero).backgroundImage.replace(/url\(["']?(.+)["']?\)/, '$1');
    img.onload = () => hero.classList.add('bg-loaded'); // optional fade-in effect
  }

  // ---------- Animated Counters ----------
  const counters = document.querySelectorAll('.stat');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;

    const updateCount = () => {
      const increment = target / 200; // adjust speed
      if (count < target) {
        count += increment;
        counter.innerText = Math.floor(count);
        requestAnimationFrame(updateCount);
      } else {
        // Format special numbers
        if (target === 70000000) counter.innerText = "70M+";
        else if (target === 30) counter.innerText = "30%";
        else if (target === 1000) counter.innerText = "1000+";
        else counter.innerText = target;
      }
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(counter);
  });

  // ---------- Section Reveal on Scroll ----------
  const revealElements = document.querySelectorAll('.hero-card, .about-container, .expect-card, .why-card, .join-item, .stay-container');

  const revealOnScroll = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active'); // add CSS animation class
        revealOnScroll.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealElements.forEach(el => revealOnScroll.observe(el));

  // ---------- Stagger Cards Animation ----------
  const grids = document.querySelectorAll('.expect-grid, .why-grid, .join-line');
  grids.forEach(grid => {
    const children = Array.from(grid.children);
    children.forEach((child, index) => {
      child.style.transitionDelay = `${index * 0.15}s`;
    });
  });

  // ---------- Registration Form Redirect ----------
  const miniForm = document.getElementById('mini-registration');
  if (miniForm) {
    miniForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formLink = "https://docs.google.com/forms/d/e/1FAIpQLSfWJzjauPd7oB-5D2od1ztnIsNEOAvrjZ11KawpM_9_WaOQRQ/viewform";
      window.open(formLink, "_blank");
    });
  }

});
