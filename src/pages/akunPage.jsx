import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo-PeduliKlim";

const AkunPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-1/5 bg-white p-4 flex flex-col items-center sticky top-0 h-screen">
                <div className="logo-sidebar my-8 p-0">
                    <Logo />
                </div>
                <nav className="flex flex-col space-y-6 text-gray-600">
                    <Link to="/dashboard" className="flex items-center space-x-3">
                        <i className="ri-home-line text-xl"></i>
                        <span>Beranda</span>
                    </Link>
                    <Link to="/tantangan" className="flex items-center space-x-3">
                        <i className="ri-trophy-line text-xl"></i>
                        <span>Tantangan</span>
                    </Link>
                    <Link to="/komunitas" className="flex items-center space-x-3">
                        <i className="ri-team-line text-xl"></i>
                        <span>Komunitas</span>
                    </Link>
                    <Link to="/akun" className="flex items-center space-x-3 text-green-500">
                        <i className="ri-user-line text-xl"></i>
                        <span>Akun</span>
                    </Link>
                </nav>
                <button className="mt-auto text-red-600 flex items-center space-x-2">
                    <i className="ri-logout-box-r-line text-xl"></i>
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="flex justify-between items-center p-8 bg-white sticky top-0 z-10 shadow-md">
                    <h1 className="text-2xl font-semibold">Akun</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <i className="ri-notification-3-line text-gray-400 text-xl"></i>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    </div>
                </header>

                {/* Scrollable Main Section */}
                <main className="py-8 px-64 overflow-y-auto">
                    {/* Profile Section */}
                    <div className="bg-white p-8 rounded-lg shadow flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
                        <button className="text-blue-500 text-sm mb-6">Ganti Foto Profil</button>

                        {/* Edit Profile Form */}
                        <h2 className="text-lg font-semibold mb-4">Edit Profil</h2>
                        <form className="w-full space-y-4">
                            <div>
                                <label className="block text-gray-600 text-sm mb-1">Nama Pengguna</label>
                                <input
                                    type="text"
                                    defaultValue="User"
                                    className="w-full px-4 py-2 rounded-full bg-gray-100 text-gray-600"
                                    
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm mb-1">E-mail</label>
                                <input
                                    type="email"
                                    defaultValue="user@email.com"
                                    className="w-full px-4 py-2 rounded-full bg-gray-100 text-gray-600"
                                    
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm mb-1">Password</label>
                                <input
                                    type="password"
                                    defaultValue="password"
                                    className="w-full px-4 py-2 rounded-full bg-gray-100 text-gray-600"
                                    
                                />
                            </div>
                            <button className="w-full bg-red-500 text-white py-2 rounded-full mt-6">
                                Hapus Akun
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AkunPage;
