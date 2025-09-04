import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/CartPage.css";

const CartPage = () => {
  const { cart, clearCart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  // Ensure all prices are numbers
  const sanitizedCart = cart.map((item) => ({
    ...item,
    price:
      typeof item.price === "string"
        ? parseFloat(item.price.replace("₹", "").replace(",", ""))
        : item.price,
  }));

  const totalPrice = sanitizedCart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h2 className="cart-title">Cart</h2>

      {sanitizedCart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-layout">
          {/* LEFT - Cart Table */}
          <div className="cart-table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {sanitizedCart.map((item, index) => (
                  <tr key={index}>
                    <td className="cart-product">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-item-image"
                        />
                      )}
                      <div>
                        <strong>{item.name}</strong>
                        <div
                          className="remove-link"
                          onClick={() => removeFromCart(item.id)}
                        >
                          REMOVE
                        </div>
                      </div>
                    </td>
                    <td>₹{item.price.toFixed(2)}</td>
                    <td>
                      <div className="quantity-controls">
                        <button onClick={() => decreaseQuantity(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)}>+</button>
                      </div>
                    </td>
                    <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RIGHT - Cart Totals */}
          <div className="cart-summary">
            <h3>Cart totals</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
