import React from "react";
import Edit from "./Edit";
// import { Route, BrowserRouter as Router, Link } from "react-router-dom";

class Products extends React.Component {
  state = {
    addToCartClick: false,
  };

  // ====================================== OPEN CHECKOUT ==================================
  openCheckout = () => {
    let cartPopUp = document.getElementById("cart-popup");
    let cartContent = document.getElementById("cart-content");

    if (this.props.checkoutOpenedOnce === false) {
      cartPopUp.classList.toggle("show");
      cartContent.classList.toggle("slide");
    } else {
    }
  };

  // ===================================== ADD ITEM TO THE CART ==================================
  addToCart = () => {
    this.openCheckout();

    let id = this.props.item.id;
    let name = this.props.item.name;
    let price = this.props.item.price;
    let image = this.props.item.image;

    let cartTotal = this.props.sumOfCart;

    let cartArray = this.props.cartItems;

    // IF THE ITEM IS ALREADY IN THE CART
    cartArray.push({ id, name, price, image });

    // ADDING ALL THE PRICE VALUES IN THE ARRAY
    let sum = cartArray.reduce((previousValue, currentValue) => {
      return {
        price: parseFloat(previousValue.price) + parseFloat(currentValue.price),
      };
    });

    cartTotal.push(sum);

    this.props.showCartItems();
    console.log(cartArray);

    this.setState({
      addToCartClick: true,
    });
  };

  // ============================== REMOVE ITEM FROM THE CART =================================
  removeFromCart = () => {
    let id = this.props.item.id;
    let cartArray = this.props.cartItems;
    let cartTotal = this.props.sumOfCart;

    let itemToRemoveIndex = cartArray.findIndex(function (item) {
      return item.id === id;
    });

    // PROCEED TO REMOVE ITEM ONLY IF IT EXISTS
    if (itemToRemoveIndex !== -1) {
      cartArray.splice(itemToRemoveIndex, 1);
    }
    console.log(itemToRemoveIndex);

    // ADDING THE PRICES IN THE CART AFTER REMOVAL OF ONE
    var sum = cartArray.reduce((previousValue, currentValue) => {
      return {
        price: parseFloat(previousValue.price) + parseFloat(currentValue.price),
      };
    });

    cartTotal.push(sum);
    // cartTotal.splice(sum, 2);

    this.props.showCartItems();

    console.log(cartArray);

    this.setState({
      addToCartClick: false,
    });
  };

  render() {
    let id = this.props.item.id;
    let cartArray = this.props.cartItems;

    return (
      <div className="items">
        <h2> Name: {this.props.item.name} </h2>

        <img className="product-img" src={this.props.item.image} alt="" />

        {this.props.item.stock < 10 && this.props.item.stock > 0 ? (
          <h4 className="stock-warning">
            ONLY {this.props.item.stock} LEFT IN STOCK
          </h4>
        ) : null}

        <h2> Price: {this.props.item.price} </h2>

        {this.props.user ? (
          <Edit
            user={this.props.user}
            item={this.props.item}
            updateProduct={this.props.updateProduct}
            deleteProduct={this.props.deleteProduct}
          ></Edit>
        ) : null}

        {this.props.user ? (
          <div>
            {cartArray.some((item) => item.id === id) ? (
              <div>
                <button className="already-in-cart">IN CART</button>
                <i
                  onClick={this.removeFromCart}
                  className="far fa-trash-alt"
                ></i>
              </div>
            ) : (
              <button className="add-to-cart" onClick={this.addToCart}>
                ADD TO CART
              </button>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
// For user product click page (goes inside return but can't comment out)
// <ViewProduct item={this.props.item} />

export default Products;
