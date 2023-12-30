document.getElementById('checkoutForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Fetch form data
    let formData = new FormData(document.getElementById('checkoutForm'));
    let data = new URLSearchParams(formData);
    let objData = Object.fromEntries(data);

    let totalPriceElement = document.getElementById('totalPrice');
    let totalPriceText = totalPriceElement.textContent.trim();
    let totalPriceNumber = totalPriceText.replace(/[^\d]/g, '');
    document.querySelector('input[name="total"]').value = totalPriceNumber;

    let cartItems = document.querySelectorAll('.cart-item');

    let items = [];
    let randomId = 1;

    cartItems.forEach(item => {
        let productName = item.querySelector('.item-name').textContent.trim();
        let productPrice = item.querySelector('.item-price').textContent.trim().replace(/[^\d]/g, '');
        let productQuantity = item.querySelector('.quantity').textContent.trim();


        items.push({
            id: randomId++,
            name: productName,
            price: parseInt(productPrice,10),
            quantity: productQuantity
        });
    });

    objData['total'] = parseInt(totalPriceNumber,10); // Add 'items' key to objData with items array
    objData['items'] = JSON.stringify(items); // Add 'items' key to objData with items array

console.log(objData);
    try {
        const response = await fetch('php/placeOrder.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objData)
        })
        const token = await response.text();
        console.log('Received Snap Token:', token);
        window.snap.pay(token);
    } catch (error) {
        console.log(error.message);
    }


});