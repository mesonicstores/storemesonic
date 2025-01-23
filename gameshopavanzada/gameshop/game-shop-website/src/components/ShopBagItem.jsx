import React, { useContext } from 'react';
import './shopBagItem.css';
import { AppContext } from '../App';

function ShopBagItem({ game, index }) {
  const { removeFromBag } = useContext(AppContext);

  const handleRemoveFromBag = (e) => {
    e.preventDefault();
    if (e.target.tagName === 'A' || e.target.tagName === 'I') {
      removeFromBag(game._id);
    }
  };

  return (
    <tr className="shopBagItem">
      <th scope="row">{index + 1}</th>
      <td>
        <img src={game.img} alt="" className="img-fluid" />
      </td>
      <td>{game.title}</td>
      <td>${game.price.toFixed(2)}</td>
      <td>{game.discount * 100}%</td>
      <td>${(game.price * (1 - game.discount)).toFixed(2)}</td>
      <td>
        <a href="#" onClick={handleRemoveFromBag}>
          <i className="bi bi-trash"></i>
        </a>
      </td>
    </tr>
  );
}

export default ShopBagItem;
