import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo-PeduliKlim";

const KomunitasPage = () => {
    const edukasiKonten = [
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
        {
            title: "Energi Terbarukan untuk Rumah Tangga",
            description: "Penggunaan panel surya atau sumber energi terbarukan lainnya membantu mengurangi ketergantungan pada bahan bakar fosil dan berkontribusi pada lingkungan yang lebih sehat...",
            image: "src/assets/fresh-2386786_1920.jpg",
        },
        {
            title: "Menghemat Air di Rumah",
            description: "Menyadari pentingnya penghematan air dapat membantu mencegah krisis air di masa depan. Cobalah memperbaiki kebocoran keran atau mengurangi waktu mandi sebagai langkah sederhana...",
            image: "src/assets/co2-1076817_1280.jpg",
        },
    ];

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
                    <Link to="/komunitas" className="flex items-center space-x-3 text-green-500">
                        <i className="ri-team-line text-xl"></i>
                        <span>Komunitas</span>
                    </Link>
                    <Link to="/akun" className="flex items-center space-x-3">
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
                    <h1 className="text-2xl font-semibold">Komunitas</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <i className="ri-notification-3-line text-gray-400 text-xl"></i>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    </div>
                </header>

                {/* Scrollable Main Section */}
                <main className="py-8 px-64 overflow-y-auto">
                    {/* Konten Edukasi */}
                    <div className="space-y-6">
                        {edukasiKonten.map((konten, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow flex relative">
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
                </main>
            </div>
        </div>
    );
};

export default KomunitasPage;
