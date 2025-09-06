import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard';
import Listings from './components/Listings';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Purchases from './components/Purchases';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';

function App() {
  return (
    <Router>
      <div>
        <SearchBar />
        <CategoryFilter />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/listings" component={Listings} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/purchases" component={Purchases} />
          <Route path="/" exact component={Listings} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;