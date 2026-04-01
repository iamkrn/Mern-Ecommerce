import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import '../style.css'; // This now imports Tailwind

const UpdateProfile = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // 1. Stop the page from refreshing
        

        // 2. We only want to send data that is NOT empty
        const dataToSend = {};
        if (formData.username !== "") dataToSend.username = formData.username;
        if (formData.email !== "") dataToSend.email = formData.email;
        if (formData.password !== "") dataToSend.password = formData.password;

        // 3. If everything is empty, don't do anything!
        if (Object.keys(dataToSend).length === 0) {
            toast.info('Please type something to update!');
            return;
        }

        // 4. Show a "Loading..." message on the screen
        const toastId = toast.loading('Updating your profile...');

        try {
            // 5. Send the update request to the server
            const response = await axiosInstance.put('/auth/update', dataToSend);
            
            // 6. If the server says "OK" (status 200)
            if (response.status === 200) {
                toast.update(toastId, { 
                    render: 'Done! Profile updated successfully.', 
                    type: 'success', 
                    isLoading: false, 
                    autoClose: 3000 
                });
                setFormData({ username: '', email: '', password: '' }); // Clear the boxes
            }
        } catch (error) {
            // 7. If there was an error (like "Not logged in")
            const messageFromServer = error.response?.data?.message || 'Something went wrong!';
            toast.update(toastId, { 
                render: messageFromServer, 
                type: 'error', 
                isLoading: false, 
                autoClose: 3000 
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent mb-2">Update Profile</h2>
                    <p className="text-slate-600 text-sm">Modify your user details</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">New Username </label>
                        <input type="text" name="username" value={formData.username} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all placeholder-slate-400" placeholder="Enter new name" onChange={handleChange} />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">New Email</label>
                        <input type="email" name="email" value={formData.email} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all placeholder-slate-400" placeholder="Enter new Email" onChange={handleChange} />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                        <input type="password" name="password" value={formData.password} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all placeholder-slate-400" placeholder="Enter new password" minLength="8" onChange={handleChange} />
                    </div>
                    
                    <button type="submit" className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-sky-500 hover:to-indigo-500 transition-all shadow-md active:scale-[0.98]">
                        Update
                    </button>
                </form>
                
                <div className="mt-6 text-center text-sm text-slate-600">
                    <p>Go back to <Link to="/" className="text-sky-600 hover:text-sky-700 transition-colors font-medium hover:underline">Home</Link></p>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
