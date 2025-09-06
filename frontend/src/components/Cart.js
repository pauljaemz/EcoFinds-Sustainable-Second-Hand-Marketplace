import React, { useEffect, useState } from 'react';
import { getCartItems, removeFromCart, checkout } from '../api/index';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            const items = await getCartItems();
            setCartItems(items);
            setLoading(false);
        };
        fetchCartItems();
    }, []);

    const handleRemove = async (productId) => {
        await removeFromCart(productId);
        setCartItems(cartItems.filter(item => item.id !== productId));
    };

    const handleCheckout = async () => {
        await checkout(cartItems);
        setCartItems([]);
        alert('Checkout successful!');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            <h2>{item.product.title}</h2>
                            <p>Price: ${item.product.price}</p>
                            <button onClick={() => handleRemove(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            {cartItems.length > 0 && (
                <button onClick={handleCheckout}>Checkout</button>
            )}
        </div>
    );
};

export default Cart;