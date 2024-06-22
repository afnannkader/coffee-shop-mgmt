import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Form, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductTable = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { loading, isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  console.log(products)
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }
    })
      .then(response => {
        if (response.status === 200) {
          setProducts(products.filter(product => product._id !== id));
        }
      })
      .catch(error => {
        console.error("Error deleting product:", error);
      });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/api/products/${updatedProduct._id}`, updatedProduct, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }
    })
      .then(response => {
        setProducts(products.map(product => (product.id === updatedProduct.id ? response.data : product)));
        setShowModal(false);
      })
      .catch(error => {
        console.error("Error updating product:", error);
      });
  };

  const handleEditClick = (productId) => {
    const productToUpdate = products.find(product => product.id === productId);
    setUpdatedProduct(productToUpdate);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Product List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{`$${product.price}`}</td>
              <td>
                <Button variant="primary" onClick={() => handleEditClick(product.id)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(product._id)}>Delete</Button>
              </td>
            </tr>
          ))}
          <Button variant="secondary" onClick={() => navigate(-1)} className="ms-2">
            Back
          </Button>
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={updatedProduct.name || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={updatedProduct.price || ""}
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
  );
};

export default ProductTable;

