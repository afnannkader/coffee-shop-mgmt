import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table, Button, Modal, Form, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updatedOrder, setUpdatedOrder] = useState({});
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });
      setOrders(orders.filter(order => order._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleEditClick = (order) => {
    setUpdatedOrder(order);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${updatedOrder._id}`, updatedOrder, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });
      setOrders(orders.map(order => (order._id === updatedOrder._id ? response.data : order)));
      setShowModal(false);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrder({ ...updatedOrder, [name]: value });
  };

  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProducts = [...updatedOrder.productsOrdered];
    updatedProducts[index] = { ...updatedProducts[index], [name]: value };
    setUpdatedOrder({ ...updatedOrder, productsOrdered: updatedProducts });
  };

  return (
    <>
    <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#">Cofficana</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
          </Navbar.Collapse>
        </Container>
      </Navbar>
    <Container>
      <Row>
        <Col>
          <h2>Orders</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Total Price</th>
                <th>Order Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.customerName}</td>
                  <td>
                    {order.productsOrdered.map((product, idx) => (
                      <div key={idx}>{product.product || "N/A"}</div>
                    ))}
                  </td>
                  <td>
                    {order.productsOrdered.map((product, idx) => (
                      <div key={idx}>{product.quantity}</div>
                    ))}
                  </td>
                  <td>{order.orderStatus}</td>
                  <td>{order.totalPrice}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleEditClick(order)}>Edit</Button>{' '}
                    <Button variant="danger" onClick={() => handleDelete(order._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="secondary" onClick={() => navigate(-1)} className="ms-2">
            Back
          </Button>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                name="customerName"
                value={updatedOrder.customerName || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            {updatedOrder.productsOrdered && updatedOrder.productsOrdered.map((product, idx) => (
              <div key={idx}>
                <Form.Group>
                  <Form.Label>Product</Form.Label>
                  <Form.Control
                    type="text"
                    name="product"
                    value={product.product || ""}
                    onChange={(e) => handleProductChange(e, idx)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={product.quantity || ""}
                    onChange={(e) => handleProductChange(e, idx)}
                  />
                </Form.Group>
              </div>
            ))}
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="orderStatus"
                value={updatedOrder.orderStatus || ""}
                onChange={handleInputChange}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Total Price</Form.Label>
              <Form.Control
                type="number"
                name="totalPrice"
                value={updatedOrder.totalPrice || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Order Date</Form.Label>
              <Form.Control
                type="date"
                name="orderDate"
                value={updatedOrder.orderDate ? new Date(updatedOrder.orderDate).toISOString().substr(0, 10) : ""}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </>
  );
};

export default OrderList;
