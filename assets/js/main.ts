// 1. FITUR SCROLL REVEAL (Animasi saat scroll)
// Biarkan ini agar website tetap terlihat keren saat digulir
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach((el) => revealObserver.observe(el));

// Fitur TypeWriter sudah dihapus.
// Fitur Image Resizer sudah dihapus.
// 2. FITUR TYPEWRITER
class TypeWriter {
    private textElement: HTMLElement;
    private words: string[];
    private wait: number;
    private txt: string = '';
    private wordIndex: number = 0;
    private isDeleting: boolean = false;

    constructor(textElement: HTMLElement, words: string[], wait: number = 2000) {
        this.textElement = textElement;
        this.words = words;
        this.wait = wait;
        this.type();
    }

    private type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.textElement.innerHTML = this.txt;

        let typeSpeed = 150;
        if (this.isDeleting) typeSpeed /= 2;

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Langsung masuk ke logika TypeWriter saja
    const textElement = document.querySelector('.typing-text') as HTMLElement;
    if (textElement) {
        new TypeWriter(textElement, ['Web Developer', 'Freelancer', 'Dreamer']);
    }
});