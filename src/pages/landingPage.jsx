import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo-PeduliKlim";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="landing-page min-h-screen flex flex-col">
      {/* Header */}
      <div className="header w-full fixed py-6 px-4 md:px-24 flex items-center justify-between shadow-md bg-white z-10">
        {/* Logo */}
        <Logo />

        {/* Login & Register Button */}
        <div className="flex gap-2 items-center">
          <Link to='/login' className="px-6 py-2 text-gray-900 border border-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition">
            Masuk
          </Link>
          <Link to='/register' className="px-6 py-2 text-white bg-green-500 rounded-full hover:bg-green-600 transition">
            Daftar
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto flex-grow mt-24">
        {/* Hero */}
        <div className="hero grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center px-4 md:px-24 mx-auto text-center md:text-left">
          <div className="text">
            <p className="text-3xl font-bold mb-4">
              Selamat Datang di Peduli<span className="text-green-600">Klim</span>
            </p>
            <h1 className="text-5xl font-bold mb-4 text-green-500 leading-tight">
              Bersama Kita Jaga Bumi dari Perubahan Iklim
            </h1>
            <p className="text-lg text-gray-500">
              Di PeduliKlim, kami percaya bahwa setiap langkah kecil bisa membawa perubahan besar bagi masa depan bumi kita. Website ini hadir untuk mengedukasi dan mengajak setiap individu berperan aktif dalam mencegah perubahan iklim. Dengan pengetahuan yang tepat dan aksi nyata, kita bisa menjaga lingkungan dan menciptakan dunia yang lebih baik untuk generasi mendatang.
            </p>
          </div>
          <div className="illustration">
            <img src="src/assets/TeksUtama.png" alt="Hero Illustration" className="w-full" />
          </div>
        </div>

        {/* AIDA Sections */}
        <div className="aida-sections px-4 md:px-24 mt-12 space-y-12">
          {/* Attention */}
          <section className="attention text-center">
            <h2 className="text-4xl font-bold text-green-500 mb-4">Perubahan Iklim Adalah Tantangan Kita Bersama</h2>
            <p className="text-lg text-gray-500">
              Saat ini, perubahan iklim berdampak pada setiap aspek kehidupan kita, mulai dari cuaca ekstrem hingga kenaikan permukaan laut. Bersama, kita bisa menghadapi tantangan ini dengan aksi nyata yang berarti.
            </p>
          </section>

          {/* Desire */}
          <section className="desire text-center md:text-left grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="desire-text">
              <h2 className="text-3xl font-bold text-green-500 mb-4">Dapatkan Tantangan Harian untuk Menjaga Lingkungan</h2>
              <p className="text-lg text-gray-500">
                Dengan menyelesaikan tantangan harian di PeduliKlim, Anda dapat mengumpulkan poin dan berkontribusi dalam menjaga bumi. Tantangan yang kami berikan bukan hanya untuk Anda, tapi juga untuk generasi masa depan.
              </p>
            </div>
            <div className="desire-illustration">
              <img src="src/assets/Forest-rafiki.png" alt="Desire Illustration" className="w-full" />
            </div>
          </section>

          {/* Interest */}
          <section className="interest text-center md:text-left grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="interest-illustration">
              <img src="src/assets/TeksInfo.png" alt="Interest Illustration" className="w-full" />
            </div>
            <div className="interest-text">
              <h2 className="text-3xl font-bold text-green-500 mb-4">Pelajari Cara Mengurangi Jejak Karbon Anda</h2>
              <p className="text-lg text-gray-500">
                Kami menyediakan berbagai konten edukasi yang mudah dipahami, mulai dari tips sehari-hari hingga langkah-langkah strategis yang dapat Anda ambil untuk mengurangi dampak lingkungan. Mari kita belajar bersama dan menjadi bagian dari perubahan!
              </p>
            </div>
          </section>

          {/* Action */}
          <section className="action text-center mt-12">
            <h2 className="text-4xl font-bold text-green-500 mb-4">Mulai Perjalanan Anda Sekarang</h2>
            <p className="text-lg text-gray-500 mb-6">
              Jangan hanya diam, saatnya kita bergerak bersama untuk mengurangi dampak perubahan iklim. Bergabunglah dengan kami dan jadilah bagian dari komunitas yang peduli pada bumi.
            </p>
            <Link to="/register" className="px-8 py-3 text-white bg-green-500 rounded-full hover:bg-green-600 transition text-lg">
              Daftar Sekarang
            </Link>
          </section>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default LandingPage;
