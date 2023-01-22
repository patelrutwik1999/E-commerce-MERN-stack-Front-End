//Add product in the local storage
export const addItem = (item, next) => {
    let cart = []
    if (typeof window != 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart')) // To get all the items in json format
        }
        cart.push({
            ...item,
            count: 1
        })

        // To avoid duplicated item
        // Build an array from new set and turn it back into array using Array.from
        // so that later we can re-map it
        // new set will only allow unique values in it
        // so pass the ids of each object/product
        // If the loop tries to add the same value again, it'll be ignored
        // ...with the array of ids we got on when first map() was used.
        // run map() on it again and return the actual product from the cart.

        cart = Array.from(new Set(cart.map((product) => (product._id)))).map((id) => {
            return cart.find(product => product._id === id)
        })

        localStorage.setItem('cart', JSON.stringify(cart))
        next()
    }
}

//Total items in the cart
export const itemTotalInCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
    return 0;
}

//get all items from local storage
export const getCartFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
}

export const cartUpdateItem = (productId, count) => {
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        //console.log(count)
        cart.map((product, i) => {
            if (product._id === productId) {
                cart[i].count = count
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

export const removeCartItem = (productId) => {
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        //console.log(count)
        //Splice(first element to splice, how many element to splice)
        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1)
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart
}

export const emptyCart = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
        next();
    }
};