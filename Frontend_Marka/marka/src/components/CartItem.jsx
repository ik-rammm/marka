import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { updateCartItem, removeFromCart } from '../services/cart';

function CartItem({ item, userId, onUpdate }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleUpdate = async () => {
    try {
      await updateCartItem(userId, item.id, { ...item, quantity });
      onUpdate();
    } catch (error) {
      alert('Erreur lors de la mise à jour du panier.');
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromCart(userId, item.id);
      onUpdate();
    } catch (error) {
      alert('Erreur lors de la suppression de l’article.');
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5>{item.productName}</h5>
          <p>Quantité: 
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
              className="form-control d-inline-block w-auto mx-2"
            />
          </p>
        </div>
        <div>
          <button onClick={handleUpdate} className="btn btn-primary me-2">Mettre à jour</button>
          <button onClick={handleRemove} className="btn btn-danger">Supprimer</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;