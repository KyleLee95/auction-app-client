import { auctionsQueryOptions } from "../../utils/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

function DashboardAuctionList() {
  const auctionsQuery = useSuspenseQuery(
    auctionsQueryOptions("c1eb0520-90a1-7030-7847-c8ca5bfbe65e")
  );
  const auctions = auctionsQuery.data.auctions;
  if (!auctions) {
    return <div>No auctions found</div>;
  }
  return <div>hello world</div>;
}

export { DashboardAuctionList };
