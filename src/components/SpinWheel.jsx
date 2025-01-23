import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Modal } from 'react-bootstrap';
import './spinWheel.css';
import Confetti from 'react-confetti';
import { AppContext } from '../App';
import { useCart } from '../context/CartContext';

const SpinWheel = ({ isOpen, onClose }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [showGifts, setShowGifts] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const [hasSelectedGift, setHasSelectedGift] = useState(false);
  const { setBag, bag } = useContext(AppContext);
  const { addToBag } = useCart();

  const gifts = [
    { 
      id: 'netflix', 
      name: 'Netflix Premium', 
      image: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png', 
      price: 0 
    },
    { 
      id: 'spotify', 
      name: 'Spotify Premium', 
      image: 'https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Spotify-512.png', 
      price: 0 
    },
    { 
      id: 'youtube', 
      name: 'YouTube Premium', 
      image: 'https://cdn3.iconfinder.com/data/icons/social-media-2169/24/social_media_social_media_logo_youtube-512.png', 
      price: 0 
    }
  ];

  const sectors = [
    { type: 'discount', value: '10%', angle: 0 },
    { type: 'discount', value: '15%', angle: 45 },
    { type: 'discount', value: '20%', angle: 90 },
    { type: 'discount', value: '25%', angle: 135 },
    { type: 'special', value: '3x2', angle: 180 },
    { type: 'discount', value: '30%', angle: 225 },
    { type: 'discount', value: '40%', angle: 270 },
    { type: 'discount', value: '50%', angle: 315 }
  ];

  const calculateSpinRotation = useCallback(() => {
    const targetAngle = 180;
    const fullRotations = 3;
    const randomOffset = Math.random() * 20 - 10;
    return (360 * fullRotations) + targetAngle + randomOffset;
  }, []);

  const handleSpin = useCallback(() => {
    if (!isSpinning) {
      setIsSpinning(true);
      const totalRotation = calculateSpinRotation();
      
      requestAnimationFrame(() => {
        setRotation(prevRotation => prevRotation + totalRotation);
      });

      setTimeout(() => {
        setIsSpinning(false);
        setSelectedDiscount('3x2');
        setShowConfetti(true);
        setShowGifts(true);
      }, 2000);
    }
  }, [isSpinning, calculateSpinRotation]);

  const handleAddToCart = (gift) => {
    if (!hasSelectedGift) {
      const item = {
        id: gift.id,
        name: gift.name,
        price: gift.price,
        image: gift.image
      };
      addToBag(item);
      setAddedToCart(prev => ({ ...prev, [gift.id]: true }));
      setHasSelectedGift(true);
    }
  };

  const canCheckout = useCallback(() => {
    const regularItems = bag.filter(item => !item.isGift).length;
    return regularItems >= 2;
  }, [bag]);

  useEffect(() => {
    if (!isOpen) {
      setRotation(0);
      setSelectedDiscount(null);
      setShowConfetti(false);
      setIsSpinning(false);
      setShowGifts(false);
      setAddedToCart({});
      setHasSelectedGift(false);
    }
  }, [isOpen]);

  return (
    <Modal show={isOpen} onHide={onClose} centered className="spin-wheel-modal">
      <div className="spin-wheel-header">
        <h2>¡Gira y Gana!</h2>
        <button className="close-button" onClick={onClose}>&times;</button>
      </div>
      <Modal.Body className="spin-wheel-container">
        {showConfetti && <Confetti gravity={0.2} numberOfPieces={150} />}
        
        {!showGifts ? (
          <>
            <div className="spin-wheel-wrapper">
              <div className="pointer"></div>
              <div 
                className={`wheel ${isSpinning ? 'spinning' : ''}`}
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <div className="wheel-inner">
                  {sectors.map((sector, index) => (
                    <div 
                      key={index}
                      className={`sector ${sector.type === 'special' ? 'special' : ''}`}
                      style={{ '--i': index }}
                    >
                      <span className="sector-text">{sector.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button 
              className={`spin-button ${isSpinning ? 'disabled' : ''}`}
              onClick={handleSpin}
              disabled={isSpinning}
            >
              {isSpinning ? 'Girando...' : '¡GIRAR!'}
            </button>
          </>
        ) : (
          <div className="gifts-container">
            <h3>¡Felicitaciones! Has ganado estos regalos:</h3>
            <p className="gift-instruction">Elige solo una tarjeta de regalo</p>
            <div className="gifts-grid">
              {gifts.map((gift) => (
                <div key={gift.id} className="gift-item">
                  <img src={gift.image} alt={gift.name} />
                  <h4>{gift.name}</h4>
                  <button 
                    onClick={() => handleAddToCart(gift)}
                    className={`add-to-cart-btn ${addedToCart[gift.id] ? 'added' : ''}`}
                    disabled={addedToCart[gift.id] || (hasSelectedGift && !addedToCart[gift.id])}
                  >
                    {addedToCart[gift.id] 
                      ? 'Agregado' 
                      : hasSelectedGift 
                        ? 'No disponible' 
                        : 'Agregar al Carrito'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default SpinWheel;
