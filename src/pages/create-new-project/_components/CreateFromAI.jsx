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
import { useGenerateComponentFromAIMutation } from "@/redux/services/aiGenerateApi";
import { useDispatch } from "react-redux";
import { setProjectDataFromAI } from "@/redux/modules/landing-page/landingPageSlice";
import { Loader2 } from "lucide-react";
import { BsStars } from "react-icons/bs";

const formSchema = z.object({
  name: z.string().min(3, { message: "Harus Di Isi" }),
  description: z.string().min(10, { message: "Harus Di Isi" }),
});

const CreateFromAI = () => {
  const [generateComponentFromAI, { isLoading: isLoadingGenerateAI, isError }] =
    useGenerateComponentFromAIMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const {
    formState: { isValid },
  } = form;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, description } = data;

    try {
      const result = await generateComponentFromAI({ prompt: description });

      if (result?.data) {
        console.log("🚀 ~ onSubmit ~ result:", result);
        dispatch(setProjectDataFromAI(result?.data?.data));

        navigate(`/web-builder/${name}`);
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
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

          <Accordion defaultValue="desc" type="single" collapsible>
            <AccordionItem value="desc">
              <AccordionTrigger className="text-slate-400">
                Contoh Deskripsi
              </AccordionTrigger>
              <AccordionContent className="p-2 border rounded bg-slate-100">
                Buatkan landing page profesional untuk marketing produk coffe
                beans.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className={cx(
              "w-full bg-blue-500 text-white hover:bg-blue-700 hover:text-white"
            )}
            variant="outline"
            disabled={isLoadingGenerateAI | !isValid}
          >
            Generate Website{" "}
            {isLoadingGenerateAI ? (
              <Loader2 className="animate-spin" />
            ) : (
              <BsStars />
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateFromAI;
