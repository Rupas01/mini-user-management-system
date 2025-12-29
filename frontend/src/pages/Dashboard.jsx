import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../features/auth/authService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const onLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (!user) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-blue-600">Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">
                Welcome, <b>{user.fullName}</b>
              </span>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-10 px-4">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
          <div className="space-y-2">
            <p><strong>ID:</strong> {user._id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs uppercase font-bold">{user.role}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;