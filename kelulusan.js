// Database Statis Siswa SMAN 9 Cirebon
const dataKelulusan = [
    { nisn: "1234567890", nama: "Budi Santoso", kelas: "XII MIPA 1", status: "LULUS" },
    { nisn: "0987654321", nama: "Siti Aminah", kelas: "XII MIPA 3", status: "LULUS" },
    { nisn: "098765", nama: "Siti kunsnah", kelas: "XII MIPA 3", status: "LULUS" },
    { nisn: "1122334455", nama: "Andi Wijaya", kelas: "XII IPS 2", status: "TIDAK LULUS" }
];

function cekKelulusan() {
    const inputNISN = document.getElementById("inputNISN").value.trim();
    const inputNama = document.getElementById("inputNama").value.trim().toLowerCase();
    const hasilDiv = document.getElementById("hasilPencarian");
    const searchBox = document.getElementById("searchBox");
    const btnCari = document.getElementById("btnCari");
    
    // Validasi Form Kosong
    if (!inputNISN || !inputNama) {
        hasilDiv.innerHTML = `
            <div class="status-box error reveal fade-up active">
                <h3><i class="fas fa-exclamation-triangle"></i> Data Incomplete</h3>
                <p>Wajib memasukkan NISN dan Nama Lengkap secara bersamaan untuk verifikasi data.</p>
            </div>`;
        return;
    }

    // Micro-interaction: Mengubah State Tombol Menjadi Loading
    const originalBtnText = btnCari.innerHTML;
    btnCari.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> <span>Verifying Secure Data...</span>`;
    btnCari.style.opacity = "0.8";
    btnCari.style.cursor = "not-allowed";

    // Simulasi Enkripsi & Pembacaan Data Server (Jeda 1.5 Detik)
    setTimeout(() => {
        // Mengembalikan State Tombol Utama
        btnCari.innerHTML = originalBtnText;
        btnCari.style.opacity = "1";
        btnCari.style.cursor = "pointer";

        // Filter Ganda Kontrol Keamanan (NISN Sama Persis && Nama Mengandung Unsur String Input)
        const siswa = dataKelulusan.find(s => 
            s.nisn === inputNISN && s.nama.toLowerCase().includes(inputNama)
        );
        
        if (siswa) {
            searchBox.style.display = "none"; // Menyembunyikan panel pencarian utama
            
            // Hash Generator ID Validasi Sertifikat Digital
            const validationID = `SMAN9-${new Date().getFullYear()}-${siswa.nisn.substring(0,4)}-${Math.floor(1000 + Math.random() * 9000)}`;

            if (siswa.status === "LULUS") {
                hasilDiv.innerHTML = `
                    <div class="skl-card reveal fade-up active">
                        <div class="skl-watermark">PASSED</div>
                        <div class="skl-header">
                            <img src="gmbr/logo.png" alt="Logo SMAN 9" onerror="this.src='https://via.placeholder.com/60'">
                            <div class="skl-kop">
                                <h4>PEMERINTAH DAERAH PROVINSI JAWA BARAT</h4>
                                <h3>SMA NEGERI 9 KOTA CIREBON</h3>
                                <p>Jl. Ciremai Raya No.63 Larangan, Kota Cirebon 45141</p>
                            </div>
                        </div>
                        <hr class="skl-divider">
                        <div class="skl-body">
                            <h4 class="skl-title">SURAT KETERANGAN LULUS<br><span>(CERTIFICATE OF GRADUATION)</span></h4>
                            <p class="skl-intro">Kepala SMA Negeri 9 Cirebon menerangkan bahwa siswa di bawah ini: <em>(The Principal of SMA Negeri 9 Cirebon certifies that the student below:)</em></p>
                            <table class="skl-table">
                                <tr><td>Nama Lengkap <em>(Full Name)</em></td><td>:</td><td><strong>${siswa.nama.toUpperCase()}</strong></td></tr>
                                <tr><td>NISN <em>(National Student ID)</em></td><td>:</td><td><strong>${siswa.nisn}</strong></td></tr>
                                <tr><td>Kelas / Peminatan <em>(Class/Major)</em></td><td>:</td><td><strong>${siswa.kelas}</strong></td></tr>
                            </table>
                            <div class="status-conclusion">
                                <p>Telah menyelesaikan seluruh program pembelajaran dan dinyatakan:</p>
                                <p class="en-italic">(Has completed all educational programs and is declared:)</p>
                            </div>
                            <div class="badge-lulus">
                                <i class="fas fa-check-circle"></i> LULUS <span>(PASSED)</span>
                            </div>
                            
                            <div class="skl-validation">
                                <div class="qr-mockup"><i class="fas fa-qrcode"></i></div>
                                <div class="validation-text">
                                    <p><strong>Validation ID:</strong> ${validationID}</p>
                                    <p>Dokumen ini sah dikeluarkan secara digital dan diverifikasi secara otomatis oleh sistem basis data SMA Negeri 9 Cirebon.</p>
                                </div>
                            </div>
                        </div>
                        <div class="skl-footer">
                            <button onclick="window.print()" class="btn-action cetak ripple"><i class="fas fa-print"></i> Cetak / Save PDF</button>
                            <button onclick="resetForm()" class="btn-action kembali ripple"><i class="fas fa-redo"></i> Cek Data Lain</button>
                        </div>
                    </div>`;
            } else {
                hasilDiv.innerHTML = `
                    <div class="skl-card reveal fade-up active" style="border-top: 6px solid #ef4444;">
                        <div class="skl-body" style="text-align: center; padding: 40px 20px;">
                            <div class="icon-fail"><i class="fas fa-times-circle"></i></div>
                            <h3 style="color: #ef4444; font-size: 1.8rem; margin-bottom: 5px;">TIDAK LULUS</h3>
                            <p class="en-italic" style="margin-bottom: 20px;">(NOT PASSED)</p>
                            <p><strong>${siswa.nama.toUpperCase()}</strong> (NISN: ${siswa.nisn})</p>
                            <p style="color: var(--gray); margin-top: 15px; max-width: 80%; margin-inline: auto;">Keputusan dari panitia ujian sekolah bersifat mutlak. Tetap berjuang, belajar, dan jangan pernah menyerah demi masa depanmu.</p>
                            <button onclick="resetForm()" class="btn-action kembali ripple" style="margin-top: 30px; margin-inline: auto;"><i class="fas fa-undo"></i> Kembali ke Form</button>
                        </div>
                    </div>`;
            }
        } else {
            hasilDiv.innerHTML = `
                <div class="status-box error reveal fade-up active">
                    <h3><i class="fas fa-search-minus"></i> Data Not Found</h3>
                    <p>Kombinasi antara nomor NISN dan Nama Lengkap tidak terdaftar di sistem. Periksa kembali keaslian karakter teks yang dimasukkan.</p>
                </div>`;
        }
    }, 1500);
}

function resetForm() {
    document.getElementById("inputNISN").value = "";
    document.getElementById("inputNama").value = "";
    document.getElementById("searchBox").style.display = "block";
    document.getElementById("hasilPencarian").innerHTML = "";
}