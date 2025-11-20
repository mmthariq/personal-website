# 📸 Panduan Upload Gambar Project

## 📁 Struktur Folder
```
assets/img/projects/
├── dompetiq.jpg
├── kpi-system.jpg
└── company-profile.jpg
```

## 🎯 **Cara Upload Gambar:**

### **Step 1: Siapkan Gambar**
- **Format**: JPG, PNG, atau WEBP
- **Ukuran**: Minimal 600x400px (ratio 3:2)
- **File size**: Maksimal 2MB untuk performa optimal
- **Nama file**: Gunakan nama yang mudah diingat (lowercase, tanpa spasi)

### **Step 2: Upload ke Folder**
1. Buka folder `assets/img/projects/`
2. Copy gambar Anda ke folder tersebut
3. Rename sesuai nama yang ada di HTML:
   - `dompetiq.jpg`
   - `kpi-system.jpg` 
   - `company-profile.jpg`

### **Step 3: (Opsional) Ganti Nama File**
Jika ingin menggunakan nama file berbeda, edit di `index.html`:

```html
<!-- Contoh: Mengganti dompetiq.jpg menjadi project1.png -->
<img src="assets/img/projects/project1.png" alt="DompetIQ Project">
```

## ✨ **Fitur Smart Fallback:**

Jika gambar tidak ditemukan, otomatis akan menampilkan:
- ✅ **Icon gradient** sebagai backup
- ✅ **No broken image** - tampilan tetap bagus
- ✅ **Smooth transition** saat gambar berhasil load

## 📐 **Rekomendasi Gambar:**

### **Untuk Screenshot Website:**
- Crop bagian yang menarik (header + content)
- Hindari screenshot full page yang terlalu panjang
- Focus pada UI yang paling representatif

### **Untuk Mockup/Design:**
- Gunakan mockup device (laptop/phone)
- Background bersih atau transparent
- Highlight fitur utama aplikasi

### **Tips Editing:**
- **Brightness/Contrast**: Pastikan gambar tidak terlalu gelap
- **Saturation**: Sedikit enhance warna agar lebih menarik
- **Compression**: Compress untuk web agar loading cepat

## 🔄 **Update Gambar:**
1. Replace file dengan nama yang sama
2. Refresh browser (Ctrl+F5)
3. Gambar otomatis terupdate!