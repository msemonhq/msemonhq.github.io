/**
 * EXECUTIVE DIRECTIVE SCRIPT v2.0
 * Operational Command Schema • msemon.com
 * Engine: Strict Vanilla JavaScript
 * Enhancements: Mobile drawer, scroll-reveal, header state, staggered animations
 */

(function () {
  'use strict';

  // 1. Telemetry Clock (Dhaka UTC+6)
  function initTelemetryClock() {
    const clockEl = document.getElementById('clock-display');
    if (!clockEl) return;

    function updateClock() {
      const now = new Date();
      const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
      const dhakaTime = new Date(utcMs + 6 * 3600000);

      const hours = String(dhakaTime.getHours()).padStart(2, '0');
      const minutes = String(dhakaTime.getMinutes()).padStart(2, '0');
      const seconds = String(dhakaTime.getSeconds()).padStart(2, '0');

      clockEl.textContent = hours + ':' + minutes + ':' + seconds;
    }

    updateClock();
    setInterval(updateClock, 1000);
  }

  // 2. Navigation Active State Spy (AIDA Funnel Tracking)
  function initNavSpy() {
    const navLinks = document.querySelectorAll('.nav-link[data-nav]');
    const drawerLinks = document.querySelectorAll('.drawer-link[data-nav]');
    const sections = document.querySelectorAll('.funnel-node[data-section]');

    if (!sections.length) return;

    var observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var sectionId = entry.target.getAttribute('data-section');

          navLinks.forEach(function (link) {
            if (link.getAttribute('data-nav') === sectionId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });

          drawerLinks.forEach(function (link) {
            if (link.getAttribute('data-nav') === sectionId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // 3. Frictionless Copy Email Protocol
  function initEmailCopy() {
    var copyBtn = document.getElementById('copy-email-btn');
    var emailEl = document.getElementById('exec-email');
    var copyText = document.getElementById('copy-btn-text');

    if (!copyBtn || !emailEl || !copyText) return;

    copyBtn.addEventListener('click', function () {
      var email = emailEl.textContent.trim();

      function onCopySuccess() {
        var originalText = copyText.textContent;
        copyText.textContent = 'COPIED ✓';
        copyBtn.style.borderColor = '#10b981';
        copyBtn.style.color = '#10b981';
        copyBtn.style.background = 'rgba(16, 185, 129, 0.08)';

        setTimeout(function () {
          copyText.textContent = originalText;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
          copyBtn.style.background = '';
        }, 2200);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(onCopySuccess).catch(function () {
          fallbackCopy(email, onCopySuccess);
        });
      } else {
        fallbackCopy(email, onCopySuccess);
      }
    });

    function fallbackCopy(text, callback) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        callback();
      } catch (err) {
        console.error('Copy failed:', err);
      }
      document.body.removeChild(textarea);
    }
  }

  // 4. Smooth Anchor Interactivity Guard
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          history.pushState(null, '', targetId);

          // Close mobile drawer if open
          closeMobileDrawer();
        }
      });
    });
  }

  // 5. Mobile Navigation Drawer
  var mobileToggle = null;
  var mobileDrawer = null;

  function initMobileNav() {
    mobileToggle = document.getElementById('mobile-toggle');
    mobileDrawer = document.getElementById('mobile-drawer');

    if (!mobileToggle || !mobileDrawer) return;

    mobileToggle.addEventListener('click', function () {
      var isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  function openMobileDrawer() {
    if (!mobileToggle || !mobileDrawer) return;
    mobileDrawer.classList.add('open');
    mobileToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (!mobileToggle || !mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    mobileToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  // 6. Header Scroll State
  function initHeaderScroll() {
    var header = document.querySelector('.exec-header');
    if (!header) return;

    var scrollThreshold = 32;
    var ticking = false;

    function updateHeader() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });

    // Initial state
    updateHeader();
  }

  // 7. Scroll-Triggered Section Reveal
  function initScrollReveal() {
    var revealElements = document.querySelectorAll('.reveal-section, .reveal-children');
    if (!revealElements.length) return;

    var revealObserverOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, revealObserverOptions);

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // Initialize on DOM Ready
  function initAll() {
    initTelemetryClock();
    initNavSpy();
    initEmailCopy();
    initSmoothScroll();
    initMobileNav();
    initHeaderScroll();
    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
