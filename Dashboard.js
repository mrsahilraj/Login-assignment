import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:5000/users', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setUsers(result.data);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/users/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUsers(users.filter(user => user._id !== id));
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <div className="logout-button-container">
                <button onClick={handleLogout}>Logout</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{new Date(user.dob).toLocaleDateString()}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
