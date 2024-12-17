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
    const [uploadedImages, setUploadedImages] = useState({});
    const [showSidebar, setShowSidebar] = useState(false);
    const navigate = useNavigate();

    // Fetch tantangan harian dan tantangan yang sudah selesai
    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                // Fetch tantangan harian yang aktif
                const challengesResponse = await axios.get("http://127.0.0.1:8000/api/tantangan-harian", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setChallenges(
                    challengesResponse.data.map((task) => ({
                        ...task,
                        is_completed: task.is_completed || false, // Tambahkan status selesai
                    }))
                );
                
                // Fetch tantangan yang sudah diselesaikan dari backend
                const completedResponse = await axios.get("http://127.0.0.1:8000/api/tantangan-harian/completed", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setCompletedChallenges(completedResponse.data); // Perbarui state dengan data dari backend
            } catch (error) {
                if (error.response?.status === 401) {
                    alert("Sesi Anda telah berakhir. Silakan login kembali.");
                    navigate("/login");
                } else {
                    console.error("Gagal memuat data:", error);
                }
            }
        };
    
        fetchChallenges();
    }, [navigate]);

    // Fetch Total Poin
    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/total-points", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setPoints(response.data.total_points);
            } catch (error) {
                console.error("Gagal memuat total poin:", error);
            }
        };
    
        fetchPoints();
    }, []);
    
    // Fungsi Logout
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
                setCompletedChallenges([]);
                setUploadedImages({});
                alert("Anda berhasil logout.");
                navigate("/login");
            } catch (error) {
                console.error("Logout gagal:", error);
                alert("Terjadi kesalahan saat logout. Silakan coba lagi.");
            }
        }
    };

    // Menandai tantangan sebagai selesai
    const markChallengeAsCompleted = async (id) => {
        const imageData = uploadedImages[id];
        if (!imageData || !imageData.file) {
            alert("Silakan unggah bukti terlebih dahulu.");
            return;
        }
    
        const formData = new FormData();
        formData.append("bukti", imageData.file);
    
        try {
            await axios.post(
                `http://127.0.0.1:8000/api/tantangan-harian/${id}/mark-completed`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
    
            // Perbarui status tantangan di challenges
            setChallenges((prevChallenges) =>
                prevChallenges.map((task) =>
                    task.id === id ? { ...task, is_completed: true } : task
                )
            );
    
            alert("Tantangan berhasil diselesaikan!");
            setUploadedImages((prev) => {
                const updated = { ...prev };
                if (updated[id]?.preview) {
                    URL.revokeObjectURL(updated[id].preview); // Bersihkan URL preview
                }
                delete updated[id];
                return updated;
            });
        } catch (error) {
            console.error("Gagal menyelesaikan tantangan:", error);
            alert(error.response?.data?.message || "Terjadi kesalahan saat menyelesaikan tantangan.");
        }
    };        

    // Menangani upload gambar
    const handleImageUpload = (taskId, event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedImages((prev) => ({
                ...prev,
                [taskId]: {
                    file, // Simpan file asli untuk API
                    preview: URL.createObjectURL(file), // URL untuk preview
                },
            }));
        }
    };

    // Menutup popup
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
                <div className="logo-sidebar my-8 px-6 w-full flex items-center justify-center md:justify-start">
                    <Logo />
                </div>
                <nav className="flex flex-col space-y-6 px-6 text-gray-600 w-full">
                    <Link to="/dashboard" className="flex items-center space-x-3 text-green-500 font-semibold" onClick={() => setShowSidebar(false)}>
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
                <button onClick={handleLogout} className="mt-8 px-6 text-red-600 flex items-center space-x-2 w-full">
                    <i className="ri-logout-box-r-line text-xl"></i>
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="hidden md:flex justify-between items-center p-8 bg-white sticky top-0 z-10 shadow-md">
                    <h1 className="text-2xl font-semibold">Beranda</h1>
                </header>
                <main className="py-4 px-4 md:py-8 md:px-64 overflow-y-auto">
                    {/* <div className="welcome mb-4">
                        <h1 className="text-3xl md:text-4xl font-bold">Halo, User</h1>
                    </div> */}

                    {/* Total Poin dan Emisi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg shadow flex items-center">
                            <i className="ri-award-line text-green-500 text-4xl mr-4"></i>
                            <div>
                                <h2 className="text-gray-600">Total Poin Anda</h2>
                                <p className="text-2xl md:text-4xl font-bold text-green-500">
                                    {points} pts
                                </p>
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

                    {/* Tantangan Hari Ini */}
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow mb-6">
                        <h2 className="text-gray-600 mb-6 flex items-center">
                            <i className="ri-calendar-check-line text-xl mr-2 text-green-500"></i> Tantangan Hari ini
                        </h2>
                        <ul className="space-y-6">
                            {challenges.length > 0 ? (
                                challenges.map((task) => (
                                    <li key={task.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-lg font-semibold text-gray-700">{task.aktivitas}</span>
                                                <span className="text-green-500 font-bold">{task.poin} Poin</span>
                                            </div>
                                            <div className="mt-4 md:mt-0 flex items-center space-x-4">
                                                <button
                                                    className="text-blue-500 text-sm flex items-center space-x-1 hover:text-blue-600"
                                                    onClick={() => setSelectedChallenge(task)}
                                                >
                                                    <i className="ri-information-line text-lg md:text-xl"></i>
                                                    <span>Info</span>
                                                </button>
                                                <label className="relative cursor-pointer flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-600 text-sm rounded-lg px-4 py-2">
                                                    <i className="ri-upload-line text-xl mr-2"></i>
                                                    <span>Upload</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                        onChange={(event) => handleImageUpload(task.id, event)}
                                                    />
                                                </label>
                                                {uploadedImages[task.id]?.preview && (
                                                    <img
                                                        src={uploadedImages[task.id].preview} // URL preview untuk ditampilkan
                                                        alt="Preview"
                                                        className="w-16 h-16 object-cover rounded-lg border"
                                                    />
                                                )}

                                                <button
                                                    className={`px-4 py-2 rounded font-medium ${
                                                        task.is_completed
                                                            ? "bg-gray-400 text-white cursor-not-allowed"
                                                            : "bg-green-500 text-white hover:bg-green-600"
                                                    }`}
                                                    onClick={() => markChallengeAsCompleted(task.id)}
                                                    disabled={task.is_completed}
                                                >
                                                    {task.is_completed ? "Tantangan Selesai" : "Selesaikan Tantangan"}
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center">Tidak ada tantangan tersedia saat ini.</p>
                            )}
                        </ul>
                    </div>

                    {/* Popup Selengkapnya */}
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
