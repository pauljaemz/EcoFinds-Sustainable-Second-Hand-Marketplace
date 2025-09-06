import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Adjust the URL as needed

// User Authentication
export const signup = async (userData) => {
    const response = await axios.post(`${API_URL}/users/signup/`, userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/users/login/`, credentials);
    return response.data;
};

// Product Listings
export const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/products/`);
    return response.data;
};

export const fetchProductById = async (id) => {
    const response = await axios.get(`${API_URL}/products/${id}/`);
    return response.data;
};

export const createProduct = async (productData, token) => {
    const response = await axios.post(`${API_URL}/products/`, productData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Cart Management
export const fetchCart = async (token) => {
    const response = await axios.get(`${API_URL}/cart/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const addToCart = async (cartData, token) => {
    const response = await axios.post(`${API_URL}/cart/`, cartData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Orders
export const fetchOrders = async (token) => {
    const response = await axios.get(`${API_URL}/orders/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const createOrder = async (orderData, token) => {
    const response = await axios.post(`${API_URL}/orders/`, orderData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};