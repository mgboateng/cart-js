if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

class Cart {
    constructor() {
        this.cartName = "cart"; // name of cart key in storage
        this.total = "cart_total";  // name of total key in storage
        this.storage = localStorage;    // storage engine for cart

        //initialize if it does not exist
        if (! this.storage.getItem(this.cartName)) {
            let cart = {};
            cart.items = [];
            cart.cart_total = 0;
            this.storage.setItem(this.cartName, this._toJsonString(cart));
        }
    }

    /**
     * Add an item object to cart
     * @param object item
     */
    addItem(item) {
        let result = this.getAll(); // retrieve all items for storage
        let items = result.items;
        items.push(this._filter(item));
        result.items = items;
        result.cart_total = this._getotal(items);
        this.storage.setItem(this.cartName, this._toJsonString(result));
    }

    /**
     * Find cart item by it's id
     * @param  mix key
     * @return object
     */
    getItem(key) {
        let result = this.getAll();
        let items = result.items;
        let item = this._findById(items, key);
        return item;
    }

    /**
     * Fetch all log items on cart
     * @return object
     */
    getAll() {
        return this._toJsonObject(this.storage.getItem(this.cartName));
    }

    /**
     * Delete a single item from log
     * @param  mix key
     * @return object
     */
    deleteItem(key) {
        let result = this.getAll();
        let items = result.items;
        items.forEach((item, index) => {
            if(item.id === key) {
                items.splice(index, 1);
            }
        })
        result.items = items;
        result.cart_total = this._getotal(items);
        this.storage.setItem(this.cartName, this._toJsonString(result));
    }

    /**
     * Update an existing item in the cart log
     * @param  object item
     * @param  mix key
     * @return object
     */
    updateItem(newItem, key) {
        let result = this.getAll();
        let items = result.items;
        items.forEach((item, index) => {
            if(item.id === key) {
                items[index] = newItem;
            }
        });
        result.items = items;
        result.cart_total = this._getotal(items);
        this.storage.setItem(this.cartName, this._toJsonString(result));
    }

    /**
     * Drop all cart logs and reset storage
     * @return {[type]} [description]
     */
    forget() {
        localStorage.clear();
        let cart = {};
        cart.items = [];
        cart.cart_total = 0;
        this.storage.setItem(this.cartName, this._toJsonString(cart));
    }

    /**
     * Search array of object and return the object with the specified id
     * @param  array items
     * @param  mix key
     * @return object
     */
    _findById(items, key) {
        let result = {};
        items.forEach((item) => {
            if(item.id === key) {
                result.items = item;
                result.cart_total = item.quantity * item.price;
            }
        });
        return result;
    }

    /**
     * calculate the total cost of all log cart items
     * @param  array items
     * @return float
     */
    _getotal(items) {
        let total = 0;
        items.forEach((item) => {
            total += item.price * item.quantity;
        });

        return total;
    }

    /**
     * Convert object to json
     * @param  object obj
     * @return string
     */
    _toJsonString(obj) {
        let str = JSON.stringify(obj);
        return str;
    }

    /**
     * Return string to Object
     * @param  sting str
     * @return object
     */
    _toJsonObject(str) {
        let obj = JSON.parse(str);
        return obj;
    }

    /**
     * Filter through object and pass necessary defaults if not supplied
     * @param  object item
     * @return object
     */
    _filter(item){

        if (item.id == null) throw "id field is required";

        let quantity = item.quantity != null ?  parseFloat(item.quantity) : 1;
        item.quantity = quantity < 1 ? 1 : quantity;

        let price = item.price != null ? parseFloat(item.price) : parseFloat(0);
        item.price = price < 0 ? 0 : price;

        return item;
    }
}

module.exports = Cart;
