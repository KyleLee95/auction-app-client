import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CompleteCategory } from "@/types/category";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type OptionTypes = CompleteCategory[] | undefined;
export interface ComboboxProps<T> {
  value: string[];
  form: any;
  options: T[];
  label: string;
}

export function Combobox({
  value,
  form,
  options,
  label,
}: ComboboxProps<OptionTypes>) {
  console.log("value", value);
  console.log("form", form);
  console.log("options", options);
  console.log("label", label);
  return (
    <>
      <FormField
        control={form.control}
        name="option"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>option</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-[200px] justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? options.find(
                          (option) => option.displayName === field.value
                        )?.displayName
                      : "Select option"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    onInput={(event: React.SyntheticEvent) => {
                      //set query here
                      console.log("command input change event", event);
                      console.log(event.target.value);
                    }}
                    placeholder="Search option..."
                  />
                  <CommandList>
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          value={option.paramName}
                          key={option.paramName}
                          onSelect={() => {
                            console.log("??/");
                            form.setValue("option", option.displayName);
                          }}
                        >
                          {option.displayName}
                          <Check
                            className={cn(
                              "ml-auto",
                              option.displayName === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription>
              This is the option that will be used in the dashboard.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit">Submit</Button>
    </>
  );
}
