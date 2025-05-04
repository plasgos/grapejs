import { Skeleton } from "./ui/skeleton";

const LoadingGenerateAICanvas = () => {
  return (
    <div className="absolute w-full  ">
      <div className=" mx-auto overflow-y-auto h-screen      w-full p-10">
        {" "}
        {/* Container full page dengan animasi */}
        {/* Header */}
        <div className=" top-0 left-0 right-0 bg-white shadow-md z-10 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Skeleton className="h-8 w-32 rounded-md" /> {/* Logo */}
            <div className="flex items-center space-x-4">
              <Skeleton className="h-6 w-20 rounded-md" /> {/* Menu Item */}
              <Skeleton className="h-6 w-20 rounded-md" /> {/* Menu Item */}
              <Skeleton className="h-10 w-10 rounded-full" />{" "}
              {/* Avatar/Icon */}
            </div>
          </div>
        </div>
        {/* Hero Section */}
        <div className="pt-10 pb-10 container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="h-12 w-full rounded-md" />{" "}
              {/* Judul Utama */}
              <Skeleton className="h-6 w-3/4 rounded-md" /> {/* Sub Judul */}
              <Skeleton className="h-10 w-1/2 rounded-md" /> {/* Tombol Aksi */}
            </div>
            <Skeleton className="h-64 w-full rounded-lg" /> {/* Gambar Hero */}
          </div>
        </div>
        {/* Section Konten Utama */}
        <div className="py-10 container mx-auto">
          <h2 className="text-xl font-semibold mb-6">
            <Skeleton className="h-8 w-48 rounded-md" /> {/* Judul Bagian */}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card-card konten */}
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-48 w-full rounded-xl" />{" "}
                {/* Gambar Card */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full rounded-md" />{" "}
                  {/* Judul Card */}
                  <Skeleton className="h-4 w-3/4 rounded-md" />{" "}
                  {/* Deskripsi Singkat */}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <Skeleton className="h-6 w-1/3 rounded-md" /> {/* Sub Judul Lain */}
            <Skeleton className="h-4 w-full rounded-md" /> {/* Paragraf */}
            <Skeleton className="h-4 w-5/6 rounded-md" /> {/* Paragraf */}
          </div>
        </div>
        {/* Bagian Lain (misalnya, Testimoni atau Fitur) */}
        <div className="py-10 bg-gray-200">
          <div className="container mx-auto space-y-6">
            <h2 className="text-xl font-semibold text-center">
              <Skeleton className="h-8 w-56 rounded-md mx-auto" />{" "}
              {/* Judul Bagian Lain */}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow">
                  <Skeleton className="h-10 w-10 rounded-full mb-4" />{" "}
                  {/* Avatar/Icon */}
                  <Skeleton className="h-4 w-1/2 rounded-md mb-2" />{" "}
                  {/* Nama */}
                  <Skeleton className="h-4 w-full rounded-md" />{" "}
                  {/* Testimoni/Fitur Deskripsi */}
                  <Skeleton className="h-4 w-3/4 rounded-md mt-3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingGenerateAICanvas;
