// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const links = document.querySelector('nav.links');
menuBtn.addEventListener('click', () => {
  const open = links.style.display === 'flex';
  links.style.display = open ? 'none' : 'flex';
  links.style.flexDirection = 'column';
  links.style.position = 'absolute';
  links.style.top = '68px';
  links.style.left = '0';
  links.style.right = '0';
  links.style.background = '#fff';
  links.style.padding = '20px 32px';
  links.style.borderBottom = '1px solid #e2eef0';
  links.style.gap = '16px';
});

// Count-up animation for stats, triggered once when visible
const counters = document.querySelectorAll('[data-count]');
const animateCount = (el) => {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const suffix = el.textContent.replace(/^[0-9]+/, '');
  const duration = 1200;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => observer.observe(c));