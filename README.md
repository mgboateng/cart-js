<h1 style="text-align: center">Shopping Cart Package JavaScript</h1>

This package makes it easier to add and manage a shopping cart in JavaScript application. Logs are stored in localStorage.

## Installation
To install require the Cart module and instantiate the class to use it as below:

```JavaScript
const Cart = require('path to module/cart');

let cart = new Cart();
```

## Usage
The package have the following requirement. Object acceptable to the Cart must
-have an `id` field and must be unique
-must have a quantity field of integer value,
-must have a price field of float value

To add item to cart:
```JavaScript
let cart = new Cart();
cart.add({id: 1, product: "Baby food", price: 10, quantity: 4});
```

To add item to retrieve all:
```JavaScript
let cart = new Cart();
let result = cart.getAll();

//the above returns an object of
{
    items: [
        {id: 1, product: "Baby food", price: 10, quantity: 4}
    ],
    cart_total: 40
}
```
Cart will alway calculate the total amount of all item on the log.

To update pass in the object and the `id` of the item you want to edit and the total amount with be adjusted accordingly.
```JavaScript
cart.updateItem({id: 1, product: "Baby doll", price: 10, quantity: 10}, 1);
```

To get a single item from the log, pass in the `id` as the sole parameter into the getItem method `let result = cart.getItem(1);`

To remove an item from the cart log pass in the `id` as the sole parameter in the deleteItem method
```JavaScript
cart.delete(1)
```
To drop the entire cart log call the `forget()` on the cart `cart.forget()`