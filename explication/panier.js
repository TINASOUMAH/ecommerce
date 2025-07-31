/*🧠 Objectif général du JS :
Charger les articles depuis localStorage

Les afficher dynamiquement dans le HTML

Supprimer un article si on clique sur "Supprimer"

Recalculer le total à chaque changement

🔸 Fonction getCart()
js
Copier
Modifier
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}
🔹 Elle lit la variable cart stockée dans le localStorage du navigateur.
🔸 Si rien n’est trouvé, elle retourne un tableau vide [].
➡️ Résultat : un tableau d’objets produits { title, price, img }

🔸 Fonction setCart(cart)
js
Copier
Modifier
function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
🔹 Elle enregistre le panier dans le navigateur.
🔸 Elle convertit le tableau JavaScript en chaîne JSON avec JSON.stringify().

🔸 Fonction updateCartDisplay()
js
Copier
Modifier
function updateCartDisplay() {
    const cart = getCart();
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
➡️ On récupère :

le panier avec getCart()

la zone HTML #cartItems (les produits)

la zone #cartTotal (le total)

🧾 Si le panier est vide :
js
Copier
Modifier
    if (!cart.length) {
        cartItems.innerHTML = '<div class="empty-cart">Votre panier est vide.</div>';
        cartTotal.textContent = '';
        return;
    }
✅ Affiche le message "Votre panier est vide"
✅ Efface le total

🧾 Si le panier contient des produits :
js
Copier
Modifier
    let total = 0;
    cartItems.innerHTML = cart.map((item, idx) => {
        total += item.price;
On initialise le total à 0

Pour chaque produit :

On ajoute son prix au total

On crée un bloc HTML avec image, titre, prix et bouton supprimer

🧾 Génération dynamique du HTML :
js
Copier
Modifier
        return `<div class='cart-item'>
            <img src='${item.img}' alt='${item.title}'>
            <div class='cart-item-info'>
                <div class='cart-item-title'>${item.title}</div>
                <div class='cart-item-price'>${item.price} GNF</div>
            </div>
            <button class='remove-cart-item' onclick='removeFromCart(${idx})'>Supprimer</button>
        </div>`;
    }).join('');
🔹 Chaque produit est affiché avec :

Son image

Son titre

Son prix

Un bouton Supprimer, qui appelle removeFromCart(idx)

🔸 .join('') permet d’assembler tous les blocs HTML en une seule chaîne

🧾 Affichage du total
js
Copier
Modifier
    cartTotal.textContent = 'Total : ' + total + ' GNF';
}
✅ Affiche le montant total du panier à la fin.

🔸 Fonction removeFromCart(idx)
js
Copier
Modifier
function removeFromCart(idx) {
    let cart = getCart();
    cart.splice(idx, 1); // supprime l'article à l'index idx
    setCart(cart);       // met à jour le localStorage
    updateCartDisplay(); // réaffiche le panier à jour
}
🔹 Supprime un article du panier selon son index idx

🔸 Autorisation globale
js
Copier
Modifier
window.removeFromCart = removeFromCart;
✅ Rend la fonction accessible depuis le bouton onclick='removeFromCart(...)' dans le HTML généré dynamiquement.

🔸 Chargement initial
js
Copier
Modifier
updateCartDisplay();
✅ Quand la page se charge, on appelle la fonction pour afficher les produits enregistrés dans le panier.

🎁 Résultat attendu :
Quand tu ouvres la page :

Le panier s'affiche avec les produits du localStorage

Tu peux cliquer sur Supprimer → l’article disparaît + le total est recalculé

Si tout est supprimé → message "Votre panier est vide"

Souhaites-tu que je t’aide à ajouter un produit au panier via un bouton ou une autre page (index.html par exemple) ?









Demander à ChatGPT
*/

/**Très bien, je vais t’expliquer le JavaScript mot par mot, de façon simple et claire, comme si on le lisait ensemble ligne par ligne 👇

🔹 1. Fonction getCart()
js
Copier
Modifier
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
Mot ou expression	Explication
function	On crée une fonction (une sorte de machine à exécuter des instructions)
getCart	Nom de la fonction : signifie "obtenir le panier"
()	Les parenthèses servent à appeler la fonction
{ ... }	Tout ce qui est à l’intérieur est le code exécuté
localStorage	Mémoire du navigateur pour stocker des données (ici le panier)
.getItem('cart')	On va chercher dans localStorage la valeur qui a le nom cart
`	
JSON.parse(...)	Transforme le texte du panier en un vrai tableau JavaScript
return	Renvoie le panier à celui qui a appelé la fonction

Résumé : cette fonction lit le panier depuis la mémoire du navigateur.

🔹 2. Fonction setCart(cart)
js
Copier
Modifier
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
Mot ou expression	Explication
function	On crée une fonction
setCart	Nom : signifie "enregistrer le panier"
(cart)	On reçoit une variable appelée cart (c’est notre nouveau panier)
localStorage.setItem	On enregistre un élément dans le localStorage
'cart'	Le nom sous lequel on enregistre les données
JSON.stringify(cart)	Convertit le panier en texte (parce que le navigateur stocke du texte)

Résumé : cette fonction sauvegarde le panier dans le navigateur.

🔹 3. Fonction updateCartDisplay()
js
Copier
Modifier
function updateCartDisplay() {
Mot ou expression	Explication
updateCartDisplay	Nom de la fonction : signifie "mettre à jour l'affichage du panier"

js
Copier
Modifier
  const cart = getCart();
const = on crée une variable constante

cart = le nom de la variable (notre panier)

getCart() = on appelle la fonction qu’on a faite plus haut pour récupérer le panier

js
Copier
Modifier
  const cartItems = document.getElementById('cartItems');
On récupère l’endroit dans le HTML où on veut mettre les produits (div avec id="cartItems")

js
Copier
Modifier
  const cartTotal = document.getElementById('cartTotal');
On récupère la zone où on affichera le total du panier

Si le panier est vide :
js
Copier
Modifier
  if (!cart.length) {
if = "si"

!cart.length = si le panier est vide (pas d’élément)

js
Copier
Modifier
    cartItems.innerHTML = '<div class="empty-cart">Votre panier est vide.</div>';
On met ce message dans la page

js
Copier
Modifier
    cartTotal.textContent = '';
On vide le total

js
Copier
Modifier
    return;
On arrête la fonction ici

Si le panier n’est pas vide :
js
Copier
Modifier
  let total = 0;
On commence le total à 0

js
Copier
Modifier
  cartItems.innerHTML = cart.map((item, idx) => {
On transforme chaque produit du panier en HTML

item = chaque produit

idx = son numéro (0, 1, 2...)

js
Copier
Modifier
    total += item.price;
On ajoute le prix de chaque produit au total

js
Copier
Modifier
    return `<div class='cart-item'> ... </div>`;
On construit une boîte HTML avec les infos du produit (image, nom, prix, bouton)

js
Copier
Modifier
  }).join('');
On assemble tous les blocs HTML en un seul texte

js
Copier
Modifier
  cartTotal.textContent = 'Total : ' + total + ' GNF';
On affiche le prix total dans la page

🔹 4. Fonction removeFromCart(idx)
js
Copier
Modifier
function removeFromCart(idx) {
On crée une fonction qui reçoit le numéro de l’article à supprimer

js
Copier
Modifier
  let cart = getCart();
On récupère le panier

js
Copier
Modifier
  cart.splice(idx, 1);
splice supprime 1 élément à l'index donné

js
Copier
Modifier
  setCart(cart);
On enregistre le panier modifié

js
Copier
Modifier
  updateCartDisplay();
On rafraîchit l’affichage

🔹 5. Donner accès à la fonction dans le HTML
js
Copier
Modifier
window.removeFromCart = removeFromCart;
Le window permet de rendre la fonction accessible dans le HTML

Sinon le bouton "Supprimer" ne pourrait pas l’appeler

🔹 6. Lancer tout au début
js
Copier
Modifier
updateCartDisplay();
Quand la page charge, on affiche tout de suite le panier

Souhaites-tu maintenant que je dessine le panier en image pour mieux visualiser, ou que je t’aide à créer un bouton "Ajouter au panier" sur une autre page ?









Demander à ChatGPT
✅ Pour que le clic sur "Ajouter" fonctionne, il faut :
Une page produit ou catalogue (ex : index.html)

Un bouton Ajouter au panier pour chaque produit

Du JavaScript qui :

lit le panier actuel avec getCart()

ajoute le nouveau produit

enregistre avec setCart()

🔧 Exemple de code "ajouter au panier"
Voici un exemple de bouton avec JavaScript associé :

👇 HTML (dans index.html)
html
Copier
Modifier
<button onclick="ajouterAuPanier('Savon naturel', 15000, 'images/savon.jpg')">
  Ajouter au panier
</button>
👇 JavaScript
html
Copier
Modifier
<script>
  function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function ajouterAuPanier(titre, prix, image) {
    const cart = getCart();
    cart.push({
      title: titre,
      price: prix,
      img: image
    });
    setCart(cart);
    alert('✅ Article ajouté au panier !');
  }
</script>
📌 Résumé :
Action	Partie du code
Ajouter produit	cart.push(...)
Enregistrer le panier	setCart(cart)
Lire le panier	getCart()
Afficher le panier	updateCartDisplay() dans panier.html
Supprimer un produit	removeFromCart(idx)

Souhaites-tu que je t’aide à créer une page complète index.html avec plusieurs produits et leurs boutons "Ajouter au panier" ?









Demander à ChatGPT
Vous avez dit :
explique le code la


ChatGPT a dit :
Très bien ! Voici une explication mot par mot et ligne par ligne du code "Ajouter au panier" que je t’ai montré :

✅ Le bouton HTML :
html
Copier
Modifier
<button onclick="ajouterAuPanier('Savon naturel', 15000, 'images/savon.jpg')">
  Ajouter au panier
</button>
Élément	Explication
<button>	Crée un bouton
onclick="..."	Quand on clique dessus, ça exécute la fonction ajouterAuPanier(...)
'Savon naturel'	Nom du produit
15000	Prix du produit
'images/savon.jpg'	Chemin de l’image du produit
Ajouter au panier	Texte affiché sur le bouton

🧠 Quand tu cliques, ça appelle la fonction avec 3 arguments : le titre, le prix, et l’image.

✅ Le JavaScript :
1. Fonction getCart()
js
Copier
Modifier
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
Mot ou expression	Explication
function	On crée une fonction
getCart()	Elle s'appelle "obtenir le panier"
localStorage.getItem('cart')	On récupère ce qui est stocké sous le nom "cart"
`	
JSON.parse(...)	Transforme le texte en tableau JavaScript
return	On retourne le panier

👉 Ça récupère le panier actuel dans le navigateur.

2. Fonction setCart(cart)
js
Copier
Modifier
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
Mot ou expression	Explication
function	Déclare une fonction
setCart(cart)	Reçoit un panier (un tableau)
JSON.stringify(cart)	Transforme le panier en texte JSON
localStorage.setItem('cart', ...)	Enregistre le panier dans le navigateur

👉 Ça sauvegarde le panier modifié.

3. Fonction ajouterAuPanier(...)
js
Copier
Modifier
function ajouterAuPanier(titre, prix, image) {
Élément	Explication
ajouterAuPanier	C’est le nom de la fonction
titre, prix, image	Ce sont les valeurs qu’on reçoit (ex : "Savon", 15000, "images/savon.jpg")

js
Copier
Modifier
  const cart = getCart();
On récupère le panier actuel

js
Copier
Modifier
  cart.push({
    title: titre,
    price: prix,
    img: image
  });
Élément	Explication
cart.push(...)	Ajoute un nouvel élément dans le panier
{ title: ..., price: ..., img: ... }	C’est le produit qu’on ajoute, sous forme d’objet

🧠 C’est comme ajouter une boîte avec 3 infos : nom, prix, image

js
Copier
Modifier
  setCart(cart);
On sauvegarde le panier modifié

js
Copier
Modifier
  alert('✅ Article ajouté au panier !');
On affiche une boîte de message au client

✅ Résultat visuel
Quand tu cliques sur "Ajouter au panier" :

Le produit est ajouté dans localStorage

Tu peux aller sur panier.html pour voir le panier mis à jour automatiquement

Souhaites-tu que je t’envoie un fichier index.html complet avec plusieurs produits et boutons ?




 */

/*}
Mot ou expression	Explication
function	Déclare une fonction
setCart(cart)	Reçoit un panier (un tableau)
JSON.stringify(cart)	Transforme le panier en texte JSON
localStorage.setItem('cart', ...)	Enregistre le panier dans le navigateur* */