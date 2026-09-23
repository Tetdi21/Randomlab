# 🔮 RandomLab

**One Website. Countless Generators.**

RandomLab adalah kumpulan utility generator berbasis browser — cepat, aman, dan 100% jalan di sisi client tanpa server. Cocok buat developer, designer, atau siapa pun yang butuh data acak instan.

## ✨ Fitur

| Generator | Deskripsi |
|---|---|
| 🔑 **Password Generator** | Bikin password kuat dengan opsi custom karakter + indikator kekuatan password |
| 🎨 **Color Generator** | Generate warna random dalam format HEX, RGB, dan HSL |
| 🎲 **Dice Roller** | Simulasi lempar 1–6 dadu sekaligus |
| 👤 **Username Generator** | Generate username unik pakai algoritma **Markov Chain** (ML) — bisa pakai nama sendiri sebagai seed |
| 🔒 **UUID Generator** | Generate UUID v4 (RFC 4122 compliant) dalam jumlah banyak |
| 📄 **Lorem Ipsum Generator** | Generate placeholder text berdasarkan paragraf, kalimat, atau kata |
| 🔳 **QR & Barcode Generator** | Generate QR code / barcode dari teks atau link, bisa download PNG |

## 🛠️ Tech Stack

- HTML5, CSS3, Vanilla JavaScript (tanpa framework)
- [Font Awesome](https://fontawesome.com/) untuk ikon
- [QRCode.js](https://github.com/davidshimjs/qrcodejs) & [JsBarcode](https://github.com/lindell/JsBarcode) untuk fitur QR/Barcode
- Google Fonts (Poppins)

## 🚀 Cara Menjalankan

1. Clone repo ini
```bash
   git clone https://github.com/USERNAME/randomlab.git
```
2. Buka `index.html` langsung di browser, atau jalankan lewat local server (misal XAMPP / Live Server) untuk fitur yang butuh `crypto.randomUUID()` secara optimal.

## 🗺️ Roadmap

- [ ] Username Generator: tambah opsi unsur (zodiak, dewa Yunani)
- [ ] Lorem Ipsum: generate teks berbasis topik
- [ ] Fitur AI (backend terpisah)

## 📄 Lisensi

MIT License — bebas dipakai dan dimodifikasi.

---

Made with ❤️ by [Tedi Aditya Rahmadi](https://github.com/Tetdi21)