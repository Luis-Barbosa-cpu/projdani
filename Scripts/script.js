/* ============================================================
   1. LÓGICA DO CARROSSEL 360° (INFINITO E FLUIDO)
   ============================================================ */
const track = document.getElementById('track');
const dotsNav = document.getElementById('dots-nav');

// Só executa a lógica se o carrossel existir na página (evita erro em páginas internas)
if (track && dotsNav) {
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    const dots = Array.from(dotsNav.children);

    let index = 1; // Começamos no 1 por causa do clone
    let isTransitioning = false;

    // --- CLONAGEM PARA O EFEITO 360° ---
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    track.appendChild(firstClone); // Adiciona clone do 1º no final
    track.prepend(lastClone);      // Adiciona clone do último no início

    // Posiciona o carrossel no primeiro slide real
    track.style.transform = `translateX(-100%)`;

    // Função para atualizar as bolinhas (indicadores)
    const updateDots = () => {
        dots.forEach((dot, i) => {
            // A conta garante que a bolinha certa acenda mesmo com os clones
            dot.classList.toggle('active', i === (index - 1 + slides.length) % slides.length);
        });
    };

    // Função principal de movimento
    const move = () => {
        if (isTransitioning) return;
        isTransitioning = true;
        
        track.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
        track.style.transform = `translateX(-${index * 100}%)`;
    };

    // O "Pulo do Gato": Reseta a posição sem o usuário ver quando chega nos clones
    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        
        // Se bateu no clone do final, pula pro primeiro real
        if (index >= slides.length + 1) {
            track.style.transition = "none";
            index = 1;
            track.style.transform = `translateX(-100%)`;
        }
        
        // Se bateu no clone do início, pula pro último real
        if (index <= 0) {
            track.style.transition = "none";
            index = slides.length;
            track.style.transform = `translateX(-${index * 100}%)`;
        }
        updateDots();
    });

    // Eventos de clique nas flechas
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        index++;
        move();
    });

    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        index--;
        move();
    });

    // Evento de clique nas bolinhas
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            if (isTransitioning) return;
            index = i + 1;
            move();
        });
    });
}

/* ============================================================
   2. LÓGICA DA SACOLA DE COMPRAS
   ============================================================ */
const cartCountElement = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
let itemsInCart = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        itemsInCart++;
        cartCountElement.textContent = itemsInCart;
        
        // Busca o nome do produto no h3 mais próximo
        const productInfo = event.target.closest('figcaption') || event.target.parentElement;
        const productName = productInfo.querySelector('h3').textContent;
        
        alert(`Perfeito! "${productName}" foi adicionado à sua sacola.`);
    });
});

/* ============================================================
   3. EFEITOS DE ROLAGEM (HEADER E VOLTAR AO TOPO)
   ============================================================ */
const header = document.getElementById('main-header');
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // Efeito no Header
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Aparição do botão Voltar ao Topo
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
