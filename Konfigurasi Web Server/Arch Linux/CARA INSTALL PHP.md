# CARA INSTALL PHP DI ARCH LINUX
_By : Ahmad Nuzulur Rozaq + Gemini AI_

**PHP** adalah bahasa pemrograman sisi server yang digunakan untuk pengembangan web. Berikut adalah langkah-langkah untuk menginstall PHP di Arch Linux:

## Install Paket PHP

Berikut langkah-langkah menginstall PHP di Arch Linux:

1. Pertama, install paket PHP dengan mengetikkan perintah berikut :

```bash
sudo pacman -S php
```
_**Catatan :** Secara bawaan, versi PHP yang terinstall di Arch Linux adalah versi terbaru. Versi PHP terbaru saat ini adalah 8.5_

## Konfigurasi PHP

Setelah instalasi berhasil, sebaiknya kita melakukan konfigurasi PHP agar ngoding Laravel lancar. 

Berikut adalah langkah-langkah untuk mengkonfigurasi PHP:
1. Petama, buka file konfigurasi PHP dengan menggunakan editor nano:

```bash
sudo nano /etc/php/php.ini
```
2. Setelah file terbuka, cari baris `extension` kemudian hapus tanda `;` yang ada di depannya agar extension aktif. Berikut saran extension yang perlu diaktifkan:

- `extension=bcmath` (Penting untuk kalkulasi presisi tinggi)
- `extension=intl` (Diperlukan oleh Laravel untuk lokalisasi dan format waktu)
- `extension=pdo_mysql` (Wajib jika Anda menggunakan database MySQL / MariaDB)
- `extension=curl` (Untuk HTTP Request)
- `extension=gd` (Untuk manipulasi gambar)
- `extension=mysqli` (Driver MySQL alternatif)
- `extension=zip` (Wajib untuk Composer saat install paket baru)

3. Simpan file konfigurasi tersebut (jika menggunakan nano, tekan `Ctrl+O`, `Enter`, lalu `Ctrl+X` untuk keluar)