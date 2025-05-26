import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BsStars } from "react-icons/bs";

import newWeb from "@/assets/new-website.svg";
import aiGenerate from "@/assets/ai-generate.svg";
import templateWeb from "@/assets/template-website.svg";
import { cx } from "class-variance-authority";
import { useState } from "react";
import CreateFromAI from "./_components/CreateFromAI";
import CreateFromScratch from "./_components/CreateFromScratch";
import CreateFromTemplate from "./_components/CreateFromTemplate";
import { LazyLoadImage } from "react-lazy-load-image-component";

const createOptions = [
  {
    id: "scratch",
    name: "Buat Website Baru Dari Awal",
    description: `Mulailah merancang situs web Anda dari awal. Sesuaikan setiap elemen  dan tata letak, warna, hingga konten sesuai kebutuhan Anda. Cocok untuk Anda yang ingin kebebasan penuh dalam berkreasi.`,
    image: newWeb,
  },
  {
    id: "ai",
    name: "Buat Dengan AI Website Builder",
    description: `Gunakan AI untuk membuat situs web dalam hitungan detik. Cukup masukkan beberapa informasi dasar, AI akan membantu membangun struktur dan kontennya untuk Anda.`,
    image: aiGenerate,
    icon: <BsStars />,
  },
  {
    id: "template",
    name: "Pilih Website dari Template",
    description: `Pilih dari berbagai template siap pakai untuk langsung memulai. Praktis dan cepat, cocok untuk Anda yang ingin hasil instan namun tetap bisa dikustomisasi.`,
    image: templateWeb,
  },
];

const viewMap = {
  scratch: <CreateFromScratch />,
  ai: <CreateFromAI />,
  template: <CreateFromTemplate />,
};

const GradientBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Blob 1 */}
      <div
        className="absolute top-[-10%] left-0 w-[500px] h-[500px] bg-purple-500 opacity-40 rounded-full filter blur-[200px] animate-[blob_30s_ease-in-out_infinite]"
        style={{ animationDelay: "0s" }}
      />
      {/* Blob 2 */}
      <div
        className="absolute top-[20%] left-[50%] w-[600px] h-[600px] bg-orange-300 opacity-30 rounded-full filter blur-[200px] animate-[blob_35s_ease-in-out_infinite]"
        style={{ animationDelay: "8s" }}
      />
      {/* Blob 3 */}
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500 opacity-30 rounded-full filter blur-[200px] animate-[blob_40s_ease-in-out_infinite]"
        style={{ animationDelay: "16s" }}
      />

      <div
        className="absolute bottom-[-10%]  w-[600px] h-[600px] bg-orange-500 opacity-30 rounded-full filter blur-[200px] animate-[blob_40s_ease-in-out_infinite]"
        style={{ animationDelay: "16s" }}
      />
    </div>
  );
};

const CreateNewProjectPage = () => {
  const [selectedCreateOption, setSelectedCreateOption] = useState("");

  return (
    <div className="relative flex flex-col justify-center items-center h-screen  w-full p-5 bg-[#FFF4EA] ">
      {!selectedCreateOption ? (
        <>
          <h1 className="text-5xl text-center mb-[50px] ">
            Pilih Metode Pembuatan Website yang Cocok untuk Anda
          </h1>
          <div className="relative z-10 grid grid-cols-2  md:grid-cols-3 gap-10 max-w-screen-2xl ">
            {createOptions.map((create) => {
              const { id, name, description, image, icon } = create || {};
              return (
                <Card key={id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-center text-2xl">
                      {name}
                    </CardTitle>
                    <CardDescription className="min-h-[120px]">
                      {description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LazyLoadImage
                      src={image}
                      alt={"name"}
                      className="w-[250px] mx-auto"
                      effect="blur"
                      wrapperProps={{
                        style: { transitionDelay: "0.5s" },
                      }}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => setSelectedCreateOption(id)}
                      className={cx(
                        "w-full",
                        id === "ai"
                          ? "bg-blue-500 text-white hover:bg-blue-700 hover:text-white"
                          : "border-orange-300"
                      )}
                      variant="outline"
                    >
                      Pilih {id === "ai" && icon}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        <GradientBackground />
      )}
      {viewMap[selectedCreateOption] || null}
    </div>
  );
};

export default CreateNewProjectPage;
