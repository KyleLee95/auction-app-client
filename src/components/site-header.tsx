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
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthenticator } from "@aws-amplify/ui-react";
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
ListItem.labelvalue = "ListItem";

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

const searchAuctions = async (term: string) => {
  const res = await fetch(
    `/api/auctions/search?term=${term}&minPrice=0&maxPrice=1000`
  );
  const data = await res.json();
  return data;
};

function SiteHeader({ className }: Props) {
  const admins = [
    "018b7510-60b1-702a-0011-b3ce89d869df",
    "01cb6540-a0b1-70f8-cbb0-a492f1047990",
    "c1bba5c0-b001-7085-7a2e-e74d5399c3d1",
    "21cb2500-e001-7080-8d8a-5056bbfa6494",
  ];
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
  const { user } = useAuthenticator();

  interface Category {
    label: string;
    value: string;
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
              <Link to="/cart">
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

            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link to="/user">User profile</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* TODO */}
            {/* ONLY DO IF THE USER IS AN ADMIN */}
            {admins.includes(user.username) ? (
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  <Link to="/adminPanel">ADMIN panel</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ) : null}

            {categories.map((category: Category) => {
              return (
                <NavigationMenuItem key={category.value}>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <Link
                      to={`/search?categories=${category.value}&order=asc&minPrice=0&maxPrice=10000`}
                    >
                      {category.label}
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
