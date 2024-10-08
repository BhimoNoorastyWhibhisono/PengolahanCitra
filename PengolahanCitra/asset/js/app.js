// Ambil referensi elemen DOM
const imageLoader = document.getElementById('imageLoader');
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
let originalImage = new Image();
let processedImage = new Image(); // Menyimpan gambar yang telah diproses
let isFlipped = false; // Status flip

// Event listener untuk memuat gambar yang dipilih dari file input
imageLoader.addEventListener('change', function (e) {
    const reader = new FileReader();
    reader.onload = function (event) {
        originalImage.onload = function () {
            // Set ukuran canvas sesuai dengan ukuran gambar
            canvas.width = originalImage.width;
            canvas.height = originalImage.height;
            ctx.drawImage(originalImage, 0, 0); // Gambar asli
            processedImage.src = originalImage.src; // Simpan gambar asli untuk di-flip
            isFlipped = false; // Reset status flip
        };
        originalImage.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

// Fungsi untuk menerapkan operasi pengolahan gambar
function applyOperation(operation) {
    if (!originalImage.src) return; // Pastikan gambar telah dimuat

    if (operation === 'grayscale') {
        applyGrayscale();
    } else if (operation === 'rotate') {
        rotateImage();
    } else if (operation === 'threshold') {
        applyThreshold();
    } else if (operation === 'brightness') {
        applyBrightness();
    } else if (operation === 'flip') {
        flipImage();
    }
}

// Fungsi untuk mengubah gambar menjadi grayscale
function applyGrayscale() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = data[i + 1] = data[i + 2] = avg; // Set warna merah, hijau, biru ke rata-rata
    }

    ctx.putImageData(imageData, 0, 0);
    processedImage.src = canvas.toDataURL(); // Simpan hasil proses
}

// Fungsi untuk threshold
function applyThreshold() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const thresholdValue = 128;

    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const value = avg > thresholdValue ? 255 : 0;
        data[i] = data[i + 1] = data[i + 2] = value;
    }

    ctx.putImageData(imageData, 0, 0);
    processedImage.src = canvas.toDataURL(); // Simpan hasil proses
}

// Fungsi untuk menyesuaikan kecerahan
function applyBrightness() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const brightnessFactor = 50; // Sesuaikan nilai ini

    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] + brightnessFactor); // Red
        data[i + 1] = Math.min(255, data[i + 1] + brightnessFactor); // Green
        data[i + 2] = Math.min(255, data[i + 2] + brightnessFactor); // Blue
    }

    ctx.putImageData(imageData, 0, 0);
    processedImage.src = canvas.toDataURL(); // Simpan hasil proses
}

// Fungsi untuk merotasi gambar 90 derajat
function rotateImage() {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.height;
    tempCanvas.height = canvas.width;
    tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
    tempCtx.rotate((90 * Math.PI) / 180);
    tempCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
    canvas.width = tempCanvas.width;
    canvas.height = tempCanvas.height;
    ctx.drawImage(tempCanvas, 0, 0);
    processedImage.src = canvas.toDataURL(); // Simpan hasil proses
}

// Fungsi untuk membalik gambar secara horizontal
function flipImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Hapus canvas sebelum menggambar
    ctx.save(); // Simpan keadaan konteks

    // Jika gambar sudah di-flip, kembali ke gambar yang telah diproses
    if (isFlipped) {
        const img = new Image();
        img.src = processedImage.src; // Ambil gambar yang telah diproses
        img.onload = function () {
            ctx.drawImage(img, 0, 0); // Gambar kembali hasil proses
        };
    } else {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(processedImage, 0, 0); // Gambar ulang gambar yang di-flip
    }

    ctx.restore(); // Kembalikan keadaan konteks ke semula
    isFlipped = !isFlipped; // Toggle status flip
}

// Fungsi untuk mereset gambar ke kondisi asli
function resetImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Hapus semua di canvas
    ctx.drawImage(originalImage, 0, 0); // Gambar ulang gambar asli
    processedImage.src = originalImage.src; // Reset gambar yang telah diproses
    isFlipped = false; // Reset status flip
}

// Fungsi untuk menyimpan gambar yang telah diproses
document.getElementById('saveImage').addEventListener('click', function () {
    const link = document.createElement('a');
    link.download = 'processed_image.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Event listener untuk tombol reset
document.getElementById('resetImage').addEventListener('click', resetImage);
