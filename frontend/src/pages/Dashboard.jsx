import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../features/auth/authService';
import userService from '../features/users/userService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // Admin State
  const [usersList, setUsersList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Modals
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
      // Only fetch list if admin
      if (storedUser.role === 'admin') {
        fetchUsers(storedUser.token, 1);
      }
    }
  }, [navigate]);

  const fetchUsers = async (token, pageNum) => {
    setIsLoading(true);
    try {
      const data = await userService.getUsers(token, pageNum);
      setUsersList(data.users);
      setPage(data.page);
      setTotalPages(data.pages);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const promptStatusChange = (u) => {
    setSelectedUser(u);
    setShowStatusModal(true);
  };

  const confirmStatusChange = async () => {
    if (!selectedUser) return;
    const newStatus = selectedUser.status === 'active' ? 'inactive' : 'active';
    try {
      await userService.updateUserStatus(selectedUser._id, newStatus, user.token);
      toast.success(`User updated to ${newStatus}`);
      fetchUsers(user.token, page);
    } catch (error) {
      toast.error('Update failed');
    } finally {
      setShowStatusModal(false);
      setSelectedUser(null);
    }
  };

  const handleLogoutClick = () => setShowLogoutModal(true);

  const confirmLogout = () => {
    authService.logout();
    navigate('/login');
    setShowLogoutModal(false);
  };

  // Helper to format dates nicely
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', 
      hour: 'numeric', minute: 'numeric', hour12: true
    });
  };

  if (!user) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Navbar */}
      <nav className="bg-white shadow-sm mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Title */}
            <h1 className="text-lg sm:text-xl font-bold text-blue-600 truncate">
              {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
            </h1>
            
            {/* Right Side Info */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="text-right">
                <div className="text-sm font-bold text-gray-800 max-w-[100px] sm:max-w-none truncate">
                  {user.fullName}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider hidden sm:block">
                  {user.role}
                </div>
              </div>
              
              <button 
                onClick={handleLogoutClick} 
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm transition shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        
        {/* --- ADMIN VIEW --- */}
        {user.role === 'admin' ? (
          <div className="bg-white rounded-lg shadow flex flex-col">
            {isLoading && <div className="p-4 text-center text-gray-500">Loading users...</div>}
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {usersList.map((u) => (
                    <tr key={u._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.fullName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{u.role}</td>
                      
                      {/* Last Login Column */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(u.lastLogin)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${u.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {u._id !== user._id && (
                           u.status === 'active' ? (
                            <button onClick={() => promptStatusChange(u)} className="text-red-600 hover:text-red-900 font-semibold">Deactivate</button>
                          ) : (
                            <button onClick={() => promptStatusChange(u)} className="text-green-600 hover:text-green-900 font-semibold">Activate</button>
                          )
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="p-4 flex justify-between items-center bg-gray-50 border-t">
              <button disabled={page === 1} onClick={() => fetchUsers(user.token, page - 1)} className="px-3 py-1 text-sm border rounded bg-white hover:bg-gray-50 disabled:opacity-50">Previous</button>
              <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => fetchUsers(user.token, page + 1)} className="px-3 py-1 text-sm border rounded bg-white hover:bg-gray-50 disabled:opacity-50">Next</button>
            </div>
          </div>
        ) : (
          /* --- USER VIEW --- */
          <div className="bg-white overflow-hidden shadow-xl rounded-lg p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Profile</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-semibold text-lg">{user.fullName}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-semibold text-lg break-all">{user.email}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Role</p>
                  <span className="uppercase inline-block mt-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">{user.role}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Last Login</p>
                  <p className="font-semibold text-sm mt-1">{formatDate(user.lastLogin || Date.now())}</p>
                </div>
              </div>

              <div className="pt-2">
                <button onClick={() => navigate('/profile')} className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition font-medium shadow">
                  Edit Profile Information
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- MODALS --- */}
      
      {/* 1. Status Change Modal */}
      {showStatusModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm mx-auto">
            <h3 className="text-lg font-bold mb-2">Confirm Action</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to <b>{selectedUser.status === 'active' ? 'Deactivate' : 'Activate'}</b> <span className="text-blue-600">{selectedUser.fullName}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowStatusModal(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Cancel</button>
              <button onClick={confirmStatusChange} className={`px-4 py-2 text-white rounded ${selectedUser.status === 'active' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm mx-auto">
            <h3 className="text-lg font-bold mb-2 text-gray-800">Sign Out</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowLogoutModal(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">Cancel</button>
              <button onClick={confirmLogout} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">Log Out</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;