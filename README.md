# EcoFinds Platform

EcoFinds is a web application designed to connect buyers and sellers in a marketplace focused on products. The platform allows users to create accounts, manage their profiles, list products, and make purchases seamlessly.

## Project Structure

The project is divided into two main parts: the backend and the frontend.

### Backend

The backend is built using Django and Django REST Framework (DRF). It handles user authentication, product management, cart functionality, and order processing.

- **Users**: Manages user accounts and roles (Buyer/Seller).
- **Products**: Handles product listings, including CRUD operations.
- **Cart**: Manages the shopping cart for users.
- **Orders**: Processes purchases and maintains order history.

### Frontend

The frontend is built using React. It provides a user-friendly interface for interacting with the backend services.

- **Auth**: Contains components for user login and signup.
- **Dashboard**: Displays user profile and management options.
- **Listings**: Shows available products for buyers.
- **Cart**: Allows users to manage their selected products before purchase.
- **Purchases**: Displays the history of past purchases.

## Getting Started

### Prerequisites

- Python 3.x
- Node.js and npm

### Backend Setup

1. Navigate to the `backend` directory.
2. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```
3. Run the Django migrations:
   ```
   python manage.py migrate
   ```
4. Start the Django development server:
   ```
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Install the required npm packages:
   ```
   npm install
   ```
3. Start the React development server:
   ```
   npm start
   ```

## Features

- User authentication with role distinction (Buyer/Seller).
- Product listing and management for sellers.
- Search and filter functionality for buyers.
- Shopping cart and order management.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.