import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
  FormItem,
} from "@/components/ui/form";
import { DateTimePicker } from "@/components/date-time-picker";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { auctionQueryOptions } from "@/utils/queryOptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/auctions/$auctionId/edit")({
  component: RouteComponent,
});

const formSchema = z.object({
  title: z.string().min(15, {
    message: "Title must be at least 15 characters.",
  }),
  description: z
    .string()
    .min(1, { message: "Description cannot be empty" })
    .max(250, { message: "Description cannot be longer than 250 characters" }),

  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  startPrice: z.coerce.number(),
  categories: z.string(),
  shippingPrice: z.number(),
  isActive: z.boolean(),
  quantity: z.number().int(),
  buyItNowEnabled: z.boolean(),
});

function RouteComponent() {
  const params = Route.useParams();

  const auctionQuery = useSuspenseQuery(auctionQueryOptions(params.auctionId));
  const auction = auctionQuery.data.auctions[0];

  const { user } = useAuthenticator();

  console.log("user", user);
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      console.log("data?", formData);
      const res = await fetch(`/api/auctions/${auction.id}`, {
        method: "PUT",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("res", data);
      return res;
    },
  });

  const startTimeDate = new Date(auction.startTime);
  const endTime = new Date(auction.endTime);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: auction.title,
      description: auction.description,
      categories: "",
      startPrice: auction.startPrice,
      startTime: startTimeDate,
      endTime: endTime,
      shippingPrice: auction.shippingPrice,
      isActive: auction.isActive,
      quantity: auction.quantity,
      buyItNowEnabled: auction.buyItNowEnabled,
    },
  });

  // React.DOMAttributes<HTMLFormElement>.onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    mutation.mutate(new FormData(event.target));
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
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
                    <Input placeholder="shadcn" type="number" {...field} />
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
                    <Input placeholder="shadcn" type="number" {...field} />
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
                    <Input placeholder="shadcn" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    The number of the item that is available, e.g. if you have
                    10 identitcal T-shirts for sale then the quantity is 10.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
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
