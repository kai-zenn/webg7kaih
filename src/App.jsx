import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Heart,
  Activity,
  Apple,
  BookOpen,
  Users,
  Moon,
  Check,
  Calendar,
  TrendingUp,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trackerData, setTrackerData] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const habits = [
    {
      id: 1,
      icon: Sun,
      title: "Bangun Pagi",
      description: "Melatih kedisiplinan dan mengelola waktu dengan baik",
      color: "from-amber-500 to-orange-500",
      benefits: [
        "Meningkatkan kedisiplinan",
        "Meningkatkan kemampuan mengelola waktu",
        "Meningkatkan keseimbangan jiwa dan raga",
        "Mendukung kesuksesan",
      ],
    },
    {
      id: 2,
      icon: Heart,
      title: "Beribadah",
      description:
        "Mendekatkan diri dengan Tuhan dan memperkuat nilai spiritual",
      color: "from-purple-500 to-pink-500",
      benefits: [
        "Mendekatkan hubungan dengan Tuhan",
        "Meningkatkan nilai etika dan moral",
        "Meningkatkan pemahaman tujuan hidup",
        "Meningkatkan solidaritas",
      ],
    },
    {
      id: 3,
      icon: Activity,
      title: "Berolahraga",
      description: "Menjaga kesehatan fisik dan mental",
      color: "from-green-500 to-emerald-500",
      benefits: [
        "Menjaga kesehatan fisik dan mental",
        "Menjaga kebugaran tubuh",
        "Meningkatkan potensi diri",
        "Meningkatkan nilai sportivitas",
      ],
    },
    {
      id: 4,
      icon: Apple,
      title: "Makan Sehat dan Bergizi",
      description: "Memenuhi kebutuhan nutrisi seimbang untuk tubuh",
      color: "from-red-500 to-rose-500",
      benefits: [
        "Investasi jangka panjang untuk kesehatan",
        "Memaksimalkan potensi tubuh dan pikiran",
        "Meningkatkan kemandirian",
      ],
    },
    {
      id: 5,
      icon: BookOpen,
      title: "Gemar Belajar",
      description: "Menumbuhkan kreativitas dan mengembangkan diri",
      color: "from-blue-500 to-cyan-500",
      benefits: [
        "Pengembangan diri",
        "Menumbuhkan kreativitas dan imajinasi",
        "Menemukan kebenaran dan pengetahuan",
        "Membentuk empati",
      ],
    },
    {
      id: 6,
      icon: Users,
      title: "Bermasyarakat",
      description: "Terlibat dalam kegiatan sosial dan membangun toleransi",
      color: "from-indigo-500 to-purple-500",
      benefits: [
        "Menumbuhkan nilai gotong royong",
        "Menumbuhkan toleransi",
        "Meningkatkan kesetaraan",
        "Meningkatkan tanggung jawab terhadap lingkungan",
      ],
    },
    {
      id: 7,
      icon: Moon,
      title: "Tidur Cepat",
      description: "Istirahat cukup untuk memulihkan tubuh dan pikiran",
      color: "from-slate-600 to-slate-800",
      benefits: [
        "Organ tubuh pulih dan berfungsi optimal",
        "Memulihkan mental dan emosional",
        "Menjaga keseimbangan aktivitas",
        "Meningkatkan produktivitas",
      ],
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("habitTracker");
    if (saved) {
      setTrackerData(JSON.parse(saved));
    }
  }, []);

  const toggleHabit = (date, habitId) => {
    const key = `${date}-${habitId}`;
    const newData = { ...trackerData };
    newData[key] = !newData[key];
    setTrackerData(newData);
    localStorage.setItem("habitTracker", JSON.stringify(newData));
  };

  const getCompletionPercentage = (date) => {
    const completed = habits.filter(
      (h) => trackerData[`${date}-${h.id}`]
    ).length;
    return Math.round((completed / habits.length) * 100);
  };

  const NavBar = () => (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-28 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G7KAIH</span>
            </div>
            <span className="font-bold text-gray-900 hidden sm:block">
              Indonesia Hebat
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => setCurrentPage("home")}
              className={`text-sm font-medium transition-colors ${
                currentPage === "home"
                  ? "text-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => setCurrentPage("habits")}
              className={`text-sm font-medium transition-colors ${
                currentPage === "habits"
                  ? "text-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              7 Kebiasaan
            </button>
            <button
              onClick={() => setCurrentPage("tracker")}
              className={`text-sm font-medium transition-colors ${
                currentPage === "tracker"
                  ? "text-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Tracker Kebiasaan
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => {
                  setCurrentPage("home");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Beranda
              </button>
              <button
                onClick={() => {
                  setCurrentPage("habits");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                7 Kebiasaan
              </button>
              <button
                onClick={() => {
                  setCurrentPage("tracker");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                Tracker Saya
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );

  const HomePage = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50 -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-6"
          >
            Kementerian Pendidikan Dasar dan Menengah RI
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            7 Kebiasaan Anak
            <br />
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Indonesia Hebat
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Gerakan nasional untuk membentuk generasi yang sehat, cerdas, dan
            berkarakter menuju Indonesia Emas 2045
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage("habits")}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            >
              Pelajari 7 Kebiasaan
              <ChevronRight size={20} />
            </button>
            <button
              onClick={() => setCurrentPage("tracker")}
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-medium border-2 border-gray-200 hover:border-gray-300 transition-colors"
            >
              Mulai Tracker
            </button>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50"
            >
              <div className="text-4xl font-bold text-red-600 mb-2">7</div>
              <div className="text-gray-600 font-medium">Kebiasaan Positif</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50"
            >
              <div className="text-4xl font-bold text-orange-600 mb-2">
                2045
              </div>
              <div className="text-gray-600 font-medium">
                Target Indonesia Emas
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50"
            >
              <div className="text-4xl font-bold text-amber-600 mb-2">8</div>
              <div className="text-gray-600 font-medium">
                Karakter Utama Bangsa
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tentang Gerakan Ini
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Gerakan 7 Kebiasaan Anak Indonesia Hebat diluncurkan oleh
                Kementerian Pendidikan Dasar dan Menengah pada 27 Desember 2024.
                Program ini merupakan inisiatif strategis yang menjadi bagian
                dari Asta Cita ke-4 dalam visi pemerintahan untuk membentuk
                generasi anak Indonesia yang sehat, cerdas, dan berkarakter
                unggul.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Tujuan Gerakan
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={16} className="text-red-600" />
                  </div>
                  <span>
                    Membentuk generasi yang tidak hanya unggul secara akademis,
                    tetapi juga memiliki kepribadian yang kuat
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={16} className="text-red-600" />
                  </div>
                  <span>
                    Menanamkan delapan karakter utama: religius, bermoral,
                    sehat, cerdas, kreatif, kerja keras, disiplin, mandiri, dan
                    bermanfaat
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={16} className="text-red-600" />
                  </div>
                  <span>
                    Menghidupkan kembali nilai-nilai tradisional Indonesia yang
                    positif
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={16} className="text-red-600" />
                  </div>
                  <span>
                    Mengurangi ketergantungan pada gawai dan meningkatkan
                    interaksi sosial
                  </span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-red-500 pl-6 py-2">
              <p className="text-gray-700 italic">
                "Dengan menanamkan tujuh kebiasaan ini, kami berharap dapat
                membentuk anak-anak Indonesia menjadi pribadi yang cerdas secara
                intelektual, sosial, dan spiritual."
              </p>
              <p className="text-sm text-gray-500 mt-2">
                — Abdul Mu'ti, Menteri Pendidikan Dasar dan Menengah RI
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Ketujuh Kebiasaan</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Kebiasaan sederhana yang jika dilakukan secara konsisten dapat
              membawa perubahan besar
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {habits.slice(0, 7).map((habit, index) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${habit.color} flex items-center justify-center mb-4`}
                >
                  <habit.icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold mb-2">{habit.title}</h3>
                <p className="text-sm text-gray-300">{habit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const HabitsPage = () => (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            7 Kebiasaan Anak Indonesia Hebat
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pelajari setiap kebiasaan dan manfaatnya untuk perkembangan karakter
            anak
          </p>
        </motion.div>

        <div className="space-y-8">
          {habits.map((habit, index) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${habit.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <habit.icon size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-bold text-gray-400">
                        #{habit.id}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {habit.title}
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-6">{habit.description}</p>

                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                        Manfaat
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {habit.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check size={12} className="text-gray-600" />
                            </div>
                            <span className="text-sm text-gray-700">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Kolaborasi Lintas Sektor
          </h3>
          <p className="text-gray-600 mb-4">
            Kesuksesan gerakan ini tidak lepas dari kolaborasi berbagai
            kementerian, lembaga, pemerintah daerah, dan organisasi masyarakat.
            Dukungan dari bidang pendidikan, kesehatan, sosial, dan perlindungan
            anak menjadi kunci keberhasilannya.
          </p>
          <p className="text-gray-600">
            Sinergi antara keluarga, sekolah, masyarakat, dan media adalah
            elemen penting dalam memastikan keberhasilan gerakan menuju
            Indonesia Emas 2045.
          </p>
        </motion.div>
      </div>
    </div>
  );

  const TrackerPage = () => {
    const today = new Date().toISOString().split("T")[0];
    const todayCompletion = getCompletionPercentage(selectedDate);

    return (
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Tracker Kebiasaan Harian
            </h1>
            <p className="text-gray-600">
              Catat kebiasaan baik yang sudah kamu lakukan hari ini
            </p>
          </motion.div>

          {/* Date Picker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <Calendar className="text-gray-400" size={24} />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Tanggal
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={today}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Progress Hari Ini
                </span>
                <span className="text-sm font-bold text-red-600">
                  {todayCompletion}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${todayCompletion}%` }}
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Habits Checklist */}
          <div className="space-y-4">
            {habits.map((habit, index) => {
              const isChecked = trackerData[`${selectedDate}-${habit.id}`];

              return (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => toggleHabit(selectedDate, habit.id)}
                  className={`bg-white rounded-xl p-6 cursor-pointer transition-all border-2 ${
                    isChecked
                      ? "border-green-500 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                        isChecked
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {isChecked && <Check size={16} className="text-white" />}
                    </div>

                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${habit.color} flex items-center justify-center`}
                    >
                      <habit.icon size={24} className="text-white" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{habit.title}</h3>
                      <p className="text-sm text-gray-500">
                        {habit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Motivational Message */}
          {todayCompletion === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl text-white text-center"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-2">Luar Biasa!</h3>
              <p className="text-green-50">
                Kamu telah menyelesaikan semua kebiasaan hari ini. Terus
                pertahankan!
              </p>
            </motion.div>
          )}

          {/* Weekly Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-red-600" size={24} />
              <h3 className="text-lg font-bold text-gray-900">
                Statistik 7 Hari Terakhir
              </h3>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (6 - i));
                const dateStr = date.toISOString().split("T")[0];
                const completion = getCompletionPercentage(dateStr);
                const dayName = [
                  "Min",
                  "Sen",
                  "Sel",
                  "Rab",
                  "Kam",
                  "Jum",
                  "Sab",
                ][date.getDay()];

                return (
                  <div key={i} className="text-center">
                    <div className="text-xs text-gray-500 mb-2">{dayName}</div>
                    <div
                      className={`w-full h-20 rounded-lg flex items-center justify-center text-sm font-bold ${
                        completion === 100
                          ? "bg-green-500 text-white"
                          : completion > 0
                          ? "bg-orange-200 text-orange-800"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {completion}%
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      <AnimatePresence mode="wait">
        {currentPage === "home" && <HomePage key="home" />}
        {currentPage === "habits" && <HabitsPage key="habits" />}
        {currentPage === "tracker" && <TrackerPage key="tracker" />}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">IH</span>
                </div>
                <span className="font-bold">Indonesia Hebat</span>
              </div>
              <p className="text-gray-400 text-sm">
                Gerakan nasional untuk membentuk generasi emas Indonesia 2045
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-3">Tautan</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="https://cerdasberkarakter.kemendikdasmen.go.id/gerakan7kebiasaan/"
                    className="hover:text-white transition-colors"
                  >
                    Tentang Gerakan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Modul Pembelajaran
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/watch?v=SoldpISFaeg"
                    className="hover:text-white transition-colors"
                  >
                    Lagu 7 Kebiasaan
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3">Kontak</h4>
              <a
                className="text-sm text-gray-400"
                href="https://kemendikdasmen.go.id/"
              >
                Kementerian Pendidikan Dasar dan Menengah
                <br />
                Republik Indonesia
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Kementerian Pendidikan Dasar dan Menengah RI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
