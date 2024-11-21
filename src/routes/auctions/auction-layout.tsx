import { Outlet } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAuctionById } from "@/utils/auctions";
import { CompleteAuction } from "@/types/auction";
function AuctionPageLayout() {
  const { auctionId } = useParams();
  const { user } = useAuthenticator();
  const { isLoading, error, data } = useQuery({
    queryKey: ["auctions", auctionId],
    queryFn: async () => fetchAuctionById(auctionId),
  });
  if (isLoading) {
    return "Loading...";
  }
  if (error) {
    return error.message;
  }
  console.log("data", data);
  // const { auctions } = data;
  // const auction = auctions[0];
  //
  // if (!auction) {
  //   return "Loading...";
  // }
  return "";
  // return <Outlet context={{ auction: auction, user }} />;
}

export { AuctionPageLayout };
