import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../components/Logo-PeduliKlim";

const DashboardPage = () => {
    const [points, setPoints] = useState(0);
    const [reducedEmissions, setReducedEmissions] = useState(0);
    const [challenges, setChallenges] = useState([]);
    const [completedChallenges, setCompletedChallenges] = useState([]);
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const navigate = useNavigate();

    // State untuk menampilkan/menyembunyikan sidebar di layar kecil
    const [showSidebar, setShowSidebar] = useState(false);

    // Fetch tantangan harian dari backend
    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/tantangan-harian", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setChallenges(response.data);
            } catch (error) {
                console.error("Gagal memuat tantangan harian:", error);
            }
        };

        fetchChallenges();
    }, []);

    // Fungsi Logout dengan konfirmasi
    const handleLogout = async () => {
        const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
        if (confirmLogout) {
            try {
                await axios.post(
                    "http://127.0.0.1:8000/api/logout",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                localStorage.removeItem("token");
                alert("Anda berhasil logout.");
                navigate("/");
            } catch (error) {
                console.error("Logout gagal:", error);
                alert("Terjadi kesalahan saat logout. Silakan coba lagi.");
            }
        }
    };

    // Fungsi untuk menandai tantangan sebagai selesai
    const markChallengeAsCompleted = async (id) => {
        try {
            await axios.post(
                `http://127.0.0.1:8000/api/tantangan-harian/${id}/selesai`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setCompletedChallenges((prev) => [...prev, id]);
            alert("Tantangan berhasil diselesaikan!");
        } catch (error) {
            console.error("Gagal menyelesaikan tantangan:", error);
            alert("Terjadi kesalahan saat menyelesaikan tantangan.");
        }
    };

    // Fungsi untuk membuka dan menutup popup
    const closePopup = () => setSelectedChallenge(null);

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
                    <Link to="/beranda" className="flex items-center space-x-3 text-green-500 font-semibold" onClick={() => setShowSidebar(false)}>
                        <i className="ri-home-line text-xl"></i>
                        <span>Beranda</span>
                    </Link>
                    <Link to="/tantangan" className="flex items-center space-x-3" onClick={() => setShowSidebar(false)}>
                        <i className="ri-trophy-line text-xl"></i>
                        <span>Tantangan</span>
                    </Link>
                    <Link to="/komunitas" className="flex items-center space-x-3" onClick={() => setShowSidebar(false)}>
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
                    <h1 className="text-2xl font-semibold">Beranda</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <i className="ri-notification-3-line text-gray-400 text-xl"></i>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    </div>
                </header>

                {/* Main Dashboard Sections */}
                {/* Pada layar kecil, gunakan p-4, pada layar besar gunakan p-8 dan diatur px-64 */}
                <main className="py-4 px-4 md:py-8 md:px-64 overflow-y-auto">
                    <div className="welcome mb-4">
                        <h1 className="text-3xl md:text-4xl font-bold">Halo, User</h1>
                    </div>

                    {/* Total Poin dan Emisi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg shadow flex items-center">
                            <i className="ri-award-line text-green-500 text-4xl mr-4"></i>
                            <div>
                                <h2 className="text-gray-600">Total Poin Anda</h2>
                                <p className="text-2xl md:text-4xl font-bold text-green-500">{points} pts</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow flex items-center">
                            <i className="ri-leaf-line text-green-500 text-4xl mr-4"></i>
                            <div>
                                <h2 className="text-gray-600">Emisi yang Anda Kurangi</h2>
                                <p className="text-2xl md:text-4xl font-bold text-green-500">{reducedEmissions} kg CO₂</p>
                            </div>
                        </div>
                    </div>

                    {/* Tantangan Hari ini */}
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow mb-6">
                        <h2 className="text-gray-600 mb-4 flex items-center">
                            <i className="ri-calendar-check-line text-xl mr-2 text-green-500"></i> Tantangan Hari ini
                        </h2>
                        <ul className="space-y-4 md:space-y-6">
                            {challenges.map((task) => (
                                <li key={task.id} className="border-b pb-4">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-semibold">{task.aktivitas}</span>
                                            <span className="text-green-500 font-bold">{task.poin} Poin</span>
                                        </div>
                                        <div className="mt-2 md:mt-0 flex items-center space-x-2 md:space-x-4">
                                            <button
                                                className="text-blue-500 underline text-sm"
                                                onClick={() => setSelectedChallenge(task)}
                                            >
                                                Selengkapnya
                                            </button>
                                            <button
                                                className={`px-4 py-2 rounded ${
                                                    completedChallenges.includes(task.id)
                                                        ? "bg-gray-400 text-white cursor-not-allowed"
                                                        : "bg-green-500 text-white hover:bg-green-600"
                                                }`}
                                                onClick={() => markChallengeAsCompleted(task.id)}
                                                disabled={completedChallenges.includes(task.id)}
                                            >
                                                {completedChallenges.includes(task.id)
                                                    ? "Tantangan Selesai"
                                                    : "Selesaikan Tantangan"}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Popup untuk Selengkapnya */}
                    {selectedChallenge && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 md:p-9 rounded-lg shadow-lg max-w-lg w-full relative">
                                <h2 className="text-xl font-semibold mb-4">{selectedChallenge.aktivitas}</h2>
                                <p className="text-gray-600">{selectedChallenge.deskripsi_aktivitas}</p>
                                <button
                                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                                    onClick={closePopup}
                                >
                                    <i className="ri-close-line text-2xl"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
