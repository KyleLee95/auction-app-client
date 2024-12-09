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
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { CompleteCategory } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useAuthenticator } from "@aws-amplify/ui-react";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

const FormSchema = z.object({
  order: z.string(),
  categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),

  priceRange: z
    .object({
      minPrice: z.number().optional(),
      maxPrice: z.number().optional(),
    })
    .default({ minPrice: 0, maxPrice: 10000 }),
});

const priceRanges = [
  { label: "$50", value: { minPrice: 0, maxPrice: 50 } },
  { label: "$100", value: { minPrice: 0, maxPrice: 100 } },
  { label: "$250", value: { minPrice: 0, maxPrice: 250 } },
  { label: "$500", value: { minPrice: 0, maxPrice: 500 } },
  { label: "$1000", value: { minPrice: 0, maxPrice: 1000 } },
  { label: "$10,000", value: { minPrice: 0, maxPrice: 10000 } },
];

const OrderBySelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortOptions = [
    { display: "Ending (Soonest to Longest)", value: "asc" },
    { display: "Ending (Longest to Soonest)", value: "desc" },
  ];

  const handleOrderByChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set("order", value);
      return prev;
    });
  };

  return (
    <div className="mb-4">
      <h3 className="text-base">Order By</h3>
      <Select
        onValueChange={(value) => handleOrderByChange(value)}
        defaultValue={searchParams.get("order") || "desc"}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Order By" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.display}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export function CheckboxList({
  categories,
}: {
  categories: CompleteCategory[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      order: "",
      categories: Array.from(searchParams.values()),
      priceRange: {
        minPrice: parseFloat(searchParams.get("minPrice") || "0"),
        maxPrice: parseFloat(searchParams.get("maxPrice") || "10000"), // Default max price
      },
    },
  });

  function handlePriceChange(
    checked: CheckedState,
    field: ControllerRenderProps<z.infer<typeof FormSchema>, "priceRange">,
    range: { minPrice: number; maxPrice: number }
  ) {
    const { minPrice, maxPrice } = range;

    if (checked) {
      // Update the search params and form value for price range
      setSearchParams((prev) => {
        prev.set("minPrice", String(minPrice));
        prev.set("maxPrice", String(maxPrice));
        return prev;
      });

      return field.onChange({ minPrice, maxPrice });
    } else {
      // Reset price range in URL and form
      setSearchParams((prev) => {
        prev.delete("minPrice");
        prev.delete("maxPrice");
        return prev;
      });

      return field.onChange({});
    }
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
          name="order"
          render={() => (
            <FormItem>
              <FormLabel className="text-base">Order By</FormLabel>
              <FormDescription>Order Auctions by:</FormDescription>
              <OrderBySelect />
            </FormItem>
          )}
        />
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
                            // disabled={
                            //   //if it's the last parameter selected, then don't the user uncheck it
                            //   Array.from(searchParams.getAll("categories"))
                            //     .length === 1 &&
                            //   searchParams.has("categories", category.value)
                            // }
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

        {/* Price Range Selection */}
        <FormField
          control={form.control}
          name="priceRange"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Maximum Price</FormLabel>
                <FormDescription>
                  Only show auctions up to the maximum price.
                </FormDescription>
              </div>
              {priceRanges.map((range) => (
                <FormItem
                  key={range.label}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={
                        parseFloat(searchParams.get("minPrice") || "0") ===
                          range.value.minPrice &&
                        parseFloat(searchParams.get("maxPrice") || "10000") ===
                          range.value.maxPrice
                      }
                      onCheckedChange={(checked) =>
                        handlePriceChange(checked, field, range.value)
                      }
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{range.label}</FormLabel>
                </FormItem>
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

  const { user } = useAuthenticator();

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
      <Outlet context={{ user, auctions, categories }} />
    </div>
  );
};

export { SearchPage };
