import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  // On récupère le tableau d'articles du store Redux
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  /**
   * Calcule le montant total du panier
   *  {number} total du panier
   */
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.cost * item.quantity;
    });
    return total;
  };

  /**
   * Calcule la quantité totale d'articles dans le panier
   * nombre total d'articles
   */
  const calculateTotalItems = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  /**
   * Calcule le coût total pour un article précis (sous-total)
   *  - l'article dont on veut calculer le sous-total
   *  sous-total pour cet article
   */
  const calculateTotalCost = (item) => {
    return item.cost * item.quantity;
  };

  /**
   * Incrémente la quantité d'un article
   *  - l'article concerné
   */
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  /**
   * Décrémente la quantité d'un article
   * Si la quantité passe à 0, on retire l'article du panier
   * - l'article concerné
   */
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Si la quantité est déjà à 1 et qu'on décrémente, on supprime l'article
      dispatch(removeItem(item.name));
    }
  };

  /**
   * Retire complètement l'article du panier
   *  item - l'article concerné
   */
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  /**
   * Gère l'action "Continuer vos achats"
   */
  const handleContinueShopping = () => {
    onContinueShopping();
  };
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      {/* Affiche la quantité totale et le montant total */}
      <h2 style={{ color: 'black' }}>
        Total Items: {calculateTotalItems()} | Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit Price: ${item.cost}</div>
              
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              
              <div className="cart-item-total">
                Subtotal: ${calculateTotalCost(item)}
              </div>
              
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;