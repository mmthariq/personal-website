// 1. FITUR SCROLL REVEAL (Animasi saat scroll)
// Biarkan ini agar website tetap terlihat keren saat digulir
var revealElements = document.querySelectorAll('.reveal');
var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});
revealElements.forEach(function (el) { return revealObserver.observe(el); });
// Fitur TypeWriter sudah dihapus.
// Fitur Image Resizer sudah dihapus.
// 2. FITUR TYPEWRITER
var TypeWriter = /** @class */ (function () {
    function TypeWriter(textElement, words, wait) {
        if (wait === void 0) { wait = 2000; }
        this.txt = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.textElement = textElement;
        this.words = words;
        this.wait = wait;
        this.type();
    }
    TypeWriter.prototype.type = function () {
        var _this = this;
        var current = this.wordIndex % this.words.length;
        var fullTxt = this.words[current];
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        }
        else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        this.textElement.innerHTML = this.txt;
        var typeSpeed = 150;
        if (this.isDeleting)
            typeSpeed /= 2;
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        }
        else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        setTimeout(function () { return _this.type(); }, typeSpeed);
    };
    return TypeWriter;
}());
document.addEventListener('DOMContentLoaded', function () {
    // Langsung masuk ke logika TypeWriter saja
    var textElement = document.querySelector('.typing-text');
    if (textElement) {
        new TypeWriter(textElement, ['Web Developer', 'Freelancer', 'Dreamer']);
    }
});
