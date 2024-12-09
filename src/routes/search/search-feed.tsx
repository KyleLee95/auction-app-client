import { useOutletContext } from "react-router-dom";
import { CompleteAuction } from "@/types/auction";

import { AuctionCard } from "@/components/auction-card";

function SearchPageResultsFeed() {
  const { user, watchlistId, auctions } = useOutletContext();

  if (auctions?.length === 0) {
    return <div className="flex-col">No Auctions Found!</div>;
  }
  return (
    <div className="flex-col">
      {auctions.map((auction: CompleteAuction) => {
        return (
          <AuctionCard
            user={user}
            watchlistId={watchlistId}
            showRemoveButton={false}
            key={auction.id}
            auction={auction}
          />
        );
      })}
    </div>
  );
}

export { SearchPageResultsFeed };
