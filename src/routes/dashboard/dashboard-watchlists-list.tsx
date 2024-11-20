import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchUserWatchlists } from "@/utils/watchlists";
import { useQuery } from "@tanstack/react-query";
function DashboardWatchlistList() {
  const { user } = useAuthenticator();

  const { isLoading, error, data } = useQuery({
    queryKey: ["auctions", user, user.userId],
    queryFn: () => fetchUserWatchlists(user.userId),
  });

  if (isLoading) {
    return "Loading...";
  }
  if (error) {
    return "Error";
  }

  const { watchlists } = data;
  if (!watchlists?.length) {
    return "No Watchlists";
  }

  return watchlists?.map((list) => {
    return <div key={list.id}>{list.name}</div>;
  });
}
export { DashboardWatchlistList };
