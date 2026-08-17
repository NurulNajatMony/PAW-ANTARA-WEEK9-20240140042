# PAW ANTARA WEEK 9 - Todo App with ORM

Proyek ini adalah implementasi sistem manajemen Todo-List berbasis Web (Single Page Application) menggunakan **Node.js, Express, dan Sequelize ORM**. Proyek ini dibuat untuk memenuhi Tugas 9 Praktikum Pengembangan Aplikasi Web (PAW).

**Nama  :** Nurul Najat Mony  
**NIM   :** 20240140042  
**Kelas :** B
## ✨ Fitur Utama

- **Model Kategori Baru:** Pengembangan dari struktur dasar dengan menambahkan model `Category`. Setiap _Todo_ sekarang dapat dikelompokkan ke dalam kategori tertentu (Relasi _One-to-Many_).
- **CRUD Penuh dengan ORM:** Seluruh proses Create, Read, Update, dan Delete untuk tugas dan kategori dikelola menggunakan Sequelize ORM.
- **Autentikasi:** Sistem Login & Register sederhana berbasis _session_.
- **Desain UI/UX Premium (Glassmorphism):** Antarmuka pengguna dibangun menggunakan HTML biasa dan utilitas **Tailwind CSS**. Menggunakan konsep _Glassmorphism_ yang modern, dinamis, dan responsif.

---

## 📸 Dokumentasi & Hasil Pengujian

### A. Tampilan Antarmuka Web (UI)

**1. Halaman Login / Register**
<img width="1894" height="867" alt="image" src="https://github.com/user-attachments/assets/e7b2cf82-6c97-498f-b9c9-982721aa84d3" />

**2. Halaman Dashboard Utama**
<img width="1910" height="842" alt="image" src="https://github.com/user-attachments/assets/14bc1f7a-6401-4cc5-bd17-755ea9e2156f" />

---

### B. Pengujian API via Postman

**1. Hasil Uji Coba Login (POST `/api/auth/login`)**
<img width="1884" height="974" alt="Screenshot 2026-08-17 080925" src="https://github.com/user-attachments/assets/09e63633-b328-4eaa-b60b-6c9bbb44ad10" />
<img width="1901" height="991" alt="Screenshot 2026-08-17 081001" src="https://github.com/user-attachments/assets/6c911c83-0589-4acd-a11e-3882669a7939" />

**2. Hasil Uji Coba Lihat Semua Kategori (GET `/api/categories`)**
<img width="1920" height="971" alt="Screenshot 2026-08-17 081031" src="https://github.com/user-attachments/assets/e06c08ff-9d4f-4b07-9905-3558e02769e3" />

**3. Hasil Uji Coba Tambah Kategori Baru (POST `/api/categories`)**
<img width="1920" height="986" alt="Screenshot 2026-08-17 081103" src="https://github.com/user-attachments/assets/fd2ae727-c6f3-45ee-92c2-2f038eb71c52" />

**4. Hasil Uji Coba Lihat Semua Tugas (GET `/api/todos`)**
<img width="1920" height="988" alt="Screenshot 2026-08-17 081136" src="https://github.com/user-attachments/assets/7f435c97-1c65-4a1e-ac2a-33ce80df4bf4" />

**5. Hasil Uji Coba Tambah Tugas Baru (POST `/api/todos`)**
<img width="1920" height="998" alt="Screenshot 2026-08-17 081220" src="https://github.com/user-attachments/assets/b12e0dd0-b7c4-4944-afb0-a2c4392b2aaa" />

---

## 🛠️ Teknologi yang Digunakan

- **Backend:** Node.js, Express.js
- **Database & ORM:** PostgreSQL, Sequelize
- **Frontend:** HTML5, Vanilla JavaScript, Tailwind CSS (via CDN)

## 🚀 Cara Menjalankan (Setup)

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/UsernameAnda/PAW-ANTARA-WEEK9-20240140042.git
   cd PAW-ANTARA-WEEK9-20240140042
