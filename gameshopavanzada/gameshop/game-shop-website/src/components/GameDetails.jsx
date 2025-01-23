import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './GameDetails.css';

const GameDetails = ({ game, onClose }) => {
  const [activeTab, setActiveTab] = useState('description');
  const { addToBag } = useCart();

  const gameDetails = {
    description: "League of Legends es un juego de estrategia por equipos en el que dos equipos de cinco campeones se enfrentan para destruir la base del otro. Elige entre más de 140 campeones para realizar jugadas épicas, asegurar asesinatos y destruir torretas mientras avanzas hacia la victoria.",
    features: [
      "Más de 140 campeones",
      "Partidas estratégicas 5v5",
      "Sistema de rangos competitivo",
      "Actualizaciones constantes",
      "Eventos especiales",
      "Modo espectador"
    ],
    requirements: {
      minimum: {
        os: "Windows 7 o superior",
        processor: "3 GHz processor (supporting SSE2 instruction set or higher)",
        memory: "2 GB RAM",
        graphics: "Shader version 2.0 capable",
        storage: "16 GB"
      },
      recommended: {
        os: "Windows 10",
        processor: "3 GHz processor",
        memory: "4 GB RAM",
        graphics: "Nvidia GeForce 8800 / AMD Radeon HD 5670 or equivalent",
        storage: "16 GB"
      }
    },
    media: {
      screenshots: [
        "./assets/games/lol-bg.jpeg",
        "./assets/games/lol-2.jpg",
        "./assets/games/lol-3.jpg"
      ],
      videos: [
        "https://www.youtube.com/embed/vzHrjOMfHPY"
      ]
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToBag(game);
    // Mostrar notificación de éxito
    const notification = document.createElement('div');
    notification.className = 'add-cart-notification';
    notification.innerHTML = `
      <i class="bi bi-check-circle-fill"></i>
      ${game.title} agregado al carrito
    `;
    document.body.appendChild(notification);
    
    // Remover la notificación después de 3 segundos
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  return (
    <div className="game-details-modal">
      <div className="game-details-content">
        <button className="close-details" onClick={onClose}>&times;</button>
        
        <div className="game-details-header">
          <img 
            src={game.img} 
            alt={game.title} 
            className="game-banner"
          />
          <div className="game-info-overlay">
            <h2>{game.title}</h2>
            <div className="price-section">
              {game.discount > 0 && (
                <span className="discount-badge">{game.discount * 100}% OFF</span>
              )}
              <div className="price-display">
                {game.discount > 0 && (
                  <span className="original-price">${game.price.toFixed(2)}</span>
                )}
                <span className="final-price">
                  ${((1 - game.discount) * game.price).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="game-details-tabs">
          <button 
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            <i className="bi bi-file-text"></i> Descripción
          </button>
          <button 
            className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            <i className="bi bi-list-check"></i> Características
          </button>
          <button 
            className={`tab-btn ${activeTab === 'requirements' ? 'active' : ''}`}
            onClick={() => setActiveTab('requirements')}
          >
            <i className="bi bi-pc-display"></i> Requisitos
          </button>
          <button 
            className={`tab-btn ${activeTab === 'media' ? 'active' : ''}`}
            onClick={() => setActiveTab('media')}
          >
            <i className="bi bi-collection-play"></i> Media
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="description-content">
              <p>{gameDetails.description}</p>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="features-content">
              <ul className="features-list">
                {gameDetails.features.map((feature, index) => (
                  <li key={index}>
                    <i className="bi bi-check-circle-fill"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'requirements' && (
            <div className="requirements-content">
              <div className="requirements-grid">
                <div className="req-column">
                  <h3>Mínimos</h3>
                  <ul>
                    <li><strong>SO:</strong> {gameDetails.requirements.minimum.os}</li>
                    <li><strong>Procesador:</strong> {gameDetails.requirements.minimum.processor}</li>
                    <li><strong>Memoria:</strong> {gameDetails.requirements.minimum.memory}</li>
                    <li><strong>Gráficos:</strong> {gameDetails.requirements.minimum.graphics}</li>
                    <li><strong>Almacenamiento:</strong> {gameDetails.requirements.minimum.storage}</li>
                  </ul>
                </div>
                <div className="req-column">
                  <h3>Recomendados</h3>
                  <ul>
                    <li><strong>SO:</strong> {gameDetails.requirements.recommended.os}</li>
                    <li><strong>Procesador:</strong> {gameDetails.requirements.recommended.processor}</li>
                    <li><strong>Memoria:</strong> {gameDetails.requirements.recommended.memory}</li>
                    <li><strong>Gráficos:</strong> {gameDetails.requirements.recommended.graphics}</li>
                    <li><strong>Almacenamiento:</strong> {gameDetails.requirements.recommended.storage}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="media-content">
              <div className="video-section">
                <h3>Trailer</h3>
                <div className="video-container">
                  <iframe 
                    width="100%" 
                    height="315" 
                    src={gameDetails.media.videos[0]}
                    title="Game Trailer"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="screenshots-section">
                <h3>Capturas de pantalla</h3>
                <div className="screenshots-grid">
                  {gameDetails.media.screenshots.map((screenshot, index) => (
                    <img 
                      key={index}
                      src={screenshot} 
                      alt={`Screenshot ${index + 1}`}
                      className="screenshot"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="game-details-footer">
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Agregar al carrito <i className="bi bi-bag-plus-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
