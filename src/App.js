import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/userAction';
import Login from './pages/Login'; 
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import ProtectedRoute from './routes/ProtectedRoutes';
import Dashboard from './components/Admin/Dashboard';
import ProductForm from './components/Admin/ProductForm';
import ProductTable from './components/Admin/ProductTable';
import OrderList from './components/Admin/OrderList';
import ViewOrder from './components/User/ViewOrder';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        } />
          <Route path="/vieworder" element={
          <ProtectedRoute>
            <ViewOrder />
          </ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={0}></Dashboard>
          </ProtectedRoute>
        } ></Route>
         <Route path="/admin/addproduct" element={
          <ProtectedRoute isAdmin={true}>
            <ProductForm />
          </ProtectedRoute>
        } ></Route>
        <Route path="/admin/viewproduct" element={
          <ProtectedRoute isAdmin={true}>
            <ProductTable />
          </ProtectedRoute>
        } ></Route>
        <Route path="/admin/vieworder" element={
          <ProtectedRoute isAdmin={true}>
            <OrderList />
          </ProtectedRoute>
        } ></Route>
      </Routes>
    </Router>
  );
}

export default App;
