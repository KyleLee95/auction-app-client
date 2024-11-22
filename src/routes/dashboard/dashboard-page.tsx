import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserAuctions } from "@/utils/auctions";
import { Outlet, Link, OutletProps } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { type CompleteAuction } from "@/types";
import { type CompleteBid } from "@/types";
import { AuthUser } from "aws-amplify/auth";

export interface DashboardOutletProps extends OutletProps {
  auctions: CompleteAuction[];
  bidOnAuctions: CompleteBid[];
  user: AuthUser;
}

function DashboardPage() {
  const { user } = useAuthenticator();
  const { isLoading, error, data } = useQuery({
    queryKey: ["auctions", user.userId],
    queryFn: () => fetchUserAuctions(user.userId),
  });

  if (isLoading) {
    return "Loading...";
  }
  if (error) {
    return "Error";
  }

  const { auctions, bidOnAuctions } = data; //data is valid here since it pass all of the other checks
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
                  <Link to="/dashboard/sell">Sell</Link>
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
          <Outlet context={{ auctions, bidOnAuctions, user }} />
        </div>
      </div>
    </Authenticator>
  );
}
export { DashboardPage };
