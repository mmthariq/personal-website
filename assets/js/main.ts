/* =========================================
   PERSONAL WEBSITE - Clean TypeScript
   Author: Muhammad Thariq
   ========================================= */

// Types & Interfaces
interface FormElements {
    form: HTMLFormElement;
    nameInput: HTMLInputElement;
    emailInput: HTMLInputElement;
    messageInput: HTMLTextAreaElement;
    messageBox: HTMLElement;
    submitBtn: HTMLButtonElement;
}

interface TypeWriterConfig {
    words: readonly string[];
    typeSpeed?: number;
    deleteSpeed?: number;
    pauseDuration?: number;
}

// Constants
const CONFIG = {
    REVEAL_THRESHOLD: 0.15,
    TYPEWRITER: {
        words: ['Web Developer', 'Full Stack Developer', 'Laravel Specialist'],
        typeSpeed: 150,
        deleteSpeed: 75,
        pauseDuration: 2000
    },
    FORM: {
        loadingDuration: 2000,
        successDuration: 4000
    }
} as const;

// ==========================================
// 1. THEME TOGGLE
// ==========================================
class ThemeManager {
    private toggle: HTMLInputElement | null;
    private root: HTMLElement;
    private storageKey: string = 'theme-preference';
    private mediaQuery: MediaQueryList | null;

    constructor() {
        this.toggle = document.getElementById('themeToggle') as HTMLInputElement;
        this.root = document.documentElement;
        this.mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
        this.init();
    }

    private getStoredTheme(): string | null {
        try {
            return localStorage.getItem(this.storageKey);
        } catch (error) {
            return null;
        }
    }

    private setStoredTheme(theme: string): void {
        try {
            localStorage.setItem(this.storageKey, theme);
        } catch (error) {
            return;
        }
    }

    private getPreferredTheme(): string {
        const storedTheme = this.getStoredTheme();
        if (storedTheme) return storedTheme;
        return this.mediaQuery && this.mediaQuery.matches ? 'dark' : 'light';
    }

    private applyTheme(theme: string): void {
        this.root.setAttribute('data-theme', theme);
    }

    private syncToggle(theme: string): void {
        if (this.toggle) {
            this.toggle.checked = theme === 'dark';
        }
    }

    private init(): void {
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
            this.mediaQuery.addEventListener('change', (event: MediaQueryListEvent) => {
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
    private menuToggle: HTMLElement | null;
    private navLinks: HTMLElement | null;
    private navItems: NodeListOf<HTMLAnchorElement>;
    private icon: HTMLElement | null;
    private isOpen: boolean = false;

    constructor() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.navItems = document.querySelectorAll('.nav-links a');
        this.icon = this.menuToggle ? this.menuToggle.querySelector('i') : null;
        this.init();
    }

    private open(): void {
        if (!this.navLinks || !this.menuToggle) return;
        this.isOpen = true;
        this.navLinks.classList.add('nav-active');
        this.menuToggle.setAttribute('aria-expanded', 'true');
        this.updateIcon();
    }

    private close(): void {
        if (!this.navLinks || !this.menuToggle) return;
        this.isOpen = false;
        this.navLinks.classList.remove('nav-active');
        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.updateIcon();
    }

    private toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    private updateIcon(): void {
        if (!this.icon) return;
        this.icon.className = this.isOpen ? 'ri-close-line' : 'ri-menu-3-line';
    }

    private init(): void {
        if (!this.menuToggle || !this.navLinks) return;

        this.menuToggle.setAttribute('role', 'button');
        this.menuToggle.setAttribute('tabindex', '0');
        this.menuToggle.setAttribute('aria-label', 'Toggle navigation');
        this.menuToggle.setAttribute('aria-expanded', 'false');

        this.menuToggle.addEventListener('click', () => this.toggle());
        this.menuToggle.addEventListener('keydown', (event: KeyboardEvent) => {
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
    private observer: IntersectionObserver;

    constructor() {
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            { threshold: CONFIG.REVEAL_THRESHOLD }
        );
        this.init();
    }

    private handleIntersection(entries: IntersectionObserverEntry[]): void {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                this.observer.unobserve(entry.target);
            }
        });
    }

    private init(): void {
        const elements = document.querySelectorAll('.reveal');
        elements.forEach(el => this.observer.observe(el));
    }
}

// ==========================================
// 4. TYPEWRITER EFFECT
// ==========================================
class TypeWriter {
    private element: HTMLElement;
    private config: Required<TypeWriterConfig>;
    private currentText: string = '';
    private wordIndex: number = 0;
    private isDeleting: boolean = false;

    constructor(element: HTMLElement, config: TypeWriterConfig) {
        this.element = element;
        this.config = {
            typeSpeed: 150,
            deleteSpeed: 75,
            pauseDuration: 2000,
            ...config
        };
        this.animate();
    }

    private get currentWord(): string {
        return this.config.words[this.wordIndex % this.config.words.length];
    }

    private get animationSpeed(): number {
        if (this.isDeleting) return this.config.deleteSpeed;
        if (!this.isDeleting && this.currentText === this.currentWord) {
            return this.config.pauseDuration;
        }
        return this.config.typeSpeed;
    }

    private updateText(): void {
        const targetText = this.currentWord;
        
        if (this.isDeleting) {
            this.currentText = targetText.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = targetText.substring(0, this.currentText.length + 1);
        }
        
        this.element.textContent = this.currentText;
    }

    private updateState(): void {
        const isComplete = !this.isDeleting && this.currentText === this.currentWord;
        const isEmpty = this.isDeleting && this.currentText === '';

        if (isComplete) {
            this.isDeleting = true;
        } else if (isEmpty) {
            this.isDeleting = false;
            this.wordIndex++;
        }
    }

    private animate(): void {
        this.updateText();
        this.updateState();
        setTimeout(() => this.animate(), this.animationSpeed);
    }
}

// ==========================================
// 5. SUCCESS POPUP MANAGER
// ==========================================
class SuccessPopupManager {
    private popup: HTMLElement | null = null;
    private closeBtn: HTMLElement | null = null;

    constructor() {
        this.init();
    }

    private init(): void {
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

    public show(): void {
        if (this.popup) {
            this.popup.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    private hide(): void {
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
    private elements: FormElements | null = null;
    private originalButtonText: string = '';
    private successPopup: SuccessPopupManager;

    constructor(successPopup: SuccessPopupManager) {
        this.successPopup = successPopup;
        this.init();
    }

    private getFormElements(): FormElements | null {
        const form = document.getElementById('contactForm') as HTMLFormElement;
        const nameInput = document.getElementById('nameInput') as HTMLInputElement;
        const emailInput = document.getElementById('emailInput') as HTMLInputElement;
        const messageInput = document.getElementById('messageInput') as HTMLTextAreaElement;
        const messageBox = document.getElementById('formMessage') as HTMLElement;
        const submitBtn = form?.querySelector('button') as HTMLButtonElement;

        if (!form || !nameInput || !emailInput || !messageInput || !messageBox || !submitBtn) {
            return null;
        }

        return { form, nameInput, emailInput, messageInput, messageBox, submitBtn };
    }

    private validateForm(elements: FormElements): { isValid: boolean; message?: string } {
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

    private showMessage(messageBox: HTMLElement, text: string, color: string): void {
        messageBox.style.color = color;
        messageBox.textContent = text;
    }

    private setButtonState(btn: HTMLButtonElement, text: string, disabled: boolean, styles: Partial<CSSStyleDeclaration> = {}): void {
        btn.textContent = text;
        btn.disabled = disabled;
        Object.assign(btn.style, styles);
    }

    private resetForm(elements: FormElements): void {
        const { nameInput, emailInput, messageInput } = elements;
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
    }

    private async handleSubmit(event: Event): Promise<void> {
        event.preventDefault();
        
        if (!this.elements) return;

        const validation = this.validateForm(this.elements);
        if (!validation.isValid) {
            this.showMessage(this.elements.messageBox, validation.message!, '#ffcccc');
            return;
        }

        const { nameInput, messageBox, submitBtn } = this.elements;
        const name = nameInput.value.trim();

        // Loading state
        this.setButtonState(submitBtn, 'Mengirim...', true, { opacity: '0.7' });

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, CONFIG.FORM.loadingDuration));
            
            // Show success popup
            this.successPopup.show();
            this.resetForm(this.elements);
            
            // Reset button to original state
            this.setButtonState(submitBtn, this.originalButtonText, false, {
                backgroundColor: '',
                opacity: '1'
            });

        } catch (error) {
            this.showMessage(messageBox, '❌ Terjadi kesalahan, coba lagi!', '#ffcccc');
            this.setButtonState(submitBtn, this.originalButtonText, false, { opacity: '1' });
        }
    }

    private init(): void {
        this.elements = this.getFormElements();
        if (!this.elements) return;

        this.originalButtonText = this.elements.submitBtn.textContent || 'Kirim Pesan';
        this.elements.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
}

// ==========================================
// 7. MAIN APPLICATION
// ==========================================
class App {
    private scrollReveal: ScrollRevealManager;
    private successPopup: SuccessPopupManager;
    private contactForm: ContactFormManager;
    private themeManager: ThemeManager;
    private mobileNav: MobileNavManager;

    constructor() {
        this.themeManager = new ThemeManager();
        this.mobileNav = new MobileNavManager();
        this.scrollReveal = new ScrollRevealManager();
        this.successPopup = new SuccessPopupManager();
        this.contactForm = new ContactFormManager(this.successPopup);
        this.initTypeWriter();
    }

    private initTypeWriter(): void {
        const element = document.querySelector('.typing-text') as HTMLElement;
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

export {};