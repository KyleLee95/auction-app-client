import React from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { auctionQueryOptions } from "@/utils/queryOptions";
import { zodResolver } from "@hookform/resolvers/zod";
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
  start_time: z.string(),
  end_time: z.string(),
  categories: z.string(),
  starting_price: z.coerce.number(),
});

function RouteComponent() {
  const params = Route.useParams();

  const auctionQuery = useSuspenseQuery(auctionQueryOptions(params.auctionId));
  const auction = auctionQuery.data[0];

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
      return fetch(`/api/auctions/${auction._id}}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: auction.title,
      description: auction.description,
      categories: "",
      starting_price: auction.starting_price,
      start_time: auction.start_time,
      end_time: auction.end_time,
    },
  });

  function onSubmit(event: React.SyntheticEvent) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    event.preventDefault();
    console.log("event", event);
    const values = new FormData(event.target);
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
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
                This is your public display name.
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
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="starting_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Starting Price</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="number" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="start_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="end_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input placeholder="Shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
