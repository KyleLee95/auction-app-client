import { useOutletContext } from "react-router-dom";
import { CompleteAuction } from "@/types/auction";

import { AuctionCard } from "@/components";

function SearchPageResultsFeed() {
  const { auctions } = useOutletContext();

  return (
    <div className="flex-col">
      {auctions.map((auction: CompleteAuction) => {
        return <AuctionCard key={auction.id} auction={auction} />;
      })}
    </div>
  );
}

export { SearchPageResultsFeed };
