import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ fetchProducts }) => {
  var navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Coffee',
    availabilityStatus: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken'); 
    console.log(formData)
    if (!token) {
      console.error('No token found, please log in first.');
      return;
    }

    try {
    var response = await axios.post(
        'http://localhost:5000/api/products', 
        formData, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      if(response.data.success){
        alert(response.data.message)
      }
      fetchProducts();
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Coffee',
        availabilityStatus: true
      });
    } catch (error) {
      console.error('There was an error creating the product!', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mx-5 mt-4">
      <Row className="mb-3">
        <Col>
          <h2 className="text-center mb-4">Add Products</h2>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Coffee">Coffee</option>
              <option value="Tea">Tea</option>
              <option value="Pastry">Pastry</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="availabilityStatus">
            <Form.Check
              type="checkbox"
              label="Available"
              name="availabilityStatus"
              checked={formData.availabilityStatus}
              onChange={() =>
                setFormData({
                  ...formData,
                  availabilityStatus: !formData.availabilityStatus
                })
              }
            />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Create Product
      </Button>
      <Button variant="secondary" onClick={() => navigate(-1)} className="ms-2">
        Back
      </Button>
    </Form>
  );
};

export default ProductForm;
