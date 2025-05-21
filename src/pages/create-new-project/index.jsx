import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import newWeb from "@/assets/new-website.svg";

const CreateNewProjectPage = () => {
  return (
    <div className="relative h-screen w-full p-5">
      <div className="grid grid-cols-2  md:grid-cols-3 gap-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-2xl">
              Buat Website Baru Dari Awal
            </CardTitle>
            <CardDescription>
              Mulailah merancang situs web Anda sepenuhnya dari nol, Sesuaikan
              setiap elemen dari tata letak, warna, hingga konten sesuai
              kebutuhan dan identitas merek Anda. Cocok untuk pengguna yang
              ingin kebebasan penuh dalam berkreasi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img src={newWeb} alt="" className="w-[300px] mx-auto" />
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              Pilih
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CreateNewProjectPage;
