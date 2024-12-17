import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminValidasiTantangan = () => {
  const navigate = useNavigate();
  const [validasiTantangan, setValidasiTantangan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  // Fetch tantangan untuk divalidasi
  const fetchValidasiTantangan = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/api/validasi-tantangan", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setValidasiTantangan(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal memuat validasi tantangan:", error);
    }
  };

  // Validasi tantangan
  const handleValidasi = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://127.0.0.1:8000/api/validasi-tantangan/${id}`,
        { is_validated: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Tantangan berhasil divalidasi!");
      fetchValidasiTantangan();
    } catch (error) {
      console.error("Gagal memvalidasi tantangan:", error);
      alert("Terjadi kesalahan saat memvalidasi tantangan.");
    }
  };

  // Tolak tantangan
  const handleTolakValidasi = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://127.0.0.1:8000/api/validasi-tantangan/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Tantangan berhasil ditolak!");
      fetchValidasiTantangan(); // Refresh data setelah penolakan
    } catch (error) {
      console.error("Gagal menolak validasi tantangan:", error);
      alert("Terjadi kesalahan saat menolak tantangan.");
    }
  };
  
  

  useEffect(() => {
    fetchValidasiTantangan();
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (confirmLogout) {
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          "http://127.0.0.1:8000/api/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        localStorage.removeItem("token");
        navigate("/");
        alert("Anda berhasil logout.");
      } catch (error) {
        console.error("Logout gagal:", error);
        alert("Terjadi kesalahan saat logout. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header pada layar kecil */}
      <header className="bg-white flex items-center justify-between p-4 md:hidden shadow">
        <h1 className="text-xl font-bold">Validasi Tantangan</h1>
        <button onClick={() => setShowSidebar(!showSidebar)} className="text-gray-600">
          <i className="ri-menu-line text-2xl"></i>
        </button>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside
          className={`fixed inset-0 z-50 bg-white p-4 transform md:transform-none 
            md:w-1/5 md:block flex flex-col items-center md:sticky top-0 h-auto md:h-screen
            transition-transform duration-300 ease-in-out
            ${showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <h1 className="text-2xl font-bold mb-8 text-center md:text-left w-full">
            Admin Panel
          </h1>
          <nav className="flex flex-col space-y-6 text-gray-600 w-full">
            <Link to="/adminDashboard" className="flex items-center space-x-3">
              <i className="ri-user-line text-xl"></i>
              <span>Manajemen Pengguna</span>
            </Link>
            <Link to="/adminManajemenEdukasi" className="flex items-center space-x-3">
              <i className="ri-file-list-line text-xl"></i>
              <span>Manajemen Konten Edukasi</span>
            </Link>
            <Link to="/adminValidasiTantangan" className="flex items-center space-x-3">
              <i className="ri-trophy-line text-xl"></i>
              <span>Manajemen Tantangan Harian</span>
            </Link>
            <Link 
                to="/adminValidasiTantangan" 
                className="flex items-center space-x-3 text-green-500 font-semibold"
                onClick={() => setShowSidebar(false)}
            >
                <i className="ri-check-line text-xl"></i>
                <span>Validasi Tantangan</span>
            </Link>
          </nav>
          <button onClick={handleLogout} className="mt-8 text-red-600 flex items-center space-x-2 w-full">
            <i className="ri-logout-box-r-line text-xl"></i>
            <span>Logout</span>
          </button>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-8">Validasi Tantangan</h1>
          <section>
            <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
              {loading ? (
                <p>Memuat data validasi tantangan...</p>
              ) : validasiTantangan.length > 0 ? (
                <table className="w-full table-auto text-sm md:text-base">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left">Nama Pengguna</th>
                      <th className="px-4 py-2 text-left">Tantangan</th>
                      <th className="px-4 py-2 text-left">Bukti</th>
                      <th className="px-4 py-2 text-left">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {validasiTantangan.map((item) => (
                        <tr key={item.id}>
                            <td className="border px-4 py-2">{item.user.username}</td>
                            <td className="border px-4 py-2">{item.tantangan_harian.aktivitas}</td>
                            <td className="border px-4 py-2">
                                <a
                                href={`http://127.0.0.1:8000/storage/${item.bukti}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                                >
                                Lihat Bukti
                                </a>
                            </td>
                            <td className="border px-4 py-2 space-x-2">
                                {item.is_validated ? (
                                    <span className="text-green-500">Tervalidasi</span>
                                ) : (
                                    <>
                                        <button
                                        onClick={() => handleValidasi(item.id)}
                                        className="text-blue-500 hover:underline"
                                        >
                                        Validasi
                                        </button>
                                        {/* <button
                                        onClick={() => handleTolakValidasi(item.id)}
                                        className="text-red-500 hover:underline"
                                        >
                                        Tolak
                                        </button> */}
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
              ) : (
                <p className="text-gray-500">Tidak ada tantangan untuk divalidasi saat ini.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminValidasiTantangan;
