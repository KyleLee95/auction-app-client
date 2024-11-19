import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  // useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
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

  buyItNowEnabled: z.boolean(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  categories: z.string(),
  startPrice: z.coerce.number(),
});

function RouteComponent() {
  const params = Route.useParams();

  const auctionQuery = useSuspenseQuery(auctionQueryOptions(params.auctionId));
  const auction = auctionQuery.data.auctions[0];

  // const mutation = useMutation({
  //   mutationFn: (values: z.infer<typeof formSchema>) => {
  //     return fetch(`/api/auctions/${auction._id}}`, {
  //       method: "PUT",
  //       body: JSON.stringify(values),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   },
  // });

  // 1. Define your form.
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
    },
  });

  // React.DOMAttributes<HTMLFormElement>.onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined
  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // event?.preventDefault();
    // console.log("event", event);
    // const values = new FormData(event.currentTarget);
    // mutation.mutate(values);
  }

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
                    The time the auction should end
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
