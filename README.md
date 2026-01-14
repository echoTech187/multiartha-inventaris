# MultiArtha Inventaris

Sistem Manajemen Inventaris lengkap yang dibangun dengan arsitektur modern untuk MultiArtha. Proyek ini terdiri dari backend berbasis Node.js dan frontend berbasis Next.js.

## Struktur Proyek

- **`multiartha-backend/`**: RESTful API menggunakan Express.js dan MySQL.
- **`multiartha-frontend/`**: Aplikasi web modern menggunakan Next.js 16.1.1 dengan App Router.

## Tech Stack

### Frontend
- **Framework:** Next.js 16.1.1 (TypeScript)
- **Styling:** Tailwind CSS & Shadcn UI
- **Form:** React Hook Form & Zod Validation
- **Architecture:** Clean Architecture (Domain, Application, Infrastructure layers)
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL (mysql2/promise)
- **Database Management:** Sequelize CLI (Migrations & Seeders)

## Cara Instalasi

### 1. Persiapan Database
Pastikan MySQL sudah berjalan di sistem Anda.
- Buat database baru bernama `multiartha`.
- Sesuaikan konfigurasi database di `multiartha-backend/config/config.json` dan `multiartha-backend/config/server.js`.

### 2. Setup Backend
```bash
cd multiartha-backend
npm install
# Jalankan migrasi dan seeder untuk data awal
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
# Jalankan server
npm run dev
```

### 3. Setup Frontend
```bash
cd multiartha-frontend
npm install
# Jalankan aplikasi
npm run dev
```

## Fitur Utama

- **Manajemen Pengguna:** CRUD Pengguna, pengelolaan peran (Role), dan pengaturan akses.
- **Manajemen Produk:** CRUD Produk, pelacakan stok, dan pencatatan penjualan.
- **Autentikasi:** Sistem login aman dengan Server Actions.
- **Dashboard:** Ringkasan data inventaris dan pengguna.

## Penjelasan Singkat Fitur Selesai

Berikut adalah detail fitur dan perbaikan yang telah berhasil diimplementasikan:

1.  **Formulir Pengguna Dinamis:** Sistem formulir (Add/Edit) yang menggunakan *controlled components* untuk sinkronisasi state yang akurat dan validasi Zod yang fleksibel (password menjadi opsional saat proses edit).
2.  **Manajemen Role & Akses:** Fitur ganti jenis akses pengguna melalui dialog modal yang terintegrasi langsung dengan database backend.
3.  **CRUD Produk Robust:** Implementasi model dan kontroler produk di backend yang telah diperbaiki untuk menangani operasi database dengan lebih stabil (perbaikan error iterasi pada database result).
4.  **Arsitektur Bersih (Clean Architecture):** Pemisahan logika bisnis (Use Cases), repositori data, dan antarmuka pengguna pada frontend untuk kemudahan pemeliharaan kode di masa depan.
5.  **Penanganan Error & Toast Notification:** Integrasi notifikasi real-time menggunakan Sonner untuk memberikan umpan balik langsung kepada pengguna saat operasi berhasil atau gagal.

## Kontribusi
Proyek ini dikembangkan untuk kebutuhan internal MultiArtha Inventaris.

---

Terima kasih atas dukungan dan kontribusi Anda!
