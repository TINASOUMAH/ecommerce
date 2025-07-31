// Stockage des données de connexion dans localStorage
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.querySelector('#loginModal form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;
      if (username && password) {
        localStorage.setItem('loginData', JSON.stringify({ username, password }));
        alert('Connexion enregistrée !');
        document.getElementById('loginModal').style.display = 'none';
      } else {
        alert('Veuillez remplir tous les champs.');
      }
    });
  }
});
// Gestion du modal de connexion
document.addEventListener('DOMContentLoaded', function() {
  const openLogin = document.getElementById('openLogin');
  const loginModal = document.getElementById('loginModal');
  const closeLoginModal = document.getElementById('closeLoginModal');
  if (openLogin && loginModal && closeLoginModal) {
    openLogin.addEventListener('click', function(e) {
      e.preventDefault();
      loginModal.style.display = 'flex';
    });
    closeLoginModal.addEventListener('click', function() {
      loginModal.style.display = 'none';
    });
    loginModal.addEventListener('click', function(e) {
      if (e.target === loginModal) loginModal.style.display = 'none';
    });
  }
});
// Ajout au panier depuis les cards produits et animation sur l'icône du panier
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = btn.closest('.produitcard');
      const img = card.querySelector('img').getAttribute('src');
      const title = card.querySelector('h3').textContent;
      const price = parseInt(card.querySelector('.prix').textContent);
      // On ajoute le produit au panier (en gérant la quantité si déjà présent)
      let cart = getCart();
      let found = cart.find(item => item.title === title && item.price === price && item.img === img);
      if (found) {
        found.qty = (found.qty || 1) + 1;
      } else {
        cart.push({ img, title, price, qty: 1 });
      }
      saveCart(cart);
      updateCartCount && updateCartCount();
      // Animation sur l'icône du panier
      const panierIcon = document.getElementById('openCart').querySelector('i');
      panierIcon.classList.add('cart-bounce');
      setTimeout(() => panierIcon.classList.remove('cart-bounce'), 500);
    });
  });
});

// Fonction pour récupérer le panier depuis le localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Fonction pour sauvegarder le panier dans le localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Fonction pour mettre à jour l'affichage du nombre d'articles sur l'icône panier
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  let badge = document.querySelector('.cart-count-badge');
  if (!badge) {
    const panierIcon = document.querySelector('.fa-shopping-cart');
    if (panierIcon) {
      badge = document.createElement('span');
      badge.className = 'cart-count-badge';
      badge.style.position = 'absolute';
      badge.style.top = '-8px';
      badge.style.right = '-8px';
      badge.style.background = '#e74c3c';
      badge.style.color = 'white';
      badge.style.borderRadius = '50%';
      badge.style.fontSize = '12px';
      badge.style.padding = '2px 6px';
      badge.style.zIndex = '10';
      panierIcon.parentElement.style.position = 'relative';
      panierIcon.parentElement.appendChild(badge);
    }
  }
  if (badge) badge.textContent = count;
}

// Fonction pour ajouter un produit au panier
function addToCart(product) {
  const cart = getCart();
  const found = cart.find(item => item.name === product.name);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  updateCartCount();
}

// Initialisation des boutons "ajouter au panier"
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.trim().toLowerCase() === 'ajouter au panier') {
      btn.addEventListener('click', function(e) {
        const card = btn.closest('.produitcard');
        if (!card) return;
        const name = card.querySelector('h3')?.textContent || 'Produit';
        const price = card.querySelector('.prix')?.textContent || '0GNF';
        const img = card.querySelector('img')?.getAttribute('src') || '';
        addToCart({ name, price, img });
      });
    }
  });
});
//pour changer l'anne directement//
const date=document.querySelector("#annee")
date.textContent=new Date().getFullYear()