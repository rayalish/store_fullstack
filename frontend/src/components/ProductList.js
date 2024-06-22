import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    axios.get('http://127.0.0.1:8000/api/product/items/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => setItems(response.data))
    .catch(error => setError(error.toString()));
  }, []);

  return (
    <div>
      <h1>Items</h1>
      {error ? <p>Error: {error}</p> : null}
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}: {item.description}, цена: {item.price} тг, 
            категория id: {item.category}, {item.quantity_available}, 
            {item.quantity_type ? item.quantity_type.variant_name : 'чего-то'} (типо штук, килограмм), картинка: {item.image}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;