import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminManajemenTantangan = () => {
  const [tantangan, setTantangan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newChallenge, setNewChallenge] = useState({
    aktivitas: "",
    deskripsi_aktivitas: "",
    poin: 0,
    is_aktif: true,
  });
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false); // state untuk sidebar di layar kecil

  const fetchTantangan = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/api/tantangan-harian", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTantangan(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal memuat tantangan harian:", error);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const addOrUpdateTantangan = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (editMode) {
        await axios.put(
          `http://127.0.0.1:8000/api/tantangan-harian/${editingId}`,
          newChallenge,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Tantangan berhasil diperbarui!");
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/tantangan-harian",
          newChallenge,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Tantangan berhasil ditambahkan!");
      }
      fetchTantangan();
      setNewChallenge({
        aktivitas: "",
        deskripsi_aktivitas: "",
        poin: 0,
        is_aktif: true,
      });
      setEditMode(false);
      setEditingId(null);
    } catch (error) {
      console.error("Gagal menambahkan atau memperbarui tantangan:", error);
      alert("Terjadi kesalahan.");
    }
  };

  const deleteTantangan = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/tantangan-harian/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTantangan();
      alert("Tantangan berhasil dihapus.");
    } catch (error) {
      console.error("Gagal menghapus tantangan:", error);
      alert("Terjadi kesalahan saat menghapus tantangan.");
    }
  };

  const handleEdit = (item) => {
    setNewChallenge({
      aktivitas: item.aktivitas,
      deskripsi_aktivitas: item.deskripsi_aktivitas,
      poin: item.poin,
      is_aktif: item.is_aktif,
    });
    setEditMode(true);
    setEditingId(item.id);
  };

  useEffect(() => {
    fetchTantangan();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">

      {/* Header pada layar kecil */}
      <header className="bg-white flex items-center justify-between p-4 md:hidden shadow">
        <h1 className="text-xl font-bold">Admin Panel</h1>
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
        <h1 className="text-2xl font-bold mb-8 text-center md:text-left w-full">Admin Panel</h1>
        <nav className="flex flex-col space-y-6 text-gray-600 w-full">
          <Link
            to="/adminDashboard"
            className="flex items-center space-x-3"
            onClick={() => setShowSidebar(false)}
          >
            <i className="ri-user-line text-xl"></i>
            <span>Manajemen Pengguna</span>
          </Link>
          <Link
            to="/adminManajemenEdukasi"
            className="flex items-center space-x-3"
            onClick={() => setShowSidebar(false)}
          >
            <i className="ri-file-list-line text-xl"></i>
            <span>Manajemen Konten Edukasi</span>
          </Link>
          <Link
            to="/adminManajemenTantangan"
            className="flex items-center space-x-3 text-green-500 font-semibold"
            onClick={() => setShowSidebar(false)}
          >
            <i className="ri-trophy-line text-xl"></i>
            <span>Manajemen Tantangan Harian</span>
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

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
        <h2 className="text-xl font-semibold mb-4">Manajemen Tantangan Harian</h2>
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <form onSubmit={addOrUpdateTantangan}>
            <h3 className="text-lg font-semibold mb-2">
              {editMode ? "Edit Tantangan" : "Tambah Tantangan"}
            </h3>
            <div className="mb-2">
              <label className="block text-sm">Aktivitas</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newChallenge.aktivitas}
                onChange={(e) => setNewChallenge({ ...newChallenge, aktivitas: e.target.value })}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm">Deskripsi</label>
              <textarea
                className="w-full p-2 border rounded min-h-[150px] sm:min-h-[200px] lg:min-h-[300px]"
                value={newChallenge.deskripsi_aktivitas}
                onChange={(e) => setNewChallenge({ ...newChallenge, deskripsi_aktivitas: e.target.value })}
                required
              ></textarea>
            </div>
            <div className="mb-2">
              <label className="block text-sm">Poin</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={newChallenge.poin}
                onChange={(e) =>
                  setNewChallenge({ ...newChallenge, poin: parseInt(e.target.value) })
                }
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm">Status</label>
              <select
                className="w-full p-2 border rounded"
                value={newChallenge.is_aktif}
                onChange={(e) =>
                  setNewChallenge({ ...newChallenge, is_aktif: e.target.value === "true" })
                }
                required
              >
                <option value="true">Aktif</option>
                <option value="false">Tidak Aktif</option>
              </select>
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              {editMode ? "Perbarui" : "Tambah"}
            </button>
          </form>
        </div>

        {/* Tabel Tantangan Harian */}
        <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4">Daftar Tantangan Harian</h3>
          {loading ? (
            <p>Memuat data tantangan...</p>
          ) : (
            <table className="w-full table-auto text-sm md:text-base">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Aktivitas</th>
                  <th className="px-4 py-2 text-left">Deskripsi</th>
                  <th className="px-4 py-2 text-left">Poin</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {tantangan.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">{item.aktivitas}</td>
                    <td className="border px-4 py-2">{item.deskripsi_aktivitas}</td>
                    <td className="border px-4 py-2">{item.poin}</td>
                    <td className="border px-4 py-2">{item.is_aktif ? "Aktif" : "Tidak Aktif"}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTantangan(item.id)}
                        className="text-red-500 hover:underline"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminManajemenTantangan;
