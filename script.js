/**
 * EXECUTIVE DIRECTIVE SCRIPT
 * Operational Command Schema • msemon.com
 * Engine: Strict Vanilla JavaScript
 */

(function () {
  'use strict';

  // 1. Telemetry Clock (Dhaka UTC+6)
  function initTelemetryClock() {
    const clockEl = document.getElementById('clock-display');
    if (!clockEl) return;

    function updateClock() {
      const now = new Date();
      // Calculate Dhaka time (UTC+6)
      const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
      const dhakaTime = new Date(utcMs + 6 * 3600000);

      const hours = String(dhakaTime.getHours()).padStart(2, '0');
      const minutes = String(dhakaTime.getMinutes()).padStart(2, '0');
      const seconds = String(dhakaTime.getSeconds()).padStart(2, '0');

      clockEl.textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateClock();
    setInterval(updateClock, 1000);
  }

  // 2. Navigation Active State Spy (AIDA Funnel Tracking)
  function initNavSpy() {
    const navLinks = document.querySelectorAll('.nav-link[data-nav]');
    const sections = document.querySelectorAll('.funnel-node[data-section]');

    if (!navLinks.length || !sections.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          navLinks.forEach((link) => {
            if (link.getAttribute('data-nav') === sectionId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  }

  // 3. Frictionless Copy Email Protocol
  function initEmailCopy() {
    const copyBtn = document.getElementById('copy-email-btn');
    const emailEl = document.getElementById('exec-email');
    const copyText = document.getElementById('copy-btn-text');

    if (!copyBtn || !emailEl || !copyText) return;

    copyBtn.addEventListener('click', async () => {
      const email = emailEl.textContent.trim();
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback
          const textarea = document.createElement('textarea');
          textarea.value = email;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        const originalText = copyText.textContent;
        copyText.textContent = 'COPIED';
        copyBtn.style.borderColor = '#10b981';
        copyBtn.style.color = '#10b981';

        setTimeout(() => {
          copyText.textContent = originalText;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2200);
      } catch (err) {
        console.error('Copy execution failed:', err);
      }
    });
  }

  // 4. Smooth Anchor Interactivity Guard
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Update URL hash without jumping
          history.pushState(null, '', targetId);
        }
      });
    });
  }

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTelemetryClock();
      initNavSpy();
      initEmailCopy();
      initSmoothScroll();
    });
  } else {
    initTelemetryClock();
    initNavSpy();
    initEmailCopy();
    initSmoothScroll();
  }
})();
