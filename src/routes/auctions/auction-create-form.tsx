import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
  FormItem,
} from "@/components/ui/form";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { DateTimePicker } from "@/components/date-time-picker";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Combobox } from "@/components/ui/combobox";
import { AuthUser } from "@aws-amplify/auth";
import { CompleteCategory } from "@/types";
const formSchema = z.object({
  title: z.string().default("title"),
  description: z.string().default("description"),
  startPrice: z.number().default(0.0), // Accepts number from client
  startTime: z.date().default(new Date(Date.now())),
  endTime: z.date().default(new Date(Date.now())),
  shippingPrice: z.number().default(15.99),
  isActive: z.boolean().default(false),
  quantity: z.coerce.number().int().default(1),
  buyItNowEnabled: z.coerce.boolean().default(true),
  categories: z.array(z.string()).default([]),
});

function AuctionCreateForm({ categories }: { categories: CompleteCategory }) {
  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      // const res = await fetch(`/api/auctions/${auction.id}`, {
      //   method: "PUT",
      //   body: JSON.stringify({ ...auction, ...formData }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // const data = await res.json();
      // return data;
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isActive: true,
      buyItNowEnabled: true,
      description: "A helpful description",
      shippingPrice: 10.99,
      startPrice: 10.99,
      quantity: 1,
      startTime: new Date(Date.now()),
      endTime: new Date(Date.now()),
      title: "An accurate title",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="An accurate and helpful title"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is what potential buyers will see your auction listed
                    as.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="placeholder description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A description of the physical condition of the item.
                    Recommended to include other characteristics of the item.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Starting Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    The initial price of the item. This price will be used as
                    the Buy It Now price, if the option is enabled
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="buyItNowEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Enable Buy It Now</FormLabel>
                    <FormDescription>
                      Enabling this feature allows users to purchase your item
                      for the amount specified in start price
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      hourCycle={12}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    The time the auction should start
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      hourCycle={12}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    The time the auction should end.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    The amount the buyer will be charged for shipping.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    The number of the item that is available, e.g. if you have
                    10 identitcal T-shirts for sale then the quantity is 10.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>List Auction</FormLabel>
                    <FormDescription>
                      If the auction should be publicly listed. A publicly
                      listed auction will be available for purchase and shown in
                      searches.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <Combobox
                  value={field.value}
                  form={form}
                  options={categories}
                  label="categories"
                  // description="Select a language for the dashboard."
                />
              )}
            />

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Button type="submit">Submit</Button>
              <Button>Cancel</Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

export { AuctionCreateForm };
