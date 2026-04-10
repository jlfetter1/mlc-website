/* ==========================================================================
   MLC — Main JavaScript
   GSAP ScrollTrigger animations, nav, FAQ, mobile menu
   Dark institutional design
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;



  // ---------- Nav scroll ----------
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // ---------- Mobile menu ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // ---------- Scroll reveals ----------
  if (!prefersReducedMotion) {

    gsap.utils.toArray('.reveal').forEach(el => {
      // Calculate stagger delay if inside a grid
      const parent = el.closest('.card-grid, .solutions-grid, .testimonials-grid, .timeline');
      const staggerDelay = parent
        ? Array.from(parent.children).indexOf(el) * 0.06
        : 0;

      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: staggerDelay,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
          }
        }
      );
    });

    // ---------- Hero scroll dissolve — subtle, reversible ----------
    const hero = document.querySelector('.hero');
    if (hero) {
      const heroContent = hero.querySelector('.hero-content');
      const heroVideo = hero.querySelector('.hero-video');

      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const rect = hero.getBoundingClientRect();
          const heroH = hero.offsetHeight;
          const scrolled = Math.max(0, -rect.top);
          const progress = Math.min(scrolled / (heroH * 0.6), 1);
          const easedProgress = progress * progress;

          // Video fades out
          if (heroVideo) {
            heroVideo.style.opacity = 1 - easedProgress * 0.9;
          }

          // Text lifts and fades slightly faster
          if (heroContent) {
            const textProgress = Math.min(scrolled / (heroH * 0.4), 1);
            const textEased = textProgress * textProgress;
            heroContent.style.transform = `translateY(${textEased * -30}px)`;
            heroContent.style.opacity = 1 - textEased;
          }

          ticking = false;
        });
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

  } else {
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  // ---------- Stat counter ----------
  document.querySelectorAll('.stat-number[data-count]').forEach(stat => {
    const target = parseInt(stat.dataset.count, 10);
    if (isNaN(target)) return;

    ScrollTrigger.create({
      trigger: stat,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: function() {
            stat.textContent = Math.round(this.targets()[0].val) + '+';
          }
        });
      }
    });
  });

  // ---------- Timeline progression ----------
  const timeline = document.querySelector('.timeline');
  if (timeline && !prefersReducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timeline.classList.add('animated');
          observer.unobserve(timeline);
        }
      });
    }, { threshold: 0.15 });
    observer.observe(timeline);
  } else if (timeline) {
    timeline.classList.add('animated');
  }

  // ---------- FAQ Accordion ----------
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open', !isOpen);
    });
  });

  // ---------- Smooth scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        return;
      }
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = nav ? nav.offsetHeight : 0;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navH - 20,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  });

  // ---------- AI chip cycling animation ----------
  if (!prefersReducedMotion) {
    const chips = document.querySelectorAll('.ai-chip');
    if (chips.length) {
      let activeIdx = Array.from(chips).findIndex(c => c.classList.contains('active'));
      setInterval(() => {
        chips[activeIdx].classList.remove('active');
        activeIdx = (activeIdx + 1) % chips.length;
        chips[activeIdx].classList.add('active');
      }, 3500);
    }
  }

  // ---------- Dashboard stat number animation with flash ----------
  if (!prefersReducedMotion) {
    const statCards = document.querySelectorAll('.mock-stat-card span');
    const baseValues = [247, 98.2, 1840, 12.40];
    const formats = ['d', 'f', ',d', '$f'];
    let tick = 0;

    function formatStat(val, fmt) {
      if (fmt === 'd') return String(Math.round(val));
      if (fmt === 'f') return val.toFixed(1) + '%';
      if (fmt === ',d') return Math.round(val).toLocaleString();
      if (fmt === '$f') return '$' + val.toFixed(2);
      return String(val);
    }

    setInterval(() => {
      tick++;
      const idx = tick % statCards.length;
      const span = statCards[idx];
      if (!span) return;

      const base = baseValues[idx];
      const jitter = base > 100 ? Math.floor(Math.random() * 5) - 2 : (Math.random() * 0.4 - 0.2);
      baseValues[idx] = base + jitter;
      span.textContent = formatStat(baseValues[idx], formats[idx]);

      span.classList.add('stat-flash');
      setTimeout(() => span.classList.remove('stat-flash'), 600);
    }, 3500);
  }

  // ---------- Zoom session timer ----------
  if (!prefersReducedMotion) {
    const zoomLabel = document.querySelector('.zoom-label');
    if (zoomLabel) {
      let seconds = 2340; // start at 39:00
      setInterval(() => {
        seconds++;
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        zoomLabel.textContent = 'Live — Business English B2  ' + m + ':' + String(s).padStart(2, '0');
      }, 1000);
    }
  }

  // ---------- Button press feedback ----------
  if (!prefersReducedMotion) {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousedown', () => {
        btn.style.transform = 'scale(0.97)';
      });
      btn.addEventListener('mouseup', () => {
        btn.style.transform = '';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

});
