import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin }) => {
    const { loading, isAuthenticated, user } = useSelector(state => state.user);

    if (loading) {
        // You can return a loading spinner here or a placeholder component
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (isAdmin && user.role !== "admin") {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;