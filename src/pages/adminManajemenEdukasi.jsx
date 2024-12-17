import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminManajemenEdukasi = () => {
  const [kontenEdukasi, setKontenEdukasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newKonten, setNewKonten] = useState({
    judul: "",
    isi_konten: "",
    tipe_konten: "artikel", 
    is_published: true,
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const navigate = useNavigate();
  
  // State untuk menampilkan / menyembunyikan sidebar di layar kecil
  const [showSidebar, setShowSidebar] = useState(false);

  const fetchKontenEdukasi = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/api/konten-edukasi", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setKontenEdukasi(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal memuat konten edukasi:", error);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const addOrUpdateKonten = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("judul", newKonten.judul);
      formData.append("isi_konten", newKonten.isi_konten);
      formData.append("tipe_konten", newKonten.tipe_konten);
      formData.append("is_published", newKonten.is_published ? "1" : "0");

      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      if (editMode) {
        await axios.post(
          `http://127.0.0.1:8000/api/konten-edukasi/${editingId}?_method=PUT`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Konten edukasi berhasil diperbarui!");
      } else {
        await axios.post("http://127.0.0.1:8000/api/konten-edukasi", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Konten edukasi berhasil ditambahkan!");
      }

      fetchKontenEdukasi();
      setNewKonten({
        judul: "",
        isi_konten: "",
        tipe_konten: "artikel",
        is_published: true,
      });
      setThumbnailFile(null);
      setEditMode(false);
      setEditingId(null);
    } catch (error) {
      console.error("Gagal menambahkan atau memperbarui konten edukasi:", error);
      alert("Terjadi kesalahan.");
    }
  };

  const deleteKonten = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/konten-edukasi/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchKontenEdukasi();
      alert("Konten edukasi berhasil dihapus.");
    } catch (error) {
      console.error("Gagal menghapus konten edukasi:", error);
      alert("Terjadi kesalahan saat menghapus konten edukasi.");
    }
  };

  const handleEdit = (item) => {
    setNewKonten({
      judul: item.judul,
      isi_konten: item.isi_konten,
      tipe_konten: item.tipe_konten,
      is_published: item.is_published,
    });
    setThumbnailFile(null);
    setEditMode(true);
    setEditingId(item.id);
  };

  useEffect(() => {
    fetchKontenEdukasi();
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
            className="flex items-center space-x-3 text-green-500 font-semibold"
            onClick={() => setShowSidebar(false)}
          >
            <i className="ri-file-list-line text-xl"></i>
            <span>Manajemen Konten Edukasi</span>
          </Link>
          <Link 
            to="/adminManajemenTantangan" 
            className="flex items-center space-x-3"
            onClick={() => setShowSidebar(false)}
          >
            <i className="ri-trophy-line text-xl"></i>
            <span>Manajemen Tantangan Harian</span>
          </Link>
          <Link 
            to="/adminValidasiTantangan" 
            className="flex items-center space-x-3"
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
        <h2 className="text-xl font-semibold mb-4">Manajemen Konten Edukasi</h2>
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <form onSubmit={addOrUpdateKonten} encType="multipart/form-data">
            <h3 className="text-lg font-semibold mb-2">
              {editMode ? "Edit Konten Edukasi" : "Tambah Konten Edukasi"}
            </h3>
            <div className="mb-2">
              <label className="block text-sm">Judul</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newKonten.judul}
                onChange={(e) => setNewKonten({ ...newKonten, judul: e.target.value })}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm">Isi Konten</label>
              <textarea
                className="w-full p-2 border rounded min-h-[150px] sm:min-h-[200px] lg:min-h-[300px]"
                value={newKonten.isi_konten}
                onChange={(e) => setNewKonten({ ...newKonten, isi_konten: e.target.value })}
                required
              ></textarea>
            </div>
            <div className="mb-2">
              <label className="block text-sm">Tipe Konten</label>
              <select
                className="w-full p-2 border rounded"
                value={newKonten.tipe_konten}
                onChange={(e) => setNewKonten({ ...newKonten, tipe_konten: e.target.value })}
              >
                <option value="artikel">Artikel</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-sm">Status Publikasi</label>
              <select
                className="w-full p-2 border rounded"
                value={newKonten.is_published}
                onChange={(e) =>
                  setNewKonten({ ...newKonten, is_published: e.target.value === "true" })
                }
              >
                <option value="true">Published</option>
                <option value="false">Unpublished</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-sm">Thumbnail (Upload Gambar)</label>
              <input
                type="file"
                className="w-full p-2 border rounded"
                onChange={(e) => setThumbnailFile(e.target.files[0])}
              />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              {editMode ? "Perbarui" : "Tambah"}
            </button>
          </form>
        </div>

        {/* Tabel Konten Edukasi */}
        <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4">Daftar Konten Edukasi</h3>
          {loading ? (
            <p>Memuat data konten edukasi...</p>
          ) : (
            <table className="w-full table-auto text-sm md:text-base">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Judul</th>
                  <th className="px-4 py-2 text-left">Tipe</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Thumbnail</th>
                  <th className="px-4 py-2 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {kontenEdukasi.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">{item.judul}</td>
                    <td className="border px-4 py-2 capitalize">{item.tipe_konten}</td>
                    <td className="border px-4 py-2">
                      {item.is_published ? "Published" : "Unpublished"}
                    </td>
                    <td className="border px-4 py-2">
                      {item.thumbnail && (
                        <img
                          src={`http://127.0.0.1:8000/storage/${item.thumbnail}`}
                          alt={item.judul}
                          className="h-16 w-16 object-cover"
                        />
                      )}
                    </td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteKonten(item.id)}
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

export default AdminManajemenEdukasi;
