/* =========================================
   PERSONAL WEBSITE - JavaScript
   Author: Muhammad Thariq
   ========================================= */

// Configuration
const CONFIG = {
    REVEAL_THRESHOLD: 0.15,
    TYPEWRITER: {
        words: ['Web Developer', 'Full Stack Developer', 'Laravel Specialist'],
        typeSpeed: 150,
        deleteSpeed: 75,
        pauseDuration: 2000
    }
};

// ==========================================
// 1. THEME TOGGLE
// ==========================================
class ThemeManager {
    constructor() {
        this.toggle = document.getElementById('themeToggle');
        this.root = document.documentElement;
        this.storageKey = 'theme-preference';
        this.mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
        this.init();
    }

    getStoredTheme() {
        try {
            return localStorage.getItem(this.storageKey);
        } catch (error) {
            return null;
        }
    }

    setStoredTheme(theme) {
        try {
            localStorage.setItem(this.storageKey, theme);
        } catch (error) {
            return;
        }
    }

    getPreferredTheme() {
        const storedTheme = this.getStoredTheme();
        if (storedTheme) return storedTheme;
        return this.mediaQuery && this.mediaQuery.matches ? 'dark' : 'light';
    }

    applyTheme(theme) {
        this.root.setAttribute('data-theme', theme);
    }

    syncToggle(theme) {
        if (this.toggle) {
            this.toggle.checked = theme === 'dark';
        }
    }

    init() {
        const initialTheme = this.getPreferredTheme();
        this.applyTheme(initialTheme);

        if (!this.toggle) return;

        this.syncToggle(initialTheme);

        this.toggle.addEventListener('change', () => {
            const nextTheme = this.toggle.checked ? 'dark' : 'light';
            this.applyTheme(nextTheme);
            this.setStoredTheme(nextTheme);
        });

        if (!this.getStoredTheme() && this.mediaQuery) {
            this.mediaQuery.addEventListener('change', (event) => {
                const nextTheme = event.matches ? 'dark' : 'light';
                this.applyTheme(nextTheme);
                this.syncToggle(nextTheme);
            });
        }
    }
}

// ==========================================
// 2. MOBILE NAVIGATION
// ==========================================
class MobileNavManager {
    constructor() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.navItems = document.querySelectorAll('.nav-links a');
        this.icon = this.menuToggle ? this.menuToggle.querySelector('i') : null;
        this.isOpen = false;
        this.init();
    }

    open() {
        if (!this.navLinks || !this.menuToggle) return;
        this.isOpen = true;
        this.navLinks.classList.add('nav-active');
        this.menuToggle.setAttribute('aria-expanded', 'true');
        this.updateIcon();
    }

    close() {
        if (!this.navLinks || !this.menuToggle) return;
        this.isOpen = false;
        this.navLinks.classList.remove('nav-active');
        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.updateIcon();
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    updateIcon() {
        if (!this.icon) return;
        this.icon.className = this.isOpen ? 'ri-close-line' : 'ri-menu-3-line';
    }

    init() {
        if (!this.menuToggle || !this.navLinks) return;

        this.menuToggle.setAttribute('role', 'button');
        this.menuToggle.setAttribute('tabindex', '0');
        this.menuToggle.setAttribute('aria-label', 'Toggle navigation');
        this.menuToggle.setAttribute('aria-expanded', 'false');

        this.menuToggle.addEventListener('click', () => this.toggle());
        this.menuToggle.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.toggle();
            }
        });

        this.navItems.forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.close();
            }
        });
    }
}

// ==========================================
// 3. SCROLL REVEAL ANIMATION
// ==========================================
class ScrollRevealManager {
    constructor() {
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            { threshold: CONFIG.REVEAL_THRESHOLD }
        );
        this.init();
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                this.observer.unobserve(entry.target);
            }
        });
    }

    init() {
        const elements = document.querySelectorAll('.reveal');
        elements.forEach(el => this.observer.observe(el));
    }
}

// ==========================================
// 4. TYPEWRITER EFFECT
// ==========================================
class TypeWriter {
    constructor(element, config) {
        this.element = element;
        this.config = {
            typeSpeed: 150,
            deleteSpeed: 75,
            pauseDuration: 2000,
            ...config
        };
        this.currentText = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.animate();
    }

    get currentWord() {
        return this.config.words[this.wordIndex % this.config.words.length];
    }

    get animationSpeed() {
        if (this.isDeleting) return this.config.deleteSpeed;
        if (!this.isDeleting && this.currentText === this.currentWord) {
            return this.config.pauseDuration;
        }
        return this.config.typeSpeed;
    }

    updateText() {
        const targetText = this.currentWord;
        
        if (this.isDeleting) {
            this.currentText = targetText.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = targetText.substring(0, this.currentText.length + 1);
        }
        
        this.element.textContent = this.currentText;
    }

    updateState() {
        const isComplete = !this.isDeleting && this.currentText === this.currentWord;
        const isEmpty = this.isDeleting && this.currentText === '';

        if (isComplete) {
            this.isDeleting = true;
        } else if (isEmpty) {
            this.isDeleting = false;
            this.wordIndex++;
        }
    }

    animate() {
        this.updateText();
        this.updateState();
        setTimeout(() => this.animate(), this.animationSpeed);
    }
}

// ==========================================
// 5. SUCCESS POPUP MANAGER
// ==========================================
class SuccessPopupManager {
    constructor() {
        this.popup = null;
        this.closeBtn = null;
        this.init();
    }

    init() {
        this.popup = document.getElementById('successPopup');
        this.closeBtn = document.getElementById('closePopup');
        
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', this.hide.bind(this));
        }
        
        if (this.popup) {
            this.popup.addEventListener('click', (e) => {
                if (e.target === this.popup) {
                    this.hide();
                }
            });
        }
    }

    show() {
        if (this.popup) {
            this.popup.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    hide() {
        if (this.popup) {
            this.popup.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
}

// ==========================================
// 6. CONTACT FORM HANDLER
// ==========================================
class ContactFormManager {
    constructor(successPopup) {
        this.successPopup = successPopup;
        this.elements = null;
        this.originalButtonText = '';
        this.init();
    }

    getFormElements() {
        const form = document.getElementById('contactForm');
        const nameInput = document.getElementById('nameInput');
        const emailInput = document.getElementById('emailInput');
        const messageInput = document.getElementById('messageInput');
        const messageBox = document.getElementById('formMessage');
        const submitBtn = form?.querySelector('button');

        if (!form || !nameInput || !emailInput || !messageInput || !messageBox || !submitBtn) {
            return null;
        }

        return { form, nameInput, emailInput, messageInput, messageBox, submitBtn };
    }

    validateForm(elements) {
        const { nameInput, emailInput, messageInput } = elements;
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            return { isValid: false, message: '❌ Harap isi semua kolom ya!' };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { isValid: false, message: '❌ Format email tidak valid!' };
        }

        return { isValid: true };
    }

    showMessage(messageBox, text, color) {
        messageBox.style.color = color;
        messageBox.textContent = text;
    }

    setButtonState(btn, text, disabled, styles = {}) {
        btn.innerHTML = text;
        btn.disabled = disabled;
        Object.assign(btn.style, styles);
    }

    resetForm(elements) {
        const { nameInput, emailInput, messageInput } = elements;
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        if (!this.elements) return;

        const validation = this.validateForm(this.elements);
        if (!validation.isValid) {
            this.showMessage(this.elements.messageBox, validation.message, '#ffcccc');
            return;
        }

        const { nameInput, emailInput, messageInput, submitBtn, form } = this.elements;
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Loading state
        this.setButtonState(submitBtn, 'Mengirim... <i class="ri-loader-4-line"></i>', true, { opacity: '0.7' });

        try {
            // Submit to Netlify
            const formData = new FormData();
            formData.append('form-name', 'contact');
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', message);

            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });

            if (response.ok) {
                // Success - show popup
                this.successPopup.show();
                this.resetForm(this.elements);
                
                // Reset button
                this.setButtonState(submitBtn, this.originalButtonText, false, {
                    backgroundColor: '',
                    opacity: '1'
                });
                this.showMessage(this.elements.messageBox, '', '');
            } else {
                throw new Error('Network response was not ok');
            }

        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage(this.elements.messageBox, '❌ Terjadi kesalahan, coba lagi!', '#ffcccc');
            this.setButtonState(submitBtn, this.originalButtonText, false, { opacity: '1' });
        }
    }

    init() {
        this.elements = this.getFormElements();
        if (!this.elements) return;

        this.originalButtonText = this.elements.submitBtn.innerHTML || 'Kirim Pesan <i class="ri-send-plane-fill"></i>';
        this.elements.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
}

// ==========================================
// 7. MAIN APPLICATION
// ==========================================
class App {
    constructor() {
        this.themeManager = new ThemeManager();
        this.mobileNav = new MobileNavManager();
        this.scrollReveal = new ScrollRevealManager();
        this.successPopup = new SuccessPopupManager();
        this.contactForm = new ContactFormManager(this.successPopup);
        this.initTypeWriter();
    }

    initTypeWriter() {
        const element = document.querySelector('.typing-text');
        if (element) {
            new TypeWriter(element, CONFIG.TYPEWRITER);
        }
    }
}

// ==========================================
// 8. INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    new App();
});