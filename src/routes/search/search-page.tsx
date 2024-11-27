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
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { CheckedState } from "@radix-ui/react-checkbox";

const FormSchema = z.object({
  categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});

// const priceRanges = [
//   { label: "<$100", value: { minPrice: 0, maxPrice: 100 } },
//   { label: "$100-$500", value: { minPrice: 100, maxPrice: 500 } },
//   { label: "$500-$1000", value: { minPrice: 500, maxPrice: 1000 } },
//   { label: "$1000-$5000", value: { minPrice: 1000, maxPrice: 5000 } },
//   { label: "$5000-$10000", value: { minPrice: 5000, maxPrice: 10000 } },
//   { label: "$10000+", value: { minPrice: 10000, maxPrice: 99999 } },
// ];
//
//         <FormField
//           control={form.control}
//           name="price"
//           render={() => (
//             <FormItem>
//               <div className="mb-4">
//                 <FormLabel className="text-base">Categories</FormLabel>
//                 <FormDescription>
//                   Select the categories you'd like to filter by
//                 </FormDescription>
//               </div>
//               {priceRanges.map((range) => {
//                 return (
//                   <FormField
//                     key={range.label}
//                     name="price"
//                     control={form.control}
//                     render={({ field }) => {
//                       return (
//                         <FormItem className="flex flex-row categories-start space-x-3 space-y-0">
//                           <FormControl>
//                             <Checkbox
//                               checked={field.value?.includes(range)}
//                               onCheckedChange={(checked) => {
//                                 return handlePriceChange(checked, field, range);
//                               }}
//                             />
//                           </FormControl>
//                           <FormLabel className="font-normal">
//                             {range.label}
//                           </FormLabel>
//                         </FormItem>
//                       );
//                     }}
//                   />
//                 );
//               })}
//             </FormItem>
//           )}
//         />
//
export function CheckboxList({
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

  function handlePriceChange(
    checked: CheckedState,
    field: ControllerRenderProps,
    range: { label: string; value: { minPrice: number; maxPrice: number } }
  ) {
    const currentMinPrice = searchParams.get("minPrice") as string;
    const currentMaxPrice = searchParams.get("maxPrice") as string;
    const { value } = range;
    if (value.minPrice < parseFloat(currentMinPrice)) {
      setSearchParams(
        (prev) => {
          prev.delete("minPrice", currentMinPrice);
          prev.set("minPrice", value.minPrice.toString());
          return prev;
        },
        { preventScrollReset: true }
      );
    }

    if (value.maxPrice > parseFloat(currentMaxPrice)) {
      setSearchParams(
        (prev) => {
          prev.delete("maxPrice", currentMinPrice);
          prev.set("maxPrice", value.minPrice.toString());
          return prev;
        },
        { preventScrollReset: true }
      );
    }
    console.log(field);
    return field.onChange([...field.value.label, range.label]);
  }

  function handleOnCheck(
    category: CompleteCategory,
    checked: CheckedState,
    field: ControllerRenderProps<FieldValues, "categories">
  ) {
    //checked refers to the *change* in state of the checkbox
    //i.e. when a user clicks on a checkbox, the value of checked will be true.
    if (checked) {
      setSearchParams(
        (prev) => {
          prev.append("categories", category.value);
          return prev;
        },
        { preventScrollReset: true }
      );

      return field.onChange([...field.value, category.value]);
    }

    setSearchParams(
      (prev) => {
        prev.delete("categories", category.value);
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
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className="space-y-8"
      >
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
                              Array.from(searchParams.getAll("categories"))
                                .length === 1 &&
                              searchParams.has("categories", category.value)
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
        <CheckboxList categories={categories} />
      </div>
      <Outlet context={{ auctions, categories }} />
    </div>
  );
};

export { SearchPage };
