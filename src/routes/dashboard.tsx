import { Outlet, createFileRoute } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";
import { Authenticator } from "@aws-amplify/ui-react";
export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Authenticator>
      <div className="flex flex-row flex-wrap mx-auto h-full min-h-72">
        <div className="flex-none w-22 bg-red-200">
          <NavigationMenu orientation="vertical">
            <NavigationMenuList className="flex-col items-start justify-center space-x-0">
              <NavigationMenuItem className="my-0.5">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  <Link to="/dashboard/auctions">Auctions</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem className="my-0.5">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  <Link to="/dashboard">Sell</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem className="my-0.5">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  <Link to="/dashboard/watchlists">Watchlist</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex-1 bg-sky-200">
          <Outlet />
        </div>
      </div>
    </Authenticator>
  );
}
