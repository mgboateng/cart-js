const Cart = require('../cart');
const assert = require('chai').assert;
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');



describe('Cart', function () {

    afterEach(function () {
        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./scratch');
        }
        localStorage.clear();
    });

    describe('#getAll()', function () {
        it('should contain cart and items key', function () {
            const cart = new Cart();
            let result = cart.getAll();
            assert.containsAllKeys(result, ['items', 'cart_total']);
        });

        it('should contain items of type array', function () {
            const cart = new Cart();
            let result = cart.getAll();
            assert.typeOf(result.items, 'array');
        });
    });

    describe('#addItem', function () {
        it('should add new item into cart', function () {
            const cart = new Cart();
            cart.addItem({
                id: 1,
                product: "Baby food",
                price: 10,
                quantity: 4
            });
            cart.addItem({
                id: 2,
                product: "Mac Book",
                price: 1200,
                quantity: 4
            });
            let result = cart.getAll();
            assert.strictEqual(result.items.length, 2);
        });

        it('should calculate and update the total of all items added to cart', function () {
            const cart = new Cart();
            let item = {
                id: 1,
                product: "Baby food",
                price: 10,
                quantity: 4
            };
            cart.addItem(item);
            let result = cart.getAll();
            assert.strictEqual(result.cart_total, 40);
        });
    });

    describe('#getItem', function () {
        it('should return an item with the provided id', function () {
            const cart = new Cart();
            cart.addItem({
                id: 1,
                product: "Baby food",
                price: 10,
                quantity: 4
            });
            cart.addItem({
                id: 2,
                product: "Mac Book",
                price: 1200,
                quantity: 4
            });
            let result = cart.getItem(2);
            assert.equal(result.items.id, 2);
        });

        it('should return the total of the item', function () {
            const cart = new Cart();
            cart.addItem({
                id: 1,
                product: "Baby food",
                price: 10,
                quantity: 4
            });
            cart.addItem({
                id: 2,
                product: "Mac Book",
                price: 1200,
                quantity: 4
            });
            let result = cart.getItem(2);
            assert.equal(result.cart_total, 4800);
        });

    });

    describe('#deleteItem', function () {
        it('should remove an added item from the cart log', function () {
            const cart = new Cart();
            cart.addItem({
                id: 1,
                product: "Baby food",
                price: 10,
                quantity: 4
            });
            cart.addItem({
                id: 2,
                product: "Mac Book",
                price: 1200,
                quantity: 4
            });
            cart.deleteItem(2);
            let result = cart.getAll();
            assert.equal(result.items.length, 1);
        });

        it('should should recalculate to total for the remaining items', function () {
            it('should remove an added item from the cart log', function () {
                const cart = new Cart();
                cart.addItem({
                    id: 1,
                    product: "Baby food",
                    price: 10,
                    quantity: 4
                });
                cart.addItem({
                    id: 2,
                    product: "Mac Book",
                    price: 1200,
                    quantity: 4
                });
                cart.deleteItem(1);
                let result = cart.getAll();
                assert.equal(result.cart_total, 4800);
                assert.equal(result.items.length, 1);
            });
        });
    });

    describe('#forget', function () {
        it('should reset the cart log by removing all items', function () {
            const cart = new Cart();
            cart.addItem({
                id: 1,
                product: "Baby food",
                price: 10,
                quantity: 4
            });
            cart.addItem({
                id: 2,
                product: "Mac Book",
                price: 1200,
                quantity: 4
            });
            cart.forget();
            let result = cart.getAll();
            assert.equal(result.cart_total, 0);
            assert.equal(result.items.length, 0);
        });
    });

    describe('#updateItem', function () {
        it('should it could edit an alread', function () {
            const cart = new Cart();
            let item = {
                id: 1,
                product: "Baby food",
                price: 10,
                quantity: 4
            };
            cart.addItem(item);
            let result = cart.getAll();
            assert.equal(result.cart_total, 40);

            cart.updateItem({
                id: 1,
                product: "Baby doll",
                price: 10,
                quantity: 10
            }, 1);
            let updated_result = cart.getAll();
            assert.equal(updated_result.cart_total, 100);
        });

    });

});
