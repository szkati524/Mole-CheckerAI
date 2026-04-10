import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = ({ onBack }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    
    // Stany do edycji
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({ username: '', email: '', role: '' });

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:8081/api/admin', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data);
        } catch (err) {
            console.error("Błąd pobierania:", err);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

   
    const startEdit = (user) => {
        setEditingId(user.id);
        setEditFormData({ username: user.username, email: user.email, role: user.role });
    };

   
    const handleUpdate = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8081/api/admin/users/${id}`, editFormData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEditingId(null);
            fetchUsers(); 
        } catch (err) {
            alert("Błąd podczas aktualizacji");
        }
    };

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
            <div className="admin-header">
                <h2 className="admin-title">Panel Administratora</h2>
                <button className="back-btn" onClick={onBack}>← Powrót</button>
            </div>

            <div className="table-container">
                <input 
                    className="search-box"
                    placeholder="Szukaj użytkownika..." 
                    onChange={(e) => setSearch(e.target.value)}
                />
                
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Użytkownik</th>
                            <th>Email</th>
                            <th>Rola</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.filter(u => u.username?.toLowerCase().includes(search.toLowerCase())).map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>
                                    {editingId === user.id ? (
                                        <input 
                                            className="edit-input"
                                            value={editFormData.username} 
                                            onChange={(e) => setEditFormData({...editFormData, username: e.target.value})}
                                        />
                                    ) : user.username}
                                </td>
                                <td>
                                    {editingId === user.id ? (
                                        <input 
                                            className="edit-input"
                                            value={editFormData.email} 
                                            onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                                        />
                                    ) : user.email}
                                </td>
                                <td>
                                    {editingId === user.id ? (
                                        <select 
                                            className="edit-input"
                                            value={editFormData.role} 
                                            onChange={(e) => setEditFormData({...editFormData, role: e.target.value})}
                                        >
                                            <option value="USER">USER</option>
                                            <option value="ADMIN">ADMIN</option>
                                        </select>
                                    ) : (
                                        <span className="role-badge">{user.role}</span>
                                    )}
                                </td>
                                <td>
                                    {editingId === user.id ? (
                                        <>
                                            <button className="save-btn" onClick={() => handleUpdate(user.id)}>Zapisz</button>
                                            <button className="cancel-btn" onClick={() => setEditingId(null)}>Anuluj</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="edit-btn" onClick={() => startEdit(user)}>Edytuj</button>
                                            <button className="delete-btn" onClick={() => handleDelete(user.id)}>Usuń</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;