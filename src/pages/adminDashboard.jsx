import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    // Fungsi untuk logout
    const handleLogout = () => {
        // Navigasi ke halaman landing page
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-1/5 bg-white p-4 flex flex-col items-center sticky top-0 h-screen">
                <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
                <nav className="flex flex-col space-y-6 text-gray-600">
                    <Link to="/adminDashboard" className="flex items-center space-x-3">
                        <i className="ri-user-line text-xl"></i>
                        <span>Manajemen Pengguna</span>
                    </Link>
                    <Link to="/adminManajemen" className="flex items-center space-x-3">
                        <i className="ri-file-list-line text-xl"></i>
                        <span>Manajemen Konten Edukasi</span>
                    </Link>
                    <Link to="/adminStatistik" className="flex items-center space-x-3">
                        <i className="ri-bar-chart-line text-xl"></i>
                        <span>Statistik Platform</span>
                    </Link>
                </nav>
                <button onClick={handleLogout} className="mt-auto text-red-600 flex items-center space-x-2">
                    <i className="ri-logout-box-r-line text-xl"></i>
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-semibold mb-8">Dashboard Admin</h1>
                
                {/* Manajemen Pengguna */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Manajemen Pengguna</h2>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Daftar Pengguna</h3>
                            <button className="bg-green-500 text-white px-4 py-2 rounded">Tambah Pengguna</button>
                        </div>
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 text-left">Nama</th>
                                    <th className="px-4 py-2 text-left">Email</th>
                                    <th className="px-4 py-2 text-left">Role</th>
                                    <th className="px-4 py-2 text-left">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2">Dimas</td>
                                    <td className="border px-4 py-2">dimas@email.com</td>
                                    <td className="border px-4 py-2">User</td>
                                    <td className="border px-4 py-2">
                                        <button className="text-red-500">Hapus</button>
                                    </td>
                                </tr>
                                {/* Tambahkan pengguna lain di sini */}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
