import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useQueries } from "@tanstack/react-query";
import { fetchUserAuctions } from "@/utils/auctions";
import { Outlet, Link, OutletProps } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { type CompleteAuction } from "@/types/auction";
import { type CompleteBid } from "@/types/bid";
import { AuthUser } from "aws-amplify/auth";
import { fetchUserWatchlists } from "@/utils/watchlists";
import { fetchUserMetrics } from "@/utils/metrics";

export interface DashboardOutletProps extends OutletProps {
  auctions: CompleteAuction[];
  bidOnAuctions: CompleteBid[];
  user: AuthUser;
}

function DashboardPage() {
  const { user } = useAuthenticator();

  const queryResults = useQueries({
    queries: [
      {
        queryKey: ["auctions", user.userId],
        queryFn: () => fetchUserAuctions(user.userId, true),
      },
      {
        queryKey: ["watchlists", user.userId],
        queryFn: () => fetchUserWatchlists(user.userId),
      },
      {
        queryKey: ["metrics", user.userId],
        queryFn: () => fetchUserMetrics(user.userId),
      }  
    ],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        loading: results.map((result) => result.isLoading),
        error: results.map((result) => result.isError),
      };
    },
  });

  const isError = queryResults.error.some((result) => result === true);
  const isLoading = queryResults.loading.some((result) => result === true);

  if (isLoading) {
    return "Loading...";
  }
  if (isError) {
    return "Error";
  }
  const auctions = queryResults.data[0].auctions;
  const bidOnAuctions = queryResults.data[0].bidOnAuctions;
  const watchlists = queryResults.data[1].watchlists;

  return (
    <Authenticator>
      <div className="flex flex-row flex-wrap mx-auto h-full min-h-72 w-full max-w-screen-lg">
        <div className="flex-none w-22 border rounded border-gray-800">
          <NavigationMenu orientation="vertical">
            <NavigationMenuList className="flex-col items-start justify-center space-x-0">
              <NavigationMenuItem className="my-1">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  <Link to="/dashboard/my-auctions">My Auctions</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem className="my-1">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  <Link to="/dashboard/bid-on">My Bids</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem className="my-1">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  <Link to="/dashboard/watchlists">Watchlists</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex-1 border rounded border-gray-800 h-screen">
          <Outlet context={{ auctions, bidOnAuctions, user, watchlists }} />
        </div>
      </div>
    </Authenticator>
  );
}
export { DashboardPage };
