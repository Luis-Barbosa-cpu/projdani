// 1. Lógica do Carrossel Semântico (Mais Robusta)
const track = document.querySelector('.carrousel-track');

if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carrousel-next');
    const prevButton = document.querySelector('.carrousel-prev');
    const dotsNav = document.querySelector('.carrousel-nav');
    const dots = Array.from(dotsNav.children);

    // Função para mover o carrossel
    const moveToSlide = (currentSlide, targetSlide) => {
        // MEDIMOS AQUI: Garante que pegamos a largura real do momento
        const slideWidth = slides[0].getBoundingClientRect().width;
        const targetIndex = slides.findIndex(slide => slide === targetSlide);
        
        // Move a pista
        track.style.transform = `translateX(-${targetIndex * slideWidth}px)`;
        
        currentSlide.classList.remove('is-selected');
        targetSlide.classList.add('is-selected');
    };

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('is-selected');
        targetDot.classList.add('is-selected');
    };

    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.carrousel-slide.is-selected') || slides[0];
        const nextSlide = currentSlide.nextElementSibling || slides[0]; // Volta pro início se for o último
        const currentDot = dotsNav.querySelector('.carrousel-indicator.is-selected');
        const nextDot = currentDot.nextElementSibling || dots[0];

        moveToSlide(currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    });

    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.carrousel-slide.is-selected') || slides[0];
        const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1]; // Vai pro último se for o primeiro
        const currentDot = dotsNav.querySelector('.carrousel-indicator.is-selected');
        const prevDot = currentDot.previousElementSibling || dots[dots.length - 1];

        moveToSlide(currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
    });

    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('.carrousel-indicator');
        if (!targetDot) return;

        const currentSlide = track.querySelector('.carrousel-slide.is-selected') || slides[0];
        const currentDot = dotsNav.querySelector('.carrousel-indicator.is-selected');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    });
}

// 2. Lógica da Sacola de Compras
const cartCountElement = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
let itemsInCart = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        itemsInCart++;
        cartCountElement.textContent = itemsInCart;
        const productInfo = event.target.closest('figcaption') || event.target.parentElement;
        const productName = productInfo.querySelector('h3').textContent;
        alert(`Perfeito! "${productName}" foi adicionado à sua sacola.`);
    });
});

// 3. Efeito de diminuir o cabeçalho ao rolar a página
const header = document.getElementById('main-header');
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Lógica do botão Voltar ao Topo
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});