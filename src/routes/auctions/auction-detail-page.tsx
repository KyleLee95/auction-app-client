import { Outlet } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAuctionById } from "@/utils/auctions";

function AuctionPage() {
  const { auctionId } = useParams();
  const { user } = useAuthenticator();
  const { isLoading, error, data } = useQuery({
    queryKey: ["auctions", auctionId],
    queryFn: async () => fetchAuctionById(auctionId || ""),
  });
  if (isLoading) {
    return "Loading...";
  }
  if (error) {
    return error.message;
  }
  const auction = data?.auctions[0] || {};
  return <Outlet context={{ auction, user }} />;
}

export { AuctionPage };
