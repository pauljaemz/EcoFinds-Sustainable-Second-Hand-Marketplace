import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Purchases = () => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await axios.get('/api/orders'); // Adjust the endpoint as necessary
                setPurchases(response.data);
            } catch (error) {
                console.error('Error fetching purchases:', error);
            }
        };

        fetchPurchases();
    }, []);

    return (
        <div>
            <h1>Previous Purchases</h1>
            {purchases.length === 0 ? (
                <p>No purchases found.</p>
            ) : (
                <ul>
                    {purchases.map((purchase) => (
                        <li key={purchase.id}>
                            <h2>{purchase.product.title}</h2>
                            <p>Price: ${purchase.product.price}</p>
                            <p>Purchased on: {new Date(purchase.timestamp).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Purchases;