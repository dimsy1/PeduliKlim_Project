import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../components/Logo-PeduliKlim";

const KomunitasPage = () => {
    const navigate = useNavigate();
    const [edukasiKonten, setEdukasiKonten] = useState([]);
    const [loading, setLoading] = useState(true);

    // State untuk menampilkan/menyembunyikan sidebar di layar kecil
    const [showSidebar, setShowSidebar] = useState(false);

    const fetchKontenEdukasi = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://127.0.0.1:8000/api/konten-edukasi", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEdukasiKonten(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Gagal memuat konten edukasi:", error);
        }
    };

    useEffect(() => {
        fetchKontenEdukasi();
    }, []);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
        if (confirmLogout) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("user_id");
            navigate("/login");
            alert("Anda berhasil logout.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">

            {/* Header pada layar kecil */}
            <header className="bg-white flex items-center justify-between p-4 md:hidden shadow">
                <h1 className="text-xl font-bold">PeduliKlim</h1>
                <button onClick={() => setShowSidebar(!showSidebar)} className="text-gray-600">
                    <i className="ri-menu-line text-2xl"></i>
                </button>
            </header>

            {/* Sidebar */}
            <aside
                className={`fixed inset-0 z-50 bg-white p-4 transform md:transform-none 
                md:w-1/5 md:block flex flex-col items-center md:sticky top-0 h-auto md:h-screen
                transition-transform duration-300 ease-in-out
                ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                <div className="logo-sidebar my-8 p-0 w-full flex items-center justify-center md:justify-start">
                    <Logo />
                </div>
                <nav className="flex flex-col space-y-6 text-gray-600 w-full">
                    <Link to="/dashboard" className="flex items-center space-x-3" onClick={() => setShowSidebar(false)}>
                        <i className="ri-home-line text-xl"></i>
                        <span>Beranda</span>
                    </Link>
                    <Link to="/tantangan" className="flex items-center space-x-3" onClick={() => setShowSidebar(false)}>
                        <i className="ri-trophy-line text-xl"></i>
                        <span>Tantangan</span>
                    </Link>
                    <Link to="/komunitas" className="flex items-center space-x-3 text-green-500" onClick={() => setShowSidebar(false)}>
                        <i className="ri-team-line text-xl"></i>
                        <span>Edukasi</span>
                    </Link>
                    <Link to="/akun" className="flex items-center space-x-3" onClick={() => setShowSidebar(false)}>
                        <i className="ri-user-line text-xl"></i>
                        <span>Akun</span>
                    </Link>
                </nav>
                <button onClick={handleLogout} className="mt-8 text-red-600 flex items-center space-x-2 w-full">
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
            <div className="flex-1 flex flex-col">
                {/* Header pada layar besar */}
                <header className="hidden md:flex justify-between items-center p-8 bg-white sticky top-0 z-10 shadow-md">
                    <h1 className="text-2xl font-semibold">Edukasi</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <i className="ri-notification-3-line text-gray-400 text-xl"></i>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    </div>
                </header>

                {/* Scrollable Main Section */}
                {/* Pada layar kecil gunakan p-4, pada layar besar gunakan p-8 dan jika perlu kurangi px agar lebih pas di layar kecil */}
                <main className="py-4 px-4 md:py-8 md:px-64 overflow-y-auto">
                    {loading ? (
                        <p>Memuat data konten edukasi...</p>
                    ) : (
                        <div className="space-y-4 md:space-y-6">
                            {edukasiKonten.map((konten) => (
                                <div key={konten.id} className="bg-white p-4 md:p-6 rounded-lg shadow flex flex-col md:flex-row relative">
                                    {/* Gambar Thumbnail di Sisi Kiri */}
                                    <div className="w-full md:w-32 md:h-32 md:mr-6 flex-shrink-0 mb-4 md:mb-0">
                                        {konten.thumbnail ? (
                                            <img
                                                src={`http://127.0.0.1:8000/storage/${konten.thumbnail}`}
                                                alt={konten.judul}
                                                className="w-full h-32 md:h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-full h-32 md:h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    {/* Konten Teks di Sisi Kanan */}
                                    <div className="flex flex-col flex-grow">
                                        <h3 className="text-lg md:text-xl font-semibold mb-2">{konten.judul}</h3>
                                        <p className="text-gray-500 text-sm mb-4">{konten.isi_konten}</p>
                                        <div className="flex justify-end mt-auto">
                                            <button className="bg-green-500 text-white px-4 py-2 rounded text-sm md:text-base">
                                                Lihat Selengkapnya
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default KomunitasPage;
