document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });

        // Smooth Scroll for Nav Links
        document.querySelectorAll('.nav-links a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Scroll Animation for Sections
    const sections = document.querySelectorAll('section, header');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Animate progress bars when skills section is visible
                if (entry.target.id === 'skills') {
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-progress') + '%';
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                }
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Project Card and Skill Card Hover Effects
    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'box-shadow 0.3s, transform 0.3s';
            card.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.25)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
        });
    });

    // Project Details Toggle
    const projectToggles = document.querySelectorAll('.project-toggle');
    projectToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const targetId = toggle.getAttribute('data-target');
            const details = document.getElementById(targetId);
            if (!details) return;

            const isActive = details.classList.contains('active');

            // Close all other details
            document.querySelectorAll('.project-details').forEach(detail => {
                detail.classList.remove('active');
            });

            // Toggle the clicked details
            if (!isActive) {
                details.classList.add('active');
            }
        });
    });

    // ==== Modal Preview untuk Galeri Gambar Proyek ====
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('imageModalImg');
    const modalCaption = document.getElementById('imageModalCaption');
    const modalClose = document.querySelector('.image-modal-close');

    if (modal && modalImg && modalCaption && modalClose) {
        // Semua thumbnail dalam galeri
        const thumbs = document.querySelectorAll('.project-gallery img');

        thumbs.forEach(img => {
            img.addEventListener('click', () => {
                modal.style.display = 'flex';
                modalImg.src = img.src;        // kalau mau beda file untuk full, bisa pakai data-full
                modalCaption.textContent = img.alt || '';
            });
        });

        // tombol X
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // klik area gelap luar gambar
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
