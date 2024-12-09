import { useOutletContext } from "react-router-dom";
import { AuctionCard } from "@/components/auction-card";
import { CompleteBid } from "@/types/bid";
function DashboardBidOnList() {
  const { bidOnAuctions, user } = useOutletContext();

  return (
    <div className="flex-col text-black">
      {bidOnAuctions.map((bid: CompleteBid) => {
        return (
          <AuctionCard
            showRemoveButton={false}
            key={bid.id}
            auction={bid.auction}
            user={user}
          />
        );
      })}
    </div>
  );
}

export { DashboardBidOnList };
