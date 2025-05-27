import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import slugify from "slugify";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cx } from "class-variance-authority";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNewProject } from "@/redux/modules/landing-page/landingPageSlice";
import { generateId } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(3, { message: "Harus Di Isi" }),
  description: z.string().optional(),
});

const CreateFromScratch = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const { name, description } = data;

    const slug = slugify(name);

    dispatch(
      setNewProject({
        id: generateId(),
        name,
        slug,
        description,
        thumbnail: "",
        frameProject: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
    navigate(`/web-builder/${slug}`);
  };

  return (
    <div className=" relative z-10 w-[728px]">
      <Card className="">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-2xl">
            Deskripsikan Website Anda
          </CardTitle>
          <CardDescription className="hidden">X</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Website</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Website</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[150px]"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-slate-400">
                Contoh Deskripsi
              </AccordionTrigger>
              <AccordionContent className="p-2 border rounded bg-slate-100">
                Website ini dibuat untuk menjual produk handmade seperti tas
                rajut, aksesoris, dan dekorasi rumah. Halaman ini dirancang
                sederhana dan langsung ke inti — menampilkan foto produk,
                deskripsi singkat, dan tombol beli atau hubungi via WhatsApp.
                Cocok digunakan untuk iklan karena pengunjung bisa langsung
                melakukan pemesanan tanpa harus membuka banyak halaman.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className={cx(
              "w-full bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
            )}
            variant="outline"
          >
            Buat
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateFromScratch;
