import { useQueries } from "@tanstack/react-query";
import { useSearchParams, Outlet } from "react-router-dom";
import { searchAuctions } from "@/utils/auctions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Checkbox,
} from "@/components/ui";

import { CompleteCategory } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { CheckedState } from "@radix-ui/react-checkbox";

const FormSchema = z.object({
  categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});

export function CheckboxReactHookFormMultiple({
  categories,
}: {
  categories: CompleteCategory[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categories: Array.from(searchParams.values()),
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  function handleOnCheck(
    category: CompleteCategory,
    checked: CheckedState,
    field: ControllerRenderProps<
      {
        categories: string[];
      },
      "categories"
    >
  ) {
    //checked refers to the *change* in state of the checkbox
    //i.e. when a user clicks on a checkbox, the value of checked will be true.
    if (checked) {
      setSearchParams(
        (prev) => {
          prev.append("category", category.value);
          return prev;
        },
        { preventScrollReset: true }
      );

      return field.onChange([...field.value, category.value]);
    }

    setSearchParams(
      (prev) => {
        console.log(prev);
        prev.delete("category", category.value);
        return prev;
      },
      { preventScrollReset: true }
    );

    return field.onChange(
      field.value?.filter((value) => value !== category.value)
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Categories</FormLabel>
                <FormDescription>
                  Select the categories you'd like to filter by
                </FormDescription>
              </div>
              {categories.map((category) => (
                <FormField
                  key={category.id}
                  control={form.control}
                  name="categories"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={category.id}
                        className="flex flex-row categories-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            disabled={
                              //if it's the last parameter selected, then don't the user uncheck it
                              Array.from(searchParams.getAll("category"))
                                .length === 1 &&
                              searchParams.has("category", category.value)
                                ? true
                                : false
                            }
                            checked={field.value?.includes(category.value)}
                            onCheckedChange={(checked) => {
                              return handleOnCheck(category, checked, field);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {category.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

const fetchCategories = async () => {
  const res = await fetch("/api/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  const { categories }: { categories: CompleteCategory[] } = data;
  return { categories: categories };
};

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const queryResults = useQueries({
    queries: [
      {
        queryKey: ["categories", searchParams.toString()],
        queryFn: () => fetchCategories(),
      },
      {
        queryKey: ["searchResults", searchParams.toString()],
        queryFn: () => searchAuctions(searchParams.toString()),
      },
    ],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        loading: results.map((result) => result.isLoading),
        error: results.map((result) => result.isError),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  const isLoading = queryResults.loading.some((result) => {
    result === true;
  });

  const isError = queryResults.error.some((result) => {
    result === true;
  });
  const isPending = queryResults.pending;

  if (isError) {
    return "Error";
  }

  if (isPending || isLoading) {
    return "Loading...";
  }

  const categories = queryResults?.data[0]?.categories;
  const auctions = queryResults?.data[1]?.auctions;
  return (
    <div className="flex flex-row flex-wrap mx-auto h-full min-h-72">
      <div>
        <CheckboxReactHookFormMultiple categories={categories} />
      </div>
      <Outlet context={{ auctions, categories }} />
    </div>
  );
};

export { SearchPage };
