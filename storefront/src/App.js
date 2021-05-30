import React from "react";
import Products from "./components/Products";
import fire from "./config/fire";
import AddForm from "./components/AddForm";
import Nav from "./components/Nav";

import axios from "axios";

class App extends React.Component {
  state = {
    products: [],
    user: {},
    cartItems: [{ price: 0 }],
    sumOfCart: [],
    checkoutOpenedOnce: false,
  };

  // CART
  showCartItems = () => {
    this.setState({
      cartItems: this.state.cartItems,
      checkoutOpenedOnce: true,
    });
  };

  // AUTHENTICATION
  authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  };

  logOut = () => {
    fire.auth().signOut();
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };
  addProduct = (product) => {
    axios
      .post("https://spamazon-ga-backend.herokuapp.com/api/products", product)
      .then((response) => {
        this.getProducts();
      });
  };

  // PRODUCTS
  getProducts = () => {
    axios
      .get("https://spamazon-ga-backend.herokuapp.com/api/products")
      .then(
        (response) => this.setState({ products: response.data }),
        (err) => console.error(err)
      )
      .catch((error) => console.error(error));
  };
  updateProduct = (event, product) => {
    event.preventDefault();
    const id = event.target.id;

    axios
      .put(
        "https://spamazon-ga-backend.herokuapp.com/api/products/" + id,
        product
      )
      .then((response) => {
        this.getProducts();
      });
  };
  deleteProduct = (event) => {
    axios
      .delete(
        "https://spamazon-ga-backend.herokuapp.com/api/products/" +
          event.target.value
      )
      .then((response) => {
        this.getProducts();
      });
  };
  componentDidMount = () => {
    this.getProducts();
    this.authListener();
  };

  render = () => {
    return (
      <div>
        <Nav
          sumOfCart={this.state.sumOfCart}
          cartItems={this.state.cartItems}
          user={this.state.user}
          showCartItems={this.showCartItems}
          logOut={this.logOut}
        />

        <h1>Spamazon's black market (keep secret)</h1>

        {this.state.user ? (
          <AddForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            addProduct={this.addProduct}
            user={this.state.user}
          />
        ) : null}
        <div className="products">
          {this.state.products.map((item) => {
            return (
              <div key={item.id}>
                <Products
                  checkoutOpenedOnce={this.state.checkoutOpenedOnce}
                  sumOfCart={this.state.sumOfCart}
                  showCartItems={this.showCartItems}
                  cartItems={this.state.cartItems}
                  item={item}
                  user={this.state.user}
                  updateProduct={this.updateProduct}
                  deleteProduct={this.deleteProduct}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}

export default App;
