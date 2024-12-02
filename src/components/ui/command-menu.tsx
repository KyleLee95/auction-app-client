import React from "react";
import { cn } from "@/lib/utils";
import {
  CommandItem,
  CommandEmpty,
  CommandList,
  CommandDialog,
  CommandInput,
  CommandGroup,
} from "@/components/ui/command";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { type DialogProps } from "@radix-ui/react-dialog";

const categories = [
  { label: "Autos", value: "autos" },
  {
    label: "Clothing, Shoes & Accessories",
    value: "clothing-shoes-accessories",
  },
  { label: "Electronics", value: "electronics" },
  { label: "Sporting Goods", value: "sporting-goods" },
  { label: "Jewely & Watches", value: "jewelry-watches" },
  { label: "Collectibles", value: "collectibles" },
];

export function CommandMenu({ ...props }: DialogProps) {
  const [open, setOpen] = React.useState(false);
  const [term, setTerm] = React.useState("");
  const termRef = React.useRef(""); // Ref to store the latest term
  const navigate = useNavigate();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Enter" && termRef.current.trim() !== "") {
        // Use the latest term from the ref
        console.log("term?", termRef.current);
        navigate(`/search?term=${termRef.current}`);
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setTerm(newTerm);
    termRef.current = newTerm; // Update the ref whenever the input changes
  };

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-56 md:w-96  justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 "
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          onInput={handleInputChange}
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandEmpty>
            <Link to={`/search?term=${term}&minPrice=0&maxPrice=10000`}>
              Search for {term}?
            </Link>
          </CommandEmpty>
          <CommandGroup heading="Suggestions">
            {categories.map((category) => {
              return (
                <Link
                  key={category.value}
                  to={`/search?category=${category.value}&minPrice=0&maxPrice=10000`}
                  onClick={() => setOpen(!open)}
                >
                  <CommandItem key={category.value}>
                    {category.label}
                  </CommandItem>
                </Link>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
