// world-home.js - fungsi khusus untuk halaman world lore
(function() {
    'use strict';

    // Data fakta cepat (bisa diperluas)
    const quickFacts = [
        "<strong>Nama Universe:</strong> Pancaloka",
        "<strong>Planet:</strong> Alkiaft (pinggiran, anomali)",
        "<strong>Dewa Sulung:</strong> Lyskal (Kebahagiaan)",
        "<strong>Tahun penyegelan:</strong> 2 juta tahun lalu",
        "<strong>Dungeon:</strong> 100 lantai, awalnya altar",
        "<strong>Kerajaan tertua:</strong> Lachenwald",
        "<strong>Musuh utama:</strong> Kekaisaran Timur, Tangan Gelap"
    ];

    // Daftar kutipan
    const quotes = [
        "\"Kebahagiaan yang tersegel bukan berarti lenyap. Ia hanya menunggu untuk dipeluk.\"",
        "\"Lyskal, singa bersurai emas, kini hanya anak macan pucat. Namun jejak keagungannya masih terasa.\"",
        "\"Energi yang bocor dari luka dewa membentuk dungeon. 17 pengikut memakannya agar dunia selamat.\"",
        "\"Kerajaan Lachenwald bangkit kembali setiap kali terpuruk – mungkin karena perlindungan Lyskal.\"",
        "\"Tristeza, sang Kesedihan, adalah spesialis segel. Rantainya diperkuat oleh 15 saudara.\"",
        "\"Power system sudah ada sebelum dewa. Dari manakah asalnya? Rahasia Pancaloka.\"",
        "\"Ayana, Saintess Kebahagiaan, memiliki harmonisasi tertinggi — bahkan melebihi pengikut peringkat 1.\""
    ];

    // Memuat fakta cepat ke dalam elemen #facts-list
    const factsList = document.getElementById('facts-list');
    if (factsList) {
        quickFacts.forEach(fact => {
            const li = document.createElement('li');
            li.innerHTML = fact;
            factsList.appendChild(li);
        });
    } else {
        console.warn('Element #facts-list not found. Pastikan ul memiliki id="facts-list" di sidebar.');
    }

    // Memuat kutipan acak ke dalam elemen #quote-box
    const quoteBox = document.getElementById('quote-box');
    if (quoteBox) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteBox.innerHTML = quotes[randomIndex];
    }

    // Tooltip sederhana untuk link kategori
    const categoryLinks = document.querySelectorAll('.card-links a');
    categoryLinks.forEach(link => {
        link.setAttribute('title', 'Klik untuk membuka halaman');
    });

    // Smooth scroll untuk anchor
    const quickLinks = document.querySelectorAll('.quick-link');
    quickLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const hash = this.getAttribute('href');
            if (hash && hash.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(hash);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // AUTOPLAY MUSIK (ditambahkan)
    const audio = document.getElementById('bg-music');
    if (audio) {
        let started = false;
        function startMusic() {
            if (started) return;
            audio.play().then(() => {
                started = true;
                window.removeEventListener('click', startMusic);
                window.removeEventListener('touchstart', startMusic);
                window.removeEventListener('scroll', startMusic);
            }).catch(e => console.warn('Autoplay masih diblokir:', e));
        }
        // Coba play langsung (mungkin gagal)
        audio.play().catch(() => {
            window.addEventListener('click', startMusic);
            window.addEventListener('touchstart', startMusic);
            window.addEventListener('scroll', startMusic, { once: true });
        });
    } else {
        console.warn('Elemen audio dengan id "bg-music" tidak ditemukan.');
    }

    console.log('world-home.js loaded: fakta, kutipan, autoplay, dan interaksi siap.');
})();