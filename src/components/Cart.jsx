import React from 'react';
import './Cart.css';
import { useCart } from '../context/CartContext';

function Cart({ isOpen, onClose }) {
  const { bag, removeToBag, incrementQuantity, decrementQuantity } = useCart();

  const total = bag.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = bag.reduce((acc, item) => acc + item.quantity, 0);
  const progressPercentage = Math.min((totalItems / 5) * 100, 100);
  const itemsToGo = Math.max(5 - totalItems, 0);

  const handleRemoveItem = (itemId) => {
    removeToBag(itemId);
  };

  const handleCheckout = () => {
    // Crear el mensaje con el detalle de la compra
    const items = bag.map(item => 
      `- ${item.name} (x${item.quantity}): $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    const message = `Hola, me gustaría comprar los siguientes juegos:\n${items}\n\nTotal: $${total.toFixed(2)}`;
    
    // Codificar el mensaje para la URL
    const encodedMessage = encodeURIComponent(message);
    
    // Abrir WhatsApp en una nueva pestaña
    window.open(`https://wa.me/56931806468?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h3>Tu Carrito</h3>
        <button onClick={onClose} className="close-button">
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <div className="progress-container">
        <div className="progress-info">
          {totalItems >= 5 ? (
            <span className="reward-achieved">
              <i className="bi bi-gift-fill"></i> ¡Felicidades! Has desbloqueado un juego gratis
            </span>
          ) : (
            <span className="progress-text">
              {itemsToGo} {itemsToGo === 1 ? 'producto más' : 'productos más'} para un juego gratis
            </span>
          )}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="cart-items">
        {bag.length === 0 ? (
          <div className="empty-cart">
            <i className="bi bi-cart-x"></i>
            <p>Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            {bag.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decrementQuantity(item.id)}>
                      <i className="bi bi-dash"></i>
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => incrementQuantity(item.id)}>
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
                <button 
                  className="remove-item" 
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))}
            
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="checkout-button" onClick={handleCheckout}>
                <i className="bi bi-whatsapp"></i> Proceder al pago
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
