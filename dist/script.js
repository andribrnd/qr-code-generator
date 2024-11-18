document.addEventListener("DOMContentLoaded", () => {
  const linkInput = document.getElementById("linkInput");
  const generateButton = document.getElementById("generateButton");
  const qrCodeContainer = document.getElementById("qrcode");
  const downloadButton = document.getElementById("downloadButton");

  let qrCanvas = null; // Untuk menyimpan QR Code yang dihasilkan

  // Fungsi untuk membuat QR Code
  const generateQRCode = async () => {
    const link = linkInput.value.trim();
    qrCodeContainer.innerHTML = ""; // Hapus QR Code sebelumnya

    if (!link) {
      alert("Masukkan tautan yang valid!");
      return;
    }

    try {
      // Generate QR Code
      const canvas = document.createElement("canvas");
      await QRCode.toCanvas(canvas, link, { width: 200 });
      qrCanvas = canvas;
      qrCodeContainer.appendChild(canvas); // Tambahkan QR Code ke halaman
      downloadButton.classList.remove("hidden"); // Tampilkan tombol download
    } catch (error) {
      console.error("Kesalahan saat membuat QR Code:", error);
      alert("Gagal membuat QR Code. Pastikan tautan valid.");
    }
  };

  // Event listener untuk tombol Generate
  generateButton.addEventListener("click", generateQRCode);

  // Event listener untuk tombol Download
  downloadButton.addEventListener("click", () => {
    if (!qrCanvas) return;

    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrCanvas.toDataURL("image/png");
    link.click();
  });
});
