import * as React from "react";
import { useOutletContext } from "react-router-dom";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormCombobox } from "@/components/form-combobox";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

function WatchlistEdit() {
  const { watchlist, categories } = useOutletContext();
  const formSchema = z.object({
    name: z.string(),
    maxPrice: z.coerce.number(),
    categories: z.array(z.string()),
    keyword: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: watchlist.name,
      maxPrice: watchlist.maxPrice,
      keyword: watchlist.keyword,
      categories: watchlist.categories.map((catObj) => {
        const { category } = catObj;
        return category.value;
      }),
    },
  });

  const submitForm = useMutation({
    mutationFn: async (formData: any) => {
      const categoriesData = categories.filter((category: any) => {
        if (formData.categories.includes(category.value)) {
          return category;
        }
      });

      const payload = {
        ...formData,
        categories: categoriesData,
      };

      const res = await fetch(`/api/watchlists/${watchlist.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    },
    mutationKey: ["watchlists"],
    onSuccess: (data) => {},
  });

  function onSubmit(data: any) {
    console.log("data", data);
    submitForm.mutate(data);
    return;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Watchlist Name" {...field} />
                  </FormControl>
                  <FormDescription>The name of your watchlist</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Max Price" type="number" {...field} />
                  </FormControl>
                  <FormDescription>The title of your watchlist</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormCombobox
              items={categories}
              path={"categories"}
              label={"categories"}
              resourceName={"categories"}
              description={
                "Add tags to categorize your auction and help users find it."
              }
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

export { WatchlistEdit };
