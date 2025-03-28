"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderHeader } from "./order-header";
import { OrderProgress } from "./order-progress";
import { toast } from "sonner";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  orderType: z.string().min(1, { message: "Please select an order type." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function OrderForm() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      orderType: "standard",
    },
  });

  const [patientFullName, setPatientFullName] = useState("Adam Applegate");
  const firstName = form.watch("firstName") || "";
  const lastName = form.watch("lastName") || "";

  useEffect(() => {
    if (firstName || lastName) {
      setPatientFullName(`${firstName} ${lastName}`.trim());
    }
  }, [firstName, lastName]);

  const createOrderMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await axios.post("/api/orders", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Order created successfully!");
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to create order");
    },
  });

  function onSubmit(data: FormValues) {
    setPatientFullName(`${data.firstName} ${data.lastName}`.trim());
    createOrderMutation.mutate(data);
  }

  return (
    <div className="min-h-screen bg-background">
      <OrderHeader patientFullName={patientFullName} />
      <OrderProgress />

      {/* Form Content */}
      <div className="p-6">
        <h2 className="text-xl font-medium mb-6">
          Step 1: Overview<span className="text-primary">*</span>
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">General Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Patient First Name
                        <span className="text-primary">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter first name"
                          className="border-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Patient Last Name<span className="text-primary">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter last name"
                          className="border-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          className="border-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="orderType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Order Type<span className="text-primary">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-input">
                            <SelectValue placeholder="Select order type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Edge & No Mount">
                            Edge & No Mount
                          </SelectItem>
                          <SelectItem value="Edge & Mount">
                            Edge & Mount
                          </SelectItem>
                          <SelectItem value="Uncut">Uncut</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={createOrderMutation.isPending}
              >
                {createOrderMutation.isPending ? "Creating..." : "Next"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
