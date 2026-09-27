document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Sticky header: add shadow/solid bg after scrolling ---------- */
    var header = document.getElementById('siteHeader');
    function updateHeaderState() {
        if (window.scrollY > 12) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });

    /* ---------- Mobile nav toggle ---------- */
    var navToggle = document.getElementById('navToggle');
    var mainNav = document.getElementById('mainNav');

    navToggle.addEventListener('click', function () {
        var isOpen = mainNav.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu after a link is clicked
    mainNav.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            mainNav.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    /* ---------- Active nav-link highlighting while scrolling ---------- */
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
    var sections = navLinks
        .map(function (link) {
            var id = link.getAttribute('href').replace('#', '');
            return document.getElementById(id);
        })
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        var navObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var id = entry.target.id;
                        navLinks.forEach(function (link) {
                            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                        });
                    }
                });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
        );
        sections.forEach(function (section) { navObserver.observe(section); });
    }

    /* ---------- Scroll-reveal for section headings/content ---------- */
    var revealTargets = document.querySelectorAll(
        '.section-title, .eyebrow, .about-grid, .skill-group, .timeline-item, .project-card, .cert-card, .contact-grid, .contact-cta'
    );
    revealTargets.forEach(function (el) { el.classList.add('reveal'); });

    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(
            function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        revealTargets.forEach(function (el) { revealObserver.observe(el); });
    } else {
        revealTargets.forEach(function (el) { el.classList.add('in-view'); });
    }
});