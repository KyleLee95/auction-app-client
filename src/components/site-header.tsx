import React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { CommandMenu } from "@/components/ui/command-menu";
import { MobileNav } from "@/components/mobile-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to="/"
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

function HeaderMenuList() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
        Category
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <a
                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                href="/"
              >
                <Icons.logo className="h-6 w-6" />
                <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                <p className="text-sm leading-tight text-muted-foreground">
                  Beautifully designed components that you can copy and paste
                  into your apps. Accessible. Customizable. Open Source.
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          <ListItem href="/docs" title="Introduction">
            Re-usable components built using Radix UI and Tailwind CSS.
          </ListItem>
          <ListItem href="/docs/installation" title="Installation">
            How to install dependencies and structure your app.
          </ListItem>
          <ListItem href="/docs/primitives/typography" title="Typography">
            Styles for headings, paragraphs, lists...etc
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

type Props = { className?: string };

function SiteHeader({ className }: Props) {
  const categories = [
    { display: "Autos", name: "autos" },
    {
      display: "Clothing, Shoes & Accessories",
      name: "clothing-shoes-accessories",
    },
    { display: "Electronics", name: "electronics" },
    { display: "Sporting Goods", name: "sporting-goods" },
    { display: "Jewely & Watches", name: "jewelry-watches" },
    { display: "Collectibles", name: "collectibles" },
  ];

  interface Category {
    display: string;
    name: string;
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="flex h-14 items-center px-4 justify-center">
        {/*main/mobile nav items*/}

        <MobileNav />
        <div className="flex items-center gap-2 justify-center">
          <Link to="/">
            <div className="hidden md:flex w-16 mr-4">
              <img src="/logoipsum-332.svg" />
            </div>
          </Link>

          <div className="flex-1 w-full max-w-full">
            <CommandMenu />
          </div>

          <nav className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon" className="h-8  px-0">
              <Link to="/">
                <Icons.cart className="h-4 w-4" />
                <span className="sr-only">cart</span>
              </Link>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </div>

      {/*Secondary Bar*/}
      <div className="hidden justify-center md:flex h-14 items-center px-4">
        <NavigationMenu className={cn("", className)}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link to="/dashboard/my-auctions">Dashboard</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link to="/create">Create an Auction</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {categories.map((category: Category) => {
              return (
                <NavigationMenuItem key={category.name}>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <Link to={`/search?category=${category.name}`}>
                      {category.display}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}

            {/*<HeaderMenuList />
            <HeaderMenuList />
            <HeaderMenuList />
            <HeaderMenuList />*/}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}

export { SiteHeader };
