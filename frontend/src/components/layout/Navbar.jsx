import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { api } from '../../utils/api';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold">
            Task Manager
          </Link>
          
          <div className="flex items-center gap-4">
            {user && (
              <>
                <span className="text-gray-600">Hi, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}