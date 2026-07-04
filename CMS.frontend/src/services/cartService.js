const CART_KEY = "cart_items";

const cartService = {
    getCart: () => {
        const data = localStorage.getItem(CART_KEY);
        return data ? JSON.parse(data) : [];
    },

    saveCart: (cart) => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event("cartChanged"));
    },

    addToCart: (product, quantity = 1) => {
        const cart = cartService.getCart();
        const existing = cart.find((item) => item.id === product.id);
        const nextQuantity = Number(quantity) || 1;

        if (existing) {
            existing.quantity = Math.min(
                existing.quantity + nextQuantity,
                existing.stockQuantity ?? existing.quantity + nextQuantity
            );
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                stockQuantity: product.stockQuantity,
                quantity: Math.min(nextQuantity, product.stockQuantity ?? nextQuantity),
            });
        }

        cartService.saveCart(cart);
    },

    updateQuantity: (id, quantity) => {
        let cart = cartService.getCart();

        cart = cart.map((item) =>
            item.id === id
                ? {
                      ...item,
                      quantity: Math.min(
                          Math.max(0, quantity),
                          item.stockQuantity ?? Math.max(0, quantity)
                      ),
                  }
                : item
        );

        cart = cart.filter((item) => item.quantity > 0);

        cartService.saveCart(cart);
    },

    removeItem: (id) => {
        const cart = cartService.getCart().filter((item) => item.id !== id);
        cartService.saveCart(cart);
    },

    clearCart: () => {
        localStorage.removeItem(CART_KEY);
        window.dispatchEvent(new Event("cartChanged"));
    },

    getTotalQuantity: () => {
        return cartService.getCart().reduce((sum, item) => sum + item.quantity, 0);
    },
};

export default cartService;
