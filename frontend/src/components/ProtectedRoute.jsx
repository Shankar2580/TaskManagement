import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Spinner from './layout/Spinner';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-12 w-12 text-indigo-600" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}