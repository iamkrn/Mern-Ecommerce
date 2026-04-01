import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import '../style.css'; 

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [profileImage, setProfileImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Creating account...');

        // Create FormData object to send multipart/form-data
        const data = new FormData();
        data.append('username', formData.username);
        data.append('email', formData.email);
        data.append('password', formData.password);
        if (profileImage) {
            data.append('profileImage', profileImage);
        }

        try {
            // Important: multipart/form-data with axios doesn't need manual header setting if data is FormData
            const response = await axiosInstance.post('/auth/register', data);
            if (response.status === 201) {
                localStorage.setItem('token', response.data.token);
                toast.update(toastId, { render: 'Account created successfully!', type: 'success', isLoading: false, autoClose: 2000 });
                setTimeout(() => navigate('/products'), 2000);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Registration failed.';
            toast.update(toastId, { render: errorMsg, type: 'error', isLoading: false, autoClose: 3000 });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent mb-2">Create Account</h2>
                    <p className="text-slate-600 text-sm">Register as a new user</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Image Preview and Upload */}
                    <div className="flex flex-col items-center mb-4">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-50 mb-3 relative group">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            )}
                            <label htmlFor="profileImage" className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </label>
                        </div>
                        <input type="file" id="profileImage" name="profileImage" accept="image/*" className="hidden" onChange={handleFileChange} />
                        <p className="text-xs text-slate-500">Click to upload photo (Optional)</p>
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                        <input type="text" id="username" name="username" value={formData.username} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all placeholder-slate-400 text-sm" placeholder="Enter your name" required onChange={handleChange} />
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all placeholder-slate-400 text-sm" placeholder="Enter your Email" required onChange={handleChange} />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all placeholder-slate-400 text-sm" placeholder="Enter your password" required minLength="8" onChange={handleChange} />
                    </div>
                    
                    <button type="submit" className="w-full py-2.5 px-4 mt-2 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-sky-500 hover:to-indigo-500 transition-all shadow-md active:scale-[0.98] text-sm">
                        Register
                    </button>
                </form>
                
                <div className="mt-6 text-center text-sm text-slate-600">
                    <p>Want to update profile? <Link to="/update" className="text-sky-600 hover:text-sky-700 transition-colors font-medium hover:underline">Update user</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
