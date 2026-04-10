import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = ({ onBack }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8081/api/admin/users', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleDelete = async (id) => {
        if(window.confirm("Na pewno usunąć?")) {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8081/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsers();
        }
    };

    return (
        <div className="admin-container">
            <button onClick={onBack}>← Powrót</button>
            <h2>Panel Administratora</h2>
            <input 
                placeholder="Szukaj użytkownika..." 
                onChange={(e) => setSearch(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Rola</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {users.filter(u => u.username.includes(search)).map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => handleDelete(user.id)}>Usuń</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;