import React, { useContext, useState } from 'react';
import './gameCard.css';
import GameRating from './GameRating';
import GameDetails from './GameDetails';
import { AppContext } from '../App';
import { useCart } from '../context/CartContext';

function GameCard({ game }) {
  const { library, setLibrary } = useContext(AppContext);
  const { addToBag } = useCart();
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToLibrary = game => {
    setLibrary([...library, game]);
  };

  const handleRemoveFromLibrary = game => {
    setLibrary(library.filter(item => item._id !== game._id));
  };

  const handleAddToBag = (e) => {
    e.preventDefault();
    const item = {
      id: game._id,
      name: game.title,
      price: game.price * (1 - game.discount),
      image: game.img
    };
    addToBag(item);
  };

  return (
    <>
      <div className="col-xl-3 col-lg-4 col-md-6">
        <div className="gameCard">
          <img src={game.img} alt={game.title} className="img-fluid" />
          <a
            href="#"
            className={`like ${library.includes(game) ? 'active' : undefined}`}
            onClick={
              library.includes(game)
                ? () => handleRemoveFromLibrary(game)
                : () => handleAddToLibrary(game)
            }
          >
            <i className="bi bi-heart-fill"></i>
          </a>
          <div className="gameFeature">
            <span className="gameType">{game.level}</span>
            <GameRating rating={game.rating} />
          </div>
          <h4 className="gameTitle mt-4 mb-3">{game.title}</h4>
          <div className="gamePrice">
            {game.discount != 0 && (
              <>
                <span className="discount">
                  <i>{game.discount * 100}%</i>
                </span>
                <span className="prevPrice">${game.price.toFixed(2)}</span>
              </>
            )}
            <span className="currentPrice">
              ${((1 - game.discount) * game.price).toFixed(2)}
            </span>
          </div>
          <div className="card-actions">
            <a className="addBag" href="#" onClick={handleAddToBag}>
              <i className="bi bi-bag-plus-fill"></i>
            </a>
            <button className="read-more" onClick={() => setShowDetails(true)}>
              <i className="bi bi-info-circle"></i> Leer más
            </button>
          </div>
        </div>
      </div>

      {showDetails && (
        <GameDetails 
          game={game} 
          onClose={() => setShowDetails(false)} 
        />
      )}
    </>
  );
}

export default GameCard;
