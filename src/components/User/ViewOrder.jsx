import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Navbar, Nav } from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import { Button } from "react-bootstrap";

const ViewOrder = () => {
  var navigate = useNavigate();
  const [orders, setOrders] = useState([]);

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
          <h2 className="text-center mt-5">Orders</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Total Price</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.customerName}</td>
                  <td>
                    {order.productsOrdered.map((product, idx) => (
                      <div key={idx}>{product.product}</div>
                    ))}
                  </td>
                  <td>
                    {order.productsOrdered.map((product, idx) => (
                      <div key={idx}>{product.quantity}</div>
                    ))}
                  </td>
                  <td>{order.orderStatus}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.orderDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="secondary" onClick={() => navigate(-1)} className="ms-2">
            Back
          </Button>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default ViewOrder;
