import { useOutletContext } from "react-router-dom";
import { CompleteAuction } from "@/types/auction";

import { AuctionCard } from "@/components/dashboard-auction-card";

function SearchPageResultsFeed() {
  const { auctions } = useOutletContext();

  if (auctions?.length === 0) {
    return <div className="flex-col">No Auctions Found!</div>;
  }
  return (
    <div className="flex-col">
      {auctions.map((auction: CompleteAuction) => {
        return <AuctionCard key={auction.id} auction={auction} />;
      })}
    </div>
  );
}

export { SearchPageResultsFeed };
