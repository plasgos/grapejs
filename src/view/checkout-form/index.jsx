"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const formSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters").max(50),
    phoneNumber: z
      .string()
      .regex(
        /^62(8[1-9][0-9]{7,10})$/,
        "Phone number must start with 62 and contain 10-13 digits"
      ),
    address: z
      .string()
      .min(8, "Address must be at least 8 characters")
      .max(500),
    // city: z.string().optional(),
    // subdistrict: z.string().optional(),
    // isDropshipping: z.boolean().optional(),
    // nameDropshipper: z.string().optional(),
    // phoneNumberDropshipper: z.string().optional(),

    paymentMethod: z.enum(["bankTransfer", "cod"]),
    bank: z.any().optional(),
    courier: z.string(),
    courierPackage: z.string(),
  })
  .superRefine((data, ctx) => {
    // Jika paymentMethod adalah "bankTransfer", maka "bank" harus diisi
    if (
      data.paymentMethod === "bankTransfer" &&
      (!data.bank || !data.bank.id || !data.bank.name)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["bank"],
        message: "Bank selection is required for bank transfer",
      });
    }
  });

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import PaymentMethod from "./components/PaymentMethod";
import { useEffect } from "react";
import Shipping from "./components/Shipping";
// import { useEffect } from "react";

const ViewFormCheckout = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
      city: "",
      subdistrict: "",
      isDropshipping: false,
      nameDropshipper: "",
      phoneNumberDropshipper: false,
      paymentMethod: "bankTransfer",
      bank: {},
      courier: "",
      courierPackage: "",
    },
  });

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  // const [data, setData] = useState([]);
  // console.log("🚀 ~ ViewFormCheckout ~ data:", data);
  // const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(true); // Tambahkan state loading

  // const fetchData = async (url) => {
  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     throw error;
  //   }
  // };

  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true); // Set loading menjadi true saat fetch dimulai
  //     try {
  //       const result = await fetchData("http://192.168.1.8:3000/subdistricts");
  //       setData(result.data);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false); // Set loading menjadi false setelah fetch selesai (baik sukses atau gagal)
  //     }
  //   };
  //   getData();
  // }, []);

  // let cityList = null;
  // console.log("🚀 ~ ViewFormCheckout ~ cityList:", cityList);

  // if (Array.isArray(data)) {
  //   cityList = data?.map((item) => ({
  //     value: item.id.toString(),
  //     label: `${item.name} - ${item.City?.name}, ${item.City?.Province?.name}`,
  //   }));
  // } else {
  //   console.log("data is not an array, data type is: ", typeof data);
  // }

  // if (isLoading) {
  //   return <div>Loading...</div>; // Tampilkan pesan loading
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>; // Tampilkan pesan error
  // }

  return (
    <div style={{ maxWidth: 600 }} className="p-5  mx-auto">
      <Form {...form}>
        <form className="space-y-3">
          <div className="flex items-center gap-x-5">
            <p className="font-semibold text-xl whitespace-nowrap">
              Data Penerima
            </p>
            <hr className="h-3 w-full" />
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">Nama</FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-neutral-300"
                    placeholder="John"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">No Whatsapp</FormLabel>
                <FormControl>
                  <Input
                    maxLength={13}
                    className="placeholder:text-neutral-300"
                    placeholder="628952367xxxx"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal">Alamat</FormLabel>
                <FormControl>
                  <Textarea
                    className="placeholder:text-neutral-300"
                    placeholder="Jl Perjuangan 11"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mt-2">Kota / Kecamatan</FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[300px] justify-between" // Lebihkan lebar tombol
                      >
                        {value
                          ? cityList.find((city) => city.value === value)?.label
                          : "Pilih Kota / Kecamatan..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Cari Kota / Kecamatan..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>
                            Kota / Kecamatan tidak ditemukan.
                          </CommandEmpty>
                          <CommandGroup>
                            {cityList?.map((city) => (
                              <CommandItem
                                key={city.value}
                                value={city.value}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value ? "" : currentValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                {city.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    value === city.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="font-normal mt-2">
                  Kota / Kecamatan
                </FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                      >
                        {value
                          ? frameworks.find(
                              (framework) => framework.value === value
                            )?.label
                          : "Select framework..."}
                        <ChevronDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search framework..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {frameworks.map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value ? "" : currentValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                {framework.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    value === framework.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Shipping />
          <PaymentMethod />

          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="w-full"
            type="button"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ViewFormCheckout;
