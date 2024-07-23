document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 1;
    showSlides(slideIndex);

    // Controle das setas
    document.querySelector('.prev').addEventListener('click', function() {
        plusSlides(-1);
    });

    document.querySelector('.next').addEventListener('click', function() {
        plusSlides(1);
    });

    // Controle dos pontos indicadores
    let dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide(index + 1);
        });
    });

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.querySelectorAll('.carousel-slide');
        let dots = document.querySelectorAll('.dot');

        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(slide => {
            slide.style.display = 'none';
        });

        dots.forEach(dot => {
            dot.className = dot.className.replace(' active-dot', '');
        });

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].className += ' active-dot';
    }
});

function scrollCatalog(direction) {
    const container = document.querySelector('.catalog-container');
    const scrollStep = 320; // Largura do item mais o espaçamento

    if (direction === 'prev') {
        container.scrollLeft -= scrollStep;
    } else if (direction === 'next') {
        container.scrollLeft += scrollStep;
    }
}


/*modal*/
document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 1;
    showSlides(slideIndex);

    document.querySelector('.prev').addEventListener('click', function() {
        plusSlides(-1);
    });

    document.querySelector('.next').addEventListener('click', function() {
        plusSlides(1);
    });

    let dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide(index + 1);
        });
    });

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.querySelectorAll('.carousel-slide');
        let dots = document.querySelectorAll('.dot');

        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(slide => {
            slide.style.display = 'none';
        });

        dots.forEach(dot => {
            dot.className = dot.className.replace(' active-dot', '');
        });

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].className += ' active-dot';
    }

    function scrollCatalog(direction) {
        const container = document.querySelector('.catalog-container');
        const scrollStep = 320;

        if (direction === 'prev') {
            container.scrollLeft -= scrollStep;
        } else if (direction === 'next') {
            container.scrollLeft += scrollStep;
        }
    }

    const modal = document.getElementById("productModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalPrice = document.getElementById("modalPrice");
    const span = document.getElementsByClassName("close")[0];

    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = item.querySelector('img').src;
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;
            const price = item.querySelector('p:nth-of-type(2)').textContent;

            modalImage.src = imgSrc;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalPrice.textContent = price;

            modal.style.display = "block";
        });
    });

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const addToCartButton = document.getElementById("addToCartButton");
    addToCartButton.addEventListener('click', function() {
        alert('Produto adicionado ao carrinho!');
        modal.style.display = "none";
    });
});
const confirmationMessage = document.getElementById("confirmationMessage");

addToCartButton.addEventListener('click', function() {
    confirmationMessage.style.display = "block";
    setTimeout(() => {
        confirmationMessage.style.display = "none";
    }, 3000); // Esconde a mensagem após 3 segundos
    modal.style.display = "none";
});

document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.querySelector('.cart-button');
    const modal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close');
    const addToCartButtons = document.querySelectorAll('.item button');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const finishPurchaseButton = document.getElementById('finishPurchaseButton'); // Seleciona o botão de Finalizar Compra

    // Abre o modal do carrinho
    cartButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Fecha o modal quando o botão de fechar é clicado
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fecha o modal quando se clica fora do modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Função para adicionar itens ao carrinho
    function addItemToCart(item) {
        const cartItems = document.querySelector('.cart-items');
        const cartCount = document.querySelector('.cart-count');

        // Verifica se o item já está no carrinho
        let existingItem = cartItems.querySelector(`.cart-item[data-id="${item.id}"]`);
        if (existingItem) {
            let quantityElement = existingItem.querySelector('.cart-item-quantity');
            quantityElement.textContent = `Quantidade: ${parseInt(quantityElement.textContent.split(': ')[1]) + 1}`;
        } else {
            // Cria um novo elemento para o item do carrinho
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.setAttribute('data-id', item.id);

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-quantity">Quantidade: ${item.quantity}</div>
                </div>
                <div class="cart-item-price">${item.price}</div>
            `;

            cartItems.appendChild(cartItem);
        }

        // Atualiza o contador do carrinho
        cartCount.textContent = parseInt(cartCount.textContent) + 1;

        // Exibe a mensagem de confirmação
        confirmationMessage.style.display = 'block';
        setTimeout(() => {
            confirmationMessage.style.display = 'none';
        }, 2000);

     }

    // Adiciona evento de clique para cada botão "Adicionar ao Carrinho"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.item');
            const product = {
                id: productCard.querySelector('img').alt,
                name: productCard.querySelector('h3').textContent,
                price: productCard.querySelector('p:nth-of-type(2)').textContent,
                image: productCard.querySelector('img').src,
                quantity: 1
            };
            addItemToCart(product);
        });
    });

    finishPurchaseButton.addEventListener('click', () => {
        const cartItems = document.querySelectorAll('.cart-item');
        let products = [];
        
        cartItems.forEach(item => {
            const name = item.querySelector('.cart-item-name').textContent;
            const price = item.querySelector('.cart-item-price').textContent;
            products.push(`${name} - ${price}`);
        });

        const message = encodeURIComponent(`Olá, gostaria de finalizar a compra dos seguintes produtos: \n${products.join('\n')}`);
        const whatsappLink = `https://wa.me/+5512991829506?text=${message}`;

        window.open(whatsappLink, '_blank');
        modalCart.style.display = 'none';
    });

    
});

