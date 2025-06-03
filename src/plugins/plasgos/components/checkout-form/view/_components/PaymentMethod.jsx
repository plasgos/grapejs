import { useFormContext } from "react-hook-form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ViewTitle from "./ViewTitle";

const paymentMethod = [
  {
    id: "1",
    name: "Bank BCA",
    code_name: "bca",
    account_number: "3428843888",
    account_name: "PT. Plasa Grosir Indonesia",
    logo: "https://ik.imagekit.io/ez1ffaf6o/default-images/bca.png?updatedAt=1747622170410",
    is_default: true,
  },
  {
    id: "2",
    name: "Bank BRI",
    code_name: "bri",
    account_number: "038601001383302",
    account_name: "PT. Plasa Grosir Indonesia",
    logo: "https://ik.imagekit.io/ez1ffaf6o/default-images/bri.png?updatedAt=1747622170403",
    is_default: false,
  },
  {
    id: "3",
    name: "Bank Mandiri",
    code_name: "mandiri",
    account_number: "0060010352833",
    account_name: "PT. Plasa Grosir Indonesia",
    logo: "https://ik.imagekit.io/ez1ffaf6o/default-images/mandiri.png?updatedAt=1747622170397",
    is_default: false,
  },
];

const paymentMethodOptions = [
  {
    value: "bankTransfer",
    label: "Bank Transfer",
    icon: "https://ik.imagekit.io/ez1ffaf6o/default-images/bankTransfer.png?updatedAt=1747622420607",
    isDisabled: false,
  },
  {
    value: "cod",
    label: "COD (Bayar di Tempat)",
    icon: "https://ik.imagekit.io/ez1ffaf6o/default-images/cod.png?updatedAt=1747622420791",
    isDisabled: false,
  },
];

const PaymentMethod = ({ width, styles }) => {
  const { titleSize, titleColor, labelColor, labelSize } = styles;
  const { control, setValue, watch } = useFormContext();

  const handleSelectBank = (id) => {
    const selectedBank = paymentMethod.find((item) => item.id === id);
    if (selectedBank) {
      setValue("bank", selectedBank);
    }
  };

  const selectedPaymentMethod = watch("paymentMethod");

  return (
    <div>
      <ViewTitle
        content={{ value: "Metode Pengiriman" }}
        titleSize={titleSize}
        titleColor={titleColor}
      />

      <FormField
        control={control}
        name="paymentMethod"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center gap-5 mb-5 ">
                {paymentMethodOptions.map((method) => {
                  const isSelected = field.value === method.value;

                  return (
                    <div
                      key={method.value}
                      className={` rounded-md border p-4  cursor-pointer  ${
                        isSelected
                          ? "bg-[#FFF4EA] dark:bg-[#282828] ring-1 ring-orange-500"
                          : "bg-slate-50 dark:bg-[#0A0A0A]"
                      }
                                      
                                      ${
                                        method.isDisabled
                                          ? "cursor-not-allowed"
                                          : ""
                                      }
                                      `}
                      onClick={() => {
                        if (!method.isDisabled) {
                          setValue("paymentMethod", method.value, {
                            shouldValidate: true, // Trigger validasi saat berubah
                          });

                          // Reset field bank jika user memilih COD
                          if (method.value === "cod") {
                            setValue("bank", {}, { shouldValidate: true });
                          }
                        }
                      }}
                    >
                      <div
                        className={`flex flex-col items-center gap-y-2 ${
                          isSelected ? "" : "text-muted-foreground"
                        } 
                                         ${
                                           method.isDisabled
                                             ? "cursor-not-allowed"
                                             : "cursor-pointer"
                                         } 
                                        `}
                      >
                        <img
                          src={method.icon}
                          alt={method.label}
                          className="object-contain w-12 "
                        />

                        <p
                          className={`!select-none text-sm  leading-none mt-2     ${
                            method.isDisabled
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          } `}
                        >
                          {method.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      {selectedPaymentMethod === "bankTransfer" && (
        <Accordion
          defaultValue="bankTransfer"
          type="single"
          collapsible
          className="w-full"
        >
          <AccordionItem
            value="bankTransfer"
            className="border rounded-lg  bg-white"
          >
            <AccordionTrigger className="w-full px-4 py-3 text-left font-medium text-gray-900 bg-gray-100 rounded-t-lg hover:bg-gray-200 !no-underline justify-between">
              <div>
                <p> Bank Transfer</p>
              </div>

              <div
                className={`${
                  width < 400 ? "hidden" : "hidden md:flex gap-x-2 ml-auto px-3"
                }  `}
              >
                {paymentMethod.map((method) => (
                  <img
                    key={method.code_name}
                    src={method.logo}
                    alt={method.name}
                    className="object-contain  w-16 "
                  />
                ))}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 border-t bg-white rounded-b-lg">
              <FormField
                control={control}
                name="bank"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col   rounded-md p-1">
                          <div className="d-flex flex-column  ">
                            <RadioGroup
                              className="gap-4"
                              value={field.value?.id}
                              onValueChange={(value) => handleSelectBank(value)}
                            >
                              {paymentMethod.map((payment) => (
                                <div
                                  key={payment.id}
                                  className={`bg-white dark:bg-[#0A0A0A] flex items-center border rounded-md p-3 justify-between  ${
                                    field.value?.id === payment.id
                                      ? "ring-1 ring-orange-500"
                                      : "border-gray-300"
                                  }`}
                                >
                                  <div className="flex items-center !select-none">
                                    <img
                                      src={payment.logo}
                                      alt={payment.name}
                                      style={{ width: 70 }}
                                      className="mr-3 object-contain !select-none"
                                    />
                                    <p className="!select-none  text-sm">
                                      Transfer {payment.name}
                                    </p>
                                  </div>

                                  <RadioGroupItem
                                    className="!select-none"
                                    value={payment.id}
                                    id={`bank-${payment.id}`}
                                    checked={field.value?.id === payment.id}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default PaymentMethod;
