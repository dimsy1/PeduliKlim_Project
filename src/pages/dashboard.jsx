import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo-PeduliKlim";

const DashboardPage = () => {
    const [points, setPoints] = useState(54);
    const [reducedEmissions, setReducedEmissions] = useState(10);
    const [completedChallenges, setCompletedChallenges] = useState([false, false, false]);
    const navigate = useNavigate();

    const wawasanBaruKonten = [
        {
            title: "Apa Itu Jejak Karbon?",
            description: "Jejak karbon adalah jumlah total emisi gas rumah kaca yang dihasilkan oleh aktivitas manusia dan berdampak besar pada pemanasan global. Mengurangi jejak karbon dapat membantu menghambat perubahan iklim...",
            image: "src/assets/co2-1076817_1280.jpg",
        },
        {
            title: "Dampak Perubahan Iklim",
            description: "Perubahan iklim menyebabkan perubahan suhu ekstrem, meningkatkan risiko bencana alam seperti banjir dan kekeringan, serta berdampak pada keanekaragaman hayati dan ekosistem kita...",
            image: "src/assets/co2-3139230_1280.jpg",
        },
        {
            title: "Cara Mengurangi Penggunaan Plastik",
            description: "Penggunaan plastik sekali pakai memberikan kontribusi besar terhadap pencemaran lingkungan. Menggunakan tas belanja kain atau botol minum sendiri bisa menjadi langkah kecil yang berarti...",
            image: "src/assets/fresh-2386786_1920.jpg",
        },
    ];

    // Fungsi untuk menambah poin dan mengurangi emisi
    const addPoints = () => {
        setPoints(points + 5);
        setReducedEmissions(reducedEmissions + 1);
    };

    // Fungsi untuk menandai tantangan sebagai selesai
    const toggleChallengeCompletion = (index) => {
        const updatedChallenges = [...completedChallenges];
        updatedChallenges[index] = !updatedChallenges[index];
        setCompletedChallenges(updatedChallenges);

        if (updatedChallenges[index]) {
            addPoints(); // Tambah poin setiap kali tantangan diselesaikan
        }
    };

    // Fungsi Logout
    const handleLogout = () => {
        // Navigasi ke halaman landing page
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-1/5 bg-white p-4 flex flex-col items-center sticky top-0 h-screen">
                <div className="logo-sidebar my-8 p-0">
                    <Logo />
                </div>
                <nav className="flex flex-col space-y-6 text-gray-600">
                    <Link to="/beranda" className="flex items-center space-x-3 text-green-500">
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
                    <Link to="/akun" className="flex items-center space-x-3">
                        <i className="ri-user-line text-xl"></i>
                        <span>Akun</span>
                    </Link>
                </nav>
                <button onClick={handleLogout} className="mt-auto text-red-600 flex items-center space-x-2">
                    <i className="ri-logout-box-r-line text-xl"></i>
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="flex justify-between items-center p-8 bg-white sticky top-0 z-10 shadow-md">
                    <h1 className="text-2xl font-semibold">Beranda</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <i className="ri-notification-3-line text-gray-400 text-xl"></i>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    </div>
                </header>

                {/* Scrollable Main Dashboard Sections */}
                <main className="py-8 px-64 overflow-y-auto">
                    <div className="welcome mb-4">
                        <h1 className="text-4xl font-bold ">Halo, User</h1>
                    </div>

                    {/* Total Poin dan Emisi */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg shadow flex items-center">
                            <i className="ri-award-line text-green-500 text-4xl mr-4"></i>
                            <div>
                                <h2 className="text-gray-600">Total Poin Anda</h2>
                                <p className="text-4xl font-bold text-green-500">{points} pts</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow flex items-center">
                            <i className="ri-leaf-line text-green-500 text-4xl mr-4"></i>
                            <div>
                                <h2 className="text-gray-600">Emisi yang Anda Kurangi</h2>
                                <p className="text-4xl font-bold text-green-500">{reducedEmissions} kg CO₂</p>
                            </div>
                        </div>
                    </div>

                    {/* Tantangan Hari ini */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 className="text-gray-600 mb-4 flex items-center">
                            <i className="ri-calendar-check-line text-xl mr-2 text-green-500"></i> Tantangan Hari ini
                        </h2>
                        <ul className="space-y-3">
                            {["Gunakan transportasi umum atau berjalan kaki", "Kurangi penggunaan plastik", "Matikan lampu yang tidak terpakai"].map((task, index) => (
                                <li key={index}>
                                    <input
                                        type="checkbox"
                                        checked={completedChallenges[index]}
                                        onChange={() => toggleChallengeCompletion(index)}
                                        className="mr-2"
                                    />
                                    {task}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Temukan Wawasan Baru */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-gray-900 font-medium">Temukan Wawasan Baru</h2>
                            <Link to="/komunitas" className="text-blue-500 text-sm">Lihat semuanya</Link>
                        </div>
                        <div className="space-y-6">
                            {wawasanBaruKonten.map((konten, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow flex">
                                    {/* Gambar Thumbnail di Sisi Kiri */}
                                    <div className="w-32 h-32 flex-shrink-0 mr-6">
                                        <img
                                            src={konten.image}
                                            alt={konten.title}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                    {/* Konten Teks di Sisi Kanan */}
                                    <div className="flex flex-col flex-grow">
                                        <h3 className="text-xl font-semibold mb-2">{konten.title}</h3>
                                        <p className="text-gray-500 text-sm mb-4">{konten.description}</p>
                                        <div className="flex justify-end mt-auto">
                                            <button className="bg-green-500 text-white px-4 py-2 rounded">
                                                Lihat Selengkapnya
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
