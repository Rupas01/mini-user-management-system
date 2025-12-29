import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../features/auth/authService';
import Spinner from '../components/Spinner';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // <--- Modal State
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
      setFormData((prevState) => ({
        ...prevState,
        fullName: storedUser.fullName,
        email: storedUser.email,
      }));
    }
  }, [navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // 1. Initial Submit checks validation, then opens modal
  const onSubmit = (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Open Confirmation Modal
    setShowModal(true);
  };

  // 2. Actual API Call happens here
  const handleConfirmUpdate = async () => {
    setShowModal(false); // Close modal
    setIsLoading(true);  // Start spinner

    try {
      const updateData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password || undefined,
      };

      await authService.updateProfile(updateData, user.token);
      toast.success("Profile Updated Successfully!");
      navigate('/dashboard');
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Profile</h2>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={onChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
              disabled={isLoading}
            />
          </div>

          <div className="pt-4 border-t mt-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Change Password (Optional)</h3>
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={onChange}
              className="w-full px-4 py-2 border rounded-lg mb-3 transition"
              minLength="6"
              disabled={isLoading}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={onChange}
              className="w-full px-4 py-2 border rounded-lg transition"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="w-1/2 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* --- CONFIRMATION MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
            <h3 className="text-lg font-bold mb-2 text-gray-800">Confirm Update</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to update your profile information?
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)} 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmUpdate} 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Yes, Update
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;