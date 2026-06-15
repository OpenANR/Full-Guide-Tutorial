# PERINTAH TAR DAN FUNGSINYA
_by : Ahmad Nuzulur Rozaq + Gemini AI_

Perintah `tar` (singkatan dari _Tape Archive_) adalah salah satu utilitas paling penting dan sering digunakan di Linux. Fungsinya adalah untuk menggabungkan banyak file atau direktori menjadi satu file arsip (sering disebut tarball), serta untuk mengompres atau mengekstraknya.

## PENJELASAN DAN PENGGUNAAN FLAG
Di bawah ini merupakan penjelasan singkat untuk setiap fungsi flag di `tar`.
- `-c` = (Create) Membuat file arsip baru.
- `-x` = (Extract) Mengekstrak file dari arsip.
- `-v` = (Verbose) Menampilkan daftar file yang sedang di proses di balik layar (Sangat berguna jika untuk melihat proses).
- `-f` = (File) Menentukan nama file arsip. **Catatan :** Opsi ini harus selalu berada di paling terakhir dari deretan opsi lain sebelum menyebutkan nama file (Misalnya : `-cvf` ✅ bukan `-cfv` ❌)
- `-z` = (Gzip) Menggunakan algoritma kompresi **gzip** (menghasilkan `.tar.gz` atau `.tgz`). Prosesnya cepat namun rasio kompresinya standar.
- `-j` - (Bzip2) Menggunakan algoritma kompresi **bzip2** (menghasilkan file `.tar.bz2`). Ukuran file lebih kecil dari **gzip**, tetapi prosesnya sedikit lebih lama.
- `-J` = (Xz) Menggunakan algoritma kompresi **xz** (Menghasilkan file `.tar.xz`). Rasio kompresinya sangat tinggi (ukuran file paling kecil), tetapi butuh waktu proses lebih lama.
- `-t` = (List) Melihat isi (daftar file) di dalam arsip tanpa harus mengekstraknya.
- `-C` = (Directory) Berpindah ke direktori tertentu sebelum melakukan ekstrasi (digunakan untuk menentukan lokasi tujuan hasil ekstrak).

## PERINTAH KOMPRESI FILE
Di bawah ini merupakan opsi-opsi untuk membuat kompresi file menggukan `tar`.

### 1. MEMBUAT FILE ARSIP BIASA (TANPA KOMPRESI)
```bash
# Perintah untuk kompres file biasa.
tar -cvf nama_file.tar /path/ke/folder_atau_file
```
_Penjelasan :_ `tar` (Memanggil program kompresi file), `-c` (Membuat), `v` (Menampilkan Progres), `f` (Membuat nama file), `nama_file.tar` (Nama file bebas sesuai keinginan), `/path/ke/folder_atau_file` (Arahkan ke folder atau file).

### 2. MEMBUAT ARSIP DENGAN KOMPRESI GZIP (PALING UMUM)
```bash
# Perintah untuk kompres file gzip
tar -cvf nama_file.tar /path/ke/folder_atau_file
```
_Penjelasan :_ Tambahan opsi `-z` memerintahkan `tar` untuk mengompres file menggunakan gzip.

### 3. MEMBUAT ARSIP DENGAN KOMPRESI BZIP2
```bash
# Perintah untuk kompres file bzip2
tar -cjvf nama_file.tar.bz2 /path/ke/folder_atau_file
```
_Penjelasan :_ Tambahan opsi `-j` memerintahkan `tar` untuk mengompres file menggunakan bzip2.

### 4. MEMBUAT ARSIP DENGAN KOMPRESI XZ
```bash
# Perintah untuk kompres file xz
tar -cJvf nama_file.tar.xz /path/ke/folder_atau_file

```
_Penjelasan :_ Tambahan opsi `-J` memerintahkan `tar` untuk mengompres file menggunakan xz.

## PERINTAH EKSTRAK FILE
Berikut opsi untuk mengekstrak file `tar`.

### 1. MENGESTRAK FILE DI LOKASI SAAT INI
```bash
# Ekstrak file tar berekstensi .tar
tar -xvf nama_file.tar

# Ekstrak file tar berekstensi .tar.gz
tar -xvf nama_file.tar.gz

# Ekstrak file tar berekstensi .tar.bz2
tar -xvf nama_file.tar.bz2

# Ekstrak file tar berekstensi .tar.xz
tar -xvf nama_file.tar.xz
```
_Penjelasan :_ `tar` (Memanggil program kompresi file), Opsi `-x` (Untuk ekstrak file), `v` (Menampilkan progres), `f` (Nama file tar).

### 2. MENGEKSTRAK FILE DI LOKASI TERTENTU/SPESIFIK
```bash
# Ekstrak file tar berekstensi .tar
tar -xvf nama_file.tar -C /path/ke/folder_tujuan

# Ekstrak file tar berekstensi .tar.gz
tar -xvf nama_file.tar.gz -C /path/ke/folder_tujuan

# Ekstrak file tar berekstensi .tar.bz2
tar -xvf nama_file.tar.bz2 -C /path/ke/folder_tujuan

# Ekstrak file tar berekstensi .tar.xz
tar -xvf nama_file.tar.xz -C /path/ke/folder_tujuan
```
_Penjelasan :_ Tambahan opsi `-C` mengarahkan output ke folder ekstrasi tujuan. Pastikan folder tujuan sudah ada sebelum menjalankan perintah ini.

### 3. MENGEKSTRAK SATU FILE DI DALAM ARSIP
Gunakan perintah di bawah ini jika tidak ingin mengekstrak isi file arsip semuanya.
```bash
# Ekstrak file tar berekstensi .tar
tar -xvf nama_file.tar "/path/ke/file_di_dalam_arsip.txt"

# Ekstrak file tar berekstensi .tar.gz
tar -xvf nama_file.tar.gz "/path/ke/file_di_dalam_arsip.txt"

# Ekstrak file tar berekstensi .tar.bz2
tar -xvf nama_file.tar.bz2 "/path/ke/file_di_dalam_arsip.txt"

# Ekstrak file tar berekstensi .tar.xz
tar -xvf nama_file.tar.xz "/path/ke/file_di_dalam_arsip.txt"
```

## UTILITAS TAMBAHAN
Berikut perintah jika anda ingin melihat isi file `tar` tanpa harus ekstrak.

### 1. PERINTAH UNTUK MELIHAT ISI FILE ARSIP
```bash
# Melihat file tar berekstensi .tar
tar -tvf nama_file.tar

# Melihat file tar berekstensi .tar.gz
tar -tvf nama_file.tar.gz

# Melihat file tar berekstensi .tar.bz2
tar -tvf nama_file.tar.bz2

# Melihat file tar berekstensi .tar.xz
tar -tvf nama_file.tar.xz
```
_Penjelasan :_ `tar` (Memanggil program kompresi file), Opsi `-t` (Untuk melihat isi file), `v` (Menampilkan progres), `f` (Nama file tar).