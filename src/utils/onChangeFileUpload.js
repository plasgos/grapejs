// import Compressor from "compressorjs";

// export const onChangeFileUpload = (id, handleContentChange) => {
//   const input = document.createElement("input");
//   input.type = "file";
//   input.accept = "image/*"; // Only accept image files
//   input.click();

//   input.onchange = (e) => {
//     const file = e.target.files[0];

//     if (!file.type.startsWith("image/")) {
//       alert("Please select an image file.");
//       return;
//     }

//     console.log(`Original file size: ${(file.size / 1024).toFixed(2)} KB`);

//     // Check file size (in bytes) - 1MB = 1,048,576 bytes
//     if (file.size > 1048576) {
//       // Compress the image
//       new Compressor(file, {
//         quality: 0.5, // Set compression quality (0 to 1)
//         success: (compressedFile) => {
//           const reader = new FileReader();

//           reader.onload = (event) => {
//             const imageUrl = event.target.result;
//             handleContentChange(id, "image", imageUrl);
//           };

//           reader.readAsDataURL(compressedFile);
//         },
//       });
//     } else {
//       // If file size is within limits, directly convert to Base64
//       const reader = new FileReader();

//       reader.onload = (event) => {
//         const imageUrl = event.target.result;
//         handleContentChange(id, "image", imageUrl);
//       };

//       reader.readAsDataURL(file);
//     }
//   };
// };

import Compressor from "compressorjs";

export const onChangeFileUpload = (id, handleContentChange) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*"; // Hanya menerima file gambar
  input.click();

  input.onchange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    console.log(`Original file size: ${(file.size / 1024).toFixed(2)} KB`);

    // Konfigurasi Compressor
    const options = {
      mimeType: "image/webp", // Konversi ke format WebP
      success: (compressedFile) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          const imageUrl = event.target.result;
          handleContentChange(id, "image", imageUrl);
        };

        console.log(
          `Compressed file size: ${(compressedFile.size / 1024).toFixed(2)} KB`
        );

        reader.readAsDataURL(compressedFile);
      },
      error: (err) => {
        console.error("Error compressing image:", err);
        alert("Failed to process image. Please try again.");
      },
    };

    // Jika file lebih dari 1MB, tambahkan kompresi
    if (file.size > 1048576) {
      // 1MB = 1,048,576 bytes
      options.quality = 0.5; // Kompresi dengan kualitas 50%
    }

    // Proses gambar dengan Compressor
    new Compressor(file, options);
  };
};
