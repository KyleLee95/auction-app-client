import { useQuery } from "@tanstack/react-query";
import { fetchUserAuctions } from "@/utils/auctions";
import { useAuthenticator } from "@aws-amplify/ui-react";
function DashboardAuctionList() {
  const { user } = useAuthenticator();

  const { isLoading, error, data } = useQuery({
    queryKey: ["auctions", user.userId],
    queryFn: () => fetchUserAuctions(user.userId),
  });

  console.log("isLoading", isLoading);
  console.log("error", error);
  console.log("data", data);

  if (isLoading) {
    return "Loading...";
  }
  if (error) {
    return "Error";
  }

  //data is valid here since it pass all of the other checks

  const { auctions, bidOnAuctions } = data;
  if (!auctions?.length) {
    return "No Auctions";
  }

  return auctions?.map((auction) => {
    return <div key={auction.id}>{auction.title}</div>;
  });
}

export { DashboardAuctionList };
