import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { FormWrapper } from "@/components/form-wrapper";
import { createLead } from "@/actions/create-lead";
import { leadFormSchema } from "@/lib/schemas";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  serviceOptions?: string[];
  placeholderText?: string;
  prefilledValues?: {
    serviceType?: string;
    requirements?: string;
  };
}

export function LeadForm({
  title = "Get a Quote",
  subtitle = "Tell us about your project and we'll get back to you.",
  serviceOptions,
  placeholderText = "Describe your requirements...",
  prefilledValues,
}: LeadFormProps) {
  const { data: session } = authClient.useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const form = useForm<z.infer<typeof leadFormSchema>>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      requirements: "",
    },
  });

  useEffect(() => {
    setMounted(true);
    if (session?.user) {
      form.setValue("name", session.user.name);
      form.setValue("email", session.user.email);
    }
    if (prefilledValues) {
      form.reset((prev) => ({
        ...prev,
        ...prefilledValues,
      }));
    }
  }, [prefilledValues, form, session]);

  async function onSubmit(values: z.infer<typeof leadFormSchema>) {
    setIsSubmitting(true);
    try {
      const result = await createLead(values);
      if (result.success) {
        toast.success(result.message);
        form.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!mounted) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <FormWrapper
      title="Sign in to Get a Quote"
      description="Please sign in to submit your request"
    >
      <div className="w-full max-w-md mx-auto p-6 border border-border bg-background/50 backdrop-blur-sm rounded-lg">
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@example.com"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormDescription>
                      To change email, please sign in with a different account.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone / WhatsApp</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 98765 43210" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide phone number with WhatsApp!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {serviceOptions && serviceOptions.length > 0 && (
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Interest</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={placeholderText}
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </Form>
      </div>
    </FormWrapper>
  );
}
