import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserRole = localStorage.getItem('role');
  const currentUserId = localStorage.getItem('user_id');

  const [tempRoles, setTempRoles] = useState({});
  
  // State untuk menampilkan/menyembunyikan sidebar di layar kecil
  const [showSidebar, setShowSidebar] = useState(false);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);

      const initialRoles = {};
      response.data.forEach((user) => {
        initialRoles[user.id] = user.role;
      });
      setTempRoles(initialRoles);

      setLoading(false);
    } catch (error) {
      console.error('Gagal memuat pengguna:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Pengguna berhasil dihapus');
      fetchUsers();
    } catch (error) {
      console.error('Gagal menghapus pengguna:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('Terjadi kesalahan saat menghapus pengguna');
      }
    }
  };

  const updateUserRole = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://127.0.0.1:8000/api/users/${id}`, 
        { role: tempRoles[id] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Role pengguna berhasil diupdate');
      fetchUsers();
    } catch (error) {
      console.error('Gagal mengupdate role pengguna:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('Terjadi kesalahan saat mengupdate role pengguna');
      }
    }
  };

  const handleRoleChange = (id, newRole) => {
    setTempRoles({
      ...tempRoles,
      [id]: newRole
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (confirmLogout) {
      try {
        const token = localStorage.getItem('token');
        await axios.post(
          'http://127.0.0.1:8000/api/logout',
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user_id');

        navigate('/');
        alert('Anda berhasil logout.');
      } catch (error) {
        console.error('Logout gagal:', error);
        alert('Terjadi kesalahan saat logout. Silakan coba lagi.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Header pada layar kecil menampilkan tombol hamburger */}
      <header className="bg-white flex items-center justify-between p-4 md:hidden shadow">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button onClick={() => setShowSidebar(!showSidebar)} className="text-gray-600">
          <i className="ri-menu-line text-2xl"></i>
        </button>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">

        {/* Sidebar */}
        {/* Pada layar kecil, sidebar akan tampil sebagai overlay jika showSidebar = true */}
        <aside 
          className={`fixed inset-0 z-50 bg-white p-4 transform md:transform-none 
          md:w-1/5 md:block flex flex-col items-center md:sticky top-0 h-auto md:h-screen
          transition-transform duration-300 ease-in-out
          ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        >
          <h1 className="text-2xl font-bold mb-8 text-center md:text-left w-full">Admin Panel</h1>
          <nav className="flex flex-col space-y-6 text-gray-600 w-full">
              <Link 
                to="/adminDashboard" 
                className="flex items-center space-x-3 text-green-500 font-semibold"
                onClick={() => setShowSidebar(false)}
              >
                  <i className="ri-user-line text-xl"></i>
                  <span>Manajemen Pengguna</span>
              </Link>
              <Link 
                to="/adminManajemenEdukasi" 
                className="flex items-center space-x-3"
                onClick={() => setShowSidebar(false)}
              >
                  <i className="ri-file-list-line text-xl"></i>
                  <span>Manajemen Konten Edukasi</span>
              </Link>
              <Link 
                to="/adminManajemenTantangan" 
                className="flex items-center space-x-3"
                onClick={() => setShowSidebar(false)}
              >
                  <i className="ri-trophy-line text-xl"></i>
                  <span>Manajemen Tantangan Harian</span>
              </Link>
          </nav>
          <button 
            onClick={handleLogout} 
            className="mt-8 text-red-600 flex items-center space-x-2 w-full"
          >
            <i className="ri-logout-box-r-line text-xl"></i>
            <span>Logout</span>
          </button>
          {/* Tombol close sidebar pada layar kecil */}
          <button 
            className="absolute top-4 right-4 md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setShowSidebar(false)}
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </aside>

        {/* Main Content Wrapper */}
        <div className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-8">Dashboard Admin</h1>

          {/* Manajemen Pengguna */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Manajemen Pengguna</h2>
            <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
              {loading ? (
                <p>Memuat data pengguna...</p>
              ) : (
                <table className="w-full table-auto text-sm md:text-base">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left whitespace-nowrap">Nama</th>
                      <th className="px-4 py-2 text-left whitespace-nowrap">Email</th>
                      <th className="px-4 py-2 text-left whitespace-nowrap">Role</th>
                      <th className="px-4 py-2 text-left whitespace-nowrap">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => {
                      const isCurrentUser = (currentUserId == user.id);
                      const isBothAdmin = (currentUserRole === 'admin' && user.role === 'admin');
                      return (
                        <tr key={user.id}>
                          <td className="border px-4 py-2 whitespace-nowrap">{user.username}</td>
                          <td className="border px-4 py-2 whitespace-nowrap">{user.email}</td>
                          <td className="border px-4 py-2 whitespace-nowrap">
                            <select
                              value={tempRoles[user.id] || user.role}
                              onChange={(e) => handleRoleChange(user.id, e.target.value)}
                              disabled={isCurrentUser || isBothAdmin}
                              className="border rounded px-2 py-1"
                            >
                              <option value="pengguna">pengguna</option>
                              <option value="admin">admin</option>
                            </select>
                          </td>
                          <td className="border px-4 py-2 space-x-2 whitespace-nowrap">
                            {!isCurrentUser && !isBothAdmin && (
                              <button
                                onClick={() => deleteUser(user.id)}
                                className="text-red-500 hover:underline"
                              >
                                Hapus
                              </button>
                            )}
                            {!isCurrentUser && !isBothAdmin && (
                              <button
                                onClick={() => updateUserRole(user.id)}
                                className="text-blue-500 hover:underline"
                              >
                                Update
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
