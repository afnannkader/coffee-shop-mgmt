import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom'

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderStatus, setOrderStatus] = useState("pending");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = products.find(p => p._id === selectedProduct);
    const order = {
      customerName,
      productsOrdered: [{ product: product.name, quantity }],
      totalPrice: product.price * quantity,
      orderStatus,
      orderDate: new Date().toISOString()
    };
    
    try {
      await axios.post("http://localhost:5000/api/orders", order, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });
      alert("Order created successfully!");
      setCustomerName("");
      setSelectedProduct("");
      setQuantity(1);
      setTotalPrice(0);
      setOrderStatus("pending");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#">Cofficana</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="ms-auto ">
               {/* <Nav.Link as={Link} to="/register">Register</Nav.Link> */}
              <Nav.Link  as={Link} to="/vieworder">View Orders</Nav.Link>
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <h2 className = "mt-5 text-center">Create Order</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product</Form.Label>
            <Form.Control
              as="select"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              required
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Order Status</Form.Label>
            <Form.Control
              as="select"
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              required
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </Form.Control>
          </Form.Group>
          <Button type="submit" className="mt-3">Create Order</Button>
        </Form>
      </Container>
    </div>
  );
};

export default Homepage;
