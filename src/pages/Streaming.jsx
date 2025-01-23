import React, { useState } from 'react';
import './streaming.css';
import { useCart } from '../context/CartContext';
import { FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaWhatsapp } from 'react-icons/fa';

function Streaming({ reference }) {
  const { addToBag } = useCart();
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (service, event) => {
    const item = {
      id: Math.random().toString(36).substr(2, 9),
      name: service.name,
      price: service.price,
      image: service.image,
      duration: service.duration
    };
    addToBag(item);
    
    const button = event.currentTarget;
    setCartCount(prev => prev + 1);
    
    button.classList.add('clicked');
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 150);
  };

  const services = [
    {
      name: "Netflix Premium",
      price: 19.99,
      image: "https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png",
      duration: "30 días",
      className: "netflix"
    },
    {
      name: "Disney+",
      price: 10.99,
      image: "https://cnbl-cdn.bamgrid.com/assets/7ecc8bcb60ad77193058d63e321bd21cbac2fc67281dbd9927676ea4a4c83594/original",
      duration: "30 días",
      className: "disney"
    },
    {
      name: "Star+",
      price: 11.99,
      image: "https://static-assets.bamgrid.com/product/starplus/images/share-default.14fadd993578b9c670c7405c6fed80c1.png",
      duration: "30 días",
      className: "star"
    },
    {
      name: "Spotify Premium",
      price: 9.99,
      image: "https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png",
      duration: "3 meses",
      className: "spotify"
    },
    {
      name: "YouTube Premium",
      price: 11.99,
      image: "/assets/youtube-white.png",
      duration: "3 meses",
      className: "youtube"
    },
    {
      name: "Amazon Prime",
      price: 14.99,
      image: "https://m.media-amazon.com/images/G/01/digital/video/acquisition/amazon_video_light._SY32_FMpng_.png",
      duration: "30 días",
      className: "amazon"
    }
  ];

  return (
    <section id="streaming" ref={reference} className="streaming">
      <div className="container-fluid">
        <div className="streaming-header">
          <h1 className="neon-text">MesonicStores</h1>
          <p className="subtitle">Suscríbete a tus servicios favoritos con las mejores ofertas</p>
          <div className="social-icons">
            <a href="#" className="social-icon youtube">
              <FaYoutube />
            </a>
            <a href="#" className="social-icon twitter">
              <FaXTwitter />
            </a>
            <a href="#" className="social-icon whatsapp">
              <FaWhatsapp />
            </a>
          </div>
        </div>
        <div className="row streaming-cards">
          {services.map((service, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className={`streaming-card ${service.className}`}>
                <div className="duration-tag">{service.duration}</div>
                <img src={service.image} alt={service.name} className="service-logo" />
                <h3 className="service-title">{service.name}</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">{service.price.toFixed(2)}</span>
                  <span className="period">/{service.duration}</span>
                </div>
                <ul className="features">
                  {service.name === "Netflix Premium" && (
                    <>
                      <li><i className="bi bi-check-circle-fill"></i>4 pantallas simultáneas</li>
                      <li><i className="bi bi-check-circle-fill"></i>Ultra HD 4K disponible</li>
                      <li><i className="bi bi-check-circle-fill"></i>HDR y Dolby Atmos</li>
                      <li><i className="bi bi-check-circle-fill"></i>Sin anuncios</li>
                    </>
                  )}
                  {service.name === "Disney+" && (
                    <>
                      <li><i className="bi bi-check-circle-fill"></i>Disney, Marvel, Star Wars</li>
                      <li><i className="bi bi-check-circle-fill"></i>4 dispositivos simultáneos</li>
                      <li><i className="bi bi-check-circle-fill"></i>Descargas ilimitadas</li>
                      <li><i className="bi bi-check-circle-fill"></i>IMAX Enhanced</li>
                    </>
                  )}
                  {service.name === "Star+" && (
                    <>
                      <li><i className="bi bi-check-circle-fill"></i>Deportes en vivo ESPN</li>
                      <li><i className="bi bi-check-circle-fill"></i>Series y películas</li>
                      <li><i className="bi bi-check-circle-fill"></i>4 dispositivos simultáneos</li>
                      <li><i className="bi bi-check-circle-fill"></i>Contenido exclusivo</li>
                    </>
                  )}
                  {service.name === "Spotify Premium" && (
                    <>
                      <li><i className="bi bi-check-circle-fill"></i>Música sin anuncios</li>
                      <li><i className="bi bi-check-circle-fill"></i>Descarga para escuchar offline</li>
                      <li><i className="bi bi-check-circle-fill"></i>Calidad de audio superior</li>
                      <li><i className="bi bi-check-circle-fill"></i>Reproducción en cualquier orden</li>
                    </>
                  )}
                  {service.name === "YouTube Premium" && (
                    <>
                      <li><i className="bi bi-check-circle-fill"></i>Sin anuncios</li>
                      <li><i className="bi bi-check-circle-fill"></i>YouTube Music Premium</li>
                      <li><i className="bi bi-check-circle-fill"></i>Reproducción en segundo plano</li>
                      <li><i className="bi bi-check-circle-fill"></i>Descargas offline</li>
                    </>
                  )}
                  {service.name === "Amazon Prime" && (
                    <>
                      <li><i className="bi bi-check-circle-fill"></i>Prime Video</li>
                      <li><i className="bi bi-check-circle-fill"></i>Prime Gaming</li>
                      <li><i className="bi bi-check-circle-fill"></i>Envíos gratis</li>
                      <li><i className="bi bi-check-circle-fill"></i>Prime Music</li>
                    </>
                  )}
                </ul>
                <button className="add-to-cart" onClick={(event) => handleAddToCart(service, event)}>
                  AGREGAR AL CARRITO <i className="bi bi-bag-fill"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Streaming;
