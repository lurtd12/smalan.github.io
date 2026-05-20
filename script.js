document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Remove Preloader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 600);
    }, 800); // Waktu minimal loading

    // 2. Navbar Scroll Effect & Glassmorphism
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Mobile Hamburger Menu Toggle (Slide Effect)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 4. Scroll Reveal Animations using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // 5. Counting Numbers Animation (Statistik)
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.innerText = Math.ceil(current) + "+";
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.innerText = target + "+";
                    }
                };
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // 6. Typing Effect on Hero Text
    const textToType = "Mewujudkan Generasi Unggul, Berkarakter, dan Berprestasi Nasional.";
    const typingContainer = document.getElementById('typing-text');
    let charIndex = 0;
    
    // Add blinking cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.innerHTML = '&nbsp;';
    
    function typeText() {
        if (charIndex < textToType.length) {
            typingContainer.textContent = textToType.substring(0, charIndex + 1);
            typingContainer.appendChild(cursor);
            charIndex++;
            setTimeout(typeText, 70); // Kecepatan ketik
        }
    }
    // Start typing after a short delay
    setTimeout(typeText, 1000);

    // 7. Ripple Effect for Buttons
    const rippleBtns = document.querySelectorAll('.ripple');
    rippleBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            
            let ripples = document.createElement('span');
            ripples.className = 'ripple-span';
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            
            this.appendChild(ripples);
            setTimeout(() => { ripples.remove(); }, 600);
        });
    });

    // 8. Easter Egg Logic (Luthfie XI-B)
    const easterModal = document.getElementById('_x7k9m2');
    const magicWord = ['l','u','t','h','f','i','e'];
    let keyIndex = 0;

    // Keyboard trigger
    window.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === magicWord[keyIndex]) {
            keyIndex++;
            if (keyIndex === magicWord.length) {
                showEasterEgg();
                keyIndex = 0;
            }
        } else {
            keyIndex = 0;
        }
    });

    // Click trigger (3 times on logo text)
    const logoTitle = document.querySelector('.logo-text h1');
    let clickCount = 0;
    let clickTimer;
    if(logoTitle) {
        logoTitle.addEventListener('click', () => {
            clickCount++;
            clearTimeout(clickTimer);
            if(clickCount === 3) {
                showEasterEgg();
                clickCount = 0;
            } else {
                clickTimer = setTimeout(() => { clickCount = 0; }, 1000);
            }
        });
    }

    function showEasterEgg() {
        easterModal.classList.add('show');
    }

    easterModal.addEventListener('click', function(e) {
        if(e.target === this || e.target.closest('.easter-content')) {
            this.classList.remove('show');
            setTimeout(() => this.style.display = 'none', 400); // Match CSS transition
            setTimeout(() => this.style.display = '', 450); // Reset for next time
        }
    });
});