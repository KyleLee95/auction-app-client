import { useState } from "react";
import { FieldValues, type Path, useFormContext } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Command,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandInput,
  CommandGroup,
  Button,
} from "@/components/ui";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";
import { cn } from "@/lib/utils";
export type LabelValuePair = {
  id: number;
  value: string;
  label: string;
};

export type FormComboboxProps<T> = {
  path: Path<T>;
  items: LabelValuePair[];
  defaultItems?: LabelValuePair[];
  resourceName: string;
  label?: string;
  description?: string;
};

function FormCombobox<T extends FieldValues>({
  path,
  label,
  items,
  defaultItems,
  description,
  resourceName,
}: FormComboboxProps<T>) {
  const { control, setValue } = useFormContext<T>();
  const [queryText, setQueryText] = useState("");

  const createNewCategoryMutation = useMutation({
    mutationFn: async (newCategory: string) => {
      const res = await fetch(`/api/categories`, {
        method: "POST",
        body: JSON.stringify({ label: newCategory, value: newCategory }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  });

  const handleCreateNewCategory = () => {
    createNewCategoryMutation.mutate(queryText);
  };
  return (
    <FormField<T>
      control={control}
      name={path}
      render={({ field }) => (
        console.log(field),
        (
          <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-haspopup="listbox"
                    className={cn(
                      "justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value && field.value.length > 0
                      ? (() => {
                          const joinedItems = items
                            .filter((item) => field.value.includes(item.value))
                            .map((item) => item.label)
                            .join(", ");

                          return joinedItems.length > 50
                            ? joinedItems.slice(0, 50) + "..."
                            : joinedItems;
                        })()
                      : `Select ${resourceName}...`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full md:w-[300px] p-0">
                <Command
                  filter={(value, search) => {
                    const item = items.find((item) => item.value === value);
                    if (!item) return 0;
                    if (item.label.toLowerCase().includes(search.toLowerCase()))
                      return 1;

                    return 0;
                  }}
                >
                  <CommandInput
                    onInput={(event) => setQueryText(event.target.value)}
                    placeholder={`Search ${resourceName}...`}
                  />
                  <CommandEmpty>No {resourceName} found.</CommandEmpty>
                  <CommandEmpty>
                    <Button
                      onClick={() => {
                        handleCreateNewCategory();
                      }}
                    >
                      Create tag: {queryText}?
                    </Button>
                  </CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {items.map(({ id, value, label }) => (
                        <CommandItem
                          key={id}
                          value={value}
                          onSelect={(value) => {
                            const currentValues: string[] = field.value || [];
                            if (currentValues.includes(value)) {
                              field.onChange(
                                currentValues.filter((item) => item !== value)
                              );
                            } else {
                              field.onChange([...currentValues, value]);
                            }
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value && field.value.includes(value)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {label}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )
      )}
    />
  );
}
export { FormCombobox };
