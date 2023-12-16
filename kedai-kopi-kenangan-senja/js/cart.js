let cartItems = []; // Array to store cart items

function addToCart(e, img, name, price) {
  e.preventDefault(); // Prevent the default behavior of the event (e.g., form submission)

  const item = {
    image: img,
    name: name,
    price: price,
    quantity: 1, // Initial quantity
    // Add other details like image URL if needed
  };

  // Check if item already exists in cart
  const existingItem = cartItems.find((cartItem) => cartItem.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push(item);
  }

  updateCartDisplay();
}

function updateCartDisplay() {
  const cartDisplay = document.getElementById('cart-display');
  cartDisplay.innerHTML = ''; // Clear previous content

  let totalPrice = 0;

  cartItems.forEach((item) => {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');

    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item-container');

    const itemImage = document.createElement('img');
    itemImage.src = `img/products/${item.image}.jpg`; // Change item.image to your image URL or path
    itemImage.classList.add('item-image');

    const itemDetails = document.createElement('div');
    itemDetails.classList.add('item-details');

    const itemName = document.createElement('span');
    itemName.classList.add('item-name');
    itemName.textContent = item.name;

    const itemPrice = document.createElement('span');
    itemPrice.classList.add('item-price');
    itemPrice.textContent = `Rp. ${item.price}`;

    const quantityAdjust = document.createElement('div');
    quantityAdjust.classList.add('quantity-adjust');
    const decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.onclick = () => decreaseQuantity(item.name);
    const quantitySpan = document.createElement('span');
    quantitySpan.classList.add('quantity');
    quantitySpan.textContent = item.quantity;
    const increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.onclick = () => increaseQuantity(item.name);

    const totalPricePerItem = document.createElement('span');
    totalPricePerItem.textContent = `Total: Rp. ${item.quantity * item.price}`;

    itemContainer.appendChild(itemImage);
    itemDetails.appendChild(itemName);
    itemDetails.appendChild(itemPrice);
    itemDetails.appendChild(quantityAdjust);
    itemDetails.appendChild(totalPricePerItem);

    quantityAdjust.appendChild(decreaseButton);
    quantityAdjust.appendChild(quantitySpan);
    quantityAdjust.appendChild(increaseButton);

    cartItemElement.appendChild(itemContainer);
    cartItemElement.appendChild(itemDetails);
    cartDisplay.appendChild(cartItemElement);

    // Calculate total price
    totalPrice += item.price * item.quantity;
  });

  const itemDetailsInput = document.getElementById('itemDetails'); // Replace with your input field ID
  itemDetailsInput.value = JSON.stringify(cartItems);

  // Update the total price in the HTML
  const totalElement = document.getElementById('totalPrice');
  totalElement.textContent = `RP. ${totalPrice}`;
   // Update the total input field in the form
   const totalInput = document.getElementById('totalInput'); // Replace 'totalInput' with your input field ID
   totalInput.value = totalPrice; // Update the input field value
}

function increaseQuantity(name) {
  const item = cartItems.find((cartItem) => cartItem.name === name);
  if (item) {
    item.quantity++;
    updateCartDisplay();
    event.stopPropagation();
  }
}

function decreaseQuantity(name) {
  const item = cartItems.find((cartItem) => cartItem.name === name);
  if (item && item.quantity > 1) {
    item.quantity--;
    updateCartDisplay();
  } else if (item && item.quantity === 1) {
    // Remove item from cart if quantity becomes 1 and user clicks -
    cartItems = cartItems.filter((cartItem) => cartItem.name !== name);
    updateCartDisplay();
    event.stopPropagation();
  }
}
