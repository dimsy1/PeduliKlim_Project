import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo-PeduliKlim";

const TantanganPage = () => {
    const leaderboard = [
        { username: "User A", points: 120 },
        { username: "User B", points: 115 },
        { username: "User C", points: 110 },
        { username: "User D", points: 105 },
        { username: "User E", points: 100 },
        { username: "User F", points: 95 },
        { username: "User G", points: 90 },
        { username: "User H", points: 85 },
        { username: "User I", points: 80 },
        { username: "User J", points: 75 },
    ];

    const getRankColor = (index) => {
        if (index === 0) return "text-yellow-500"; // Gold for 1st place
        if (index === 1) return "text-gray-400";   // Silver for 2nd place
        if (index === 2) return "text-yellow-700"; // Bronze for 3rd place
        return "text-gray-700"; // Default color for other ranks
    };

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
                    <Link to="/tantangan" className="flex items-center space-x-3 text-green-500">
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
                <button className="mt-auto text-red-600 flex items-center space-x-2">
                    <i className="ri-logout-box-r-line text-xl"></i>
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="flex justify-between items-center p-8 bg-white sticky top-0 z-10 shadow-md">
                    <h1 className="text-2xl font-semibold">Tantangan</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <i className="ri-notification-3-line text-gray-400 text-xl"></i>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    </div>
                </header>

                {/* Scrollable Main Section */}
                <main className="py-8 px-64 overflow-y-auto">
                    {/* Total Poin Pengguna */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6 flex items-center">
                        <i className="ri-award-line text-green-500 text-4xl mr-4"></i>
                        <div>
                            <h2 className="text-gray-600">Total Poin Anda</h2>
                            <p className="text-4xl font-bold text-green-500">54 pts</p>
                        </div>
                    </div>

                    {/* Leaderboard Pengguna */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 className="text-gray-600 mb-4 flex items-center">
                            <i className="ri-trophy-line text-xl mr-2 text-yellow-500"></i> Leaderboard
                        </h2>
                        <ol className="space-y-3">
                            {leaderboard.map((user, index) => (
                                <li key={user.username} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        {/* Rank Number */}
                                        <span className="text-gray-500 font-bold w-6 text-center">{index + 1}</span>
                                        
                                        {/* Profile Picture */}
                                        <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0">
                                            {/* Replace this div with an img tag if you have profile image URLs */}
                                            {/* <img src={user.profileImage} alt={user.username} className="w-full h-full rounded-full" /> */}
                                        </div>

                                        {/* Username with Rank Color */}
                                        <span className={`${getRankColor(index)} font-semibold`}>
                                            {user.username}
                                        </span>
                                    </div>
                                    {/* Points */}
                                    <span className={`${getRankColor(index)} font-semibold`}>
                                        {user.points} pts
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Tantangan Hari ini */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 className="text-gray-600 mb-4 flex items-center">
                            <i className="ri-calendar-check-line text-xl mr-2 text-green-500"></i> Tantangan Hari ini
                        </h2>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <input type="checkbox" className="mr-2" /> Gunakan transportasi umum atau berjalan kaki selama sehari penuh
                            </li>
                            <li className="flex items-center">
                                <input type="checkbox" className="mr-2" /> Bawa botol minum sendiri untuk mengurangi plastik
                            </li>
                            <li className="flex items-center">
                                <input type="checkbox" className="mr-2" /> Matikan lampu dan perangkat elektronik saat tidak digunakan
                            </li>
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TantanganPage;
