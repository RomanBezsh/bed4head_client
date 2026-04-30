import React, { useEffect, useState, useMemo } from 'react';
import { UserService } from './api/userApi';
import { Link } from 'react-router-dom';

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userService = useMemo(() => new UserService(), []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Предполагается, что UserService будет иметь метод getAllUsers()
                const data = await userService.getAllUsers(); // Этот метод нужно будет добавить
                setUsers(data);
            } catch (err) {
                setError("Failed to fetch users.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [userService]);

    if (loading) return <div className="p-6">Loading users...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <Link to="/admin/users/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Add New User</Link>
            {/* Здесь будет таблица пользователей */}
            <ul className="list-disc pl-5">
                {users.map(user => (
                    <li key={user.id} className="mb-2">
                        <Link to={`/admin/users/${user.id}`} className="text-blue-600 hover:underline">
                            {user.email} (ID: {user.id})
                        </Link>
                        {/* Кнопки для редактирования/удаления */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminUsersPage;
