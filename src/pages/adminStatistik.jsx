import React from "react";
import { Link } from "react-router-dom";

const AdminStatistik = () => {
    return(
    <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-1/5 bg-white p-4 flex flex-col items-center sticky top-0 h-screen">
                <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
                <nav className="flex flex-col space-y-6 text-gray-600">
                    <Link to="/adminDashboard" className="flex items-center space-x-3">
                        <i className="ri-user-line text-xl"></i>
                        <span>Manajemen Pengguna</span>
                    </Link>
                    <Link to="/adminManajemenEdukasi" className="flex items-center space-x-3">
                        <i className="ri-file-list-line text-xl"></i>
                        <span>Manajemen Konten Edukasi</span>
                    </Link>
                    <Link to="/adminManajemenTantangan" className="flex items-center space-x-3">
                        <i className="ri-trophy-line text-xl"></i>
                        <span>Manajemen Tantangan Harian</span>
                    </Link>
                    <Link to="/adminStatistik" className="flex items-center space-x-3 text-green-500 font-semibold">
                        <i className="ri-bar-chart-line text-xl"></i>
                        <span>Statistik Platform</span>
                    </Link>
                </nav>
                <button className="mt-auto text-red-600 flex items-center space-x-2">
                    <i className="ri-logout-box-r-line text-xl"></i>
                    <span>Logout</span>
                </button>
            </aside>

            {/* Statistik Platform */}
            <div className="flex-1 p-8">
                <section>
                    <h2 className="text-xl font-semibold mb-4">Statistik Platform</h2>
                    <div className="bg-white p-4 rounded-lg shadow grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center">
                            <h3 className="text-2xl font-bold text-green-500">1,024</h3>
                            <p className="text-gray-600">Total Pengguna</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h3 className="text-2xl font-bold text-green-500">532</h3>
                            <p className="text-gray-600">Total Konten</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h3 className="text-2xl font-bold text-green-500">6,781</h3>
                            <p className="text-gray-600">Total Tantangan Selesai</p>
                        </div>
                    </div>
                </section>
            </div>
    </div>
    );
};

export default AdminStatistik;