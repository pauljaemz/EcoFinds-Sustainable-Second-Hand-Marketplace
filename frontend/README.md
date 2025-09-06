# EcoFinds Frontend

This is the frontend part of the EcoFinds project, a platform that connects buyers and sellers through product listings. The frontend is built using React and provides a user-friendly interface for interacting with the backend services.

## Project Structure

- **public/**: Contains static files, including the main HTML file.
  - **index.html**: The entry point for the web application.

- **src/**: Contains the source code for the React application.
  - **App.js**: The root component that sets up routing and layout.
  - **index.js**: The entry point for rendering the App component.
  - **components/**: Contains all the React components used in the application.
    - **Auth/**: Components related to user authentication.
      - **Login.js**: Component for user login.
      - **Signup.js**: Component for user registration.
    - **Dashboard.js**: Component for user profile management.
    - **Listings.js**: Component for displaying product listings.
    - **ProductCard.js**: Component for individual product display.
    - **ProductDetail.js**: Component for viewing product details.
    - **SearchBar.js**: Component for searching products.
    - **CategoryFilter.js**: Component for filtering products by category.
    - **Cart.js**: Component for managing the shopping cart.
    - **Purchases.js**: Component for viewing past purchases.
  - **api/**: Contains functions for making API calls to the backend.
    - **index.js**: API service functions.

## Getting Started

To get started with the EcoFinds frontend, follow these steps:

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd ecofinds-platform/frontend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Features

- User authentication (signup and login).
- User dashboard for profile management.
- Product listings with detailed views.
- Search and filter functionality for products.
- Shopping cart management and purchase history tracking.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.