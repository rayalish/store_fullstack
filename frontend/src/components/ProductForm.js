import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity_available: '',
    quantity_type: '', // новое поле для хранения id quantity_type
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [quantityTypes, setQuantityTypes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    // Загрузка категорий
    axios.get('http://127.0.0.1:8000/api/product/categ/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => setCategories(response.data))
    .catch(error => setError(error.toString()));

    // Загрузка quantity_types
    axios.get('http://127.0.0.1:8000/api/product/quantity_type/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => setQuantityTypes(response.data))
    .catch(error => setError(error.toString()));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    const token = localStorage.getItem('access_token');
    axios.post('http://127.0.0.1:8000/api/product/admin/create/', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Success:', response.data);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        quantity_available: '',
        quantity_type: '',
        image: null,
      });
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Price:
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Category:
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Quantity Available:
        <input type="number" name="quantity_available" value={formData.quantity_available} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Quantity Type:
        <select name="quantity_type" value={formData.quantity_type} onChange={handleChange} required>
          <option value="">Select quantity type</option>
          {quantityTypes.map(qType => (
            <option key={qType.id} value={qType.id}>{qType.variant_name}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Image:
        <input type="file" name="image" onChange={handleFileChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
