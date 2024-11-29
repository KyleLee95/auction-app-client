import { useOutletContext } from "react-router-dom";
import { AuctionCard } from "@/components/dashboard-auction-card";
import { IBidModelWithAuction } from "@/types/bid";
function DashboardBidOnList() {
  const { bidOnAuctions } = useOutletContext();

  return (
    <div className="flex-col text-black">
      {bidOnAuctions.map((bid: IBidModelWithAuction) => {
        console.log(bid.auction);
        return <AuctionCard key={bid.id} auction={bid.auction} />;
      })}
    </div>
  );
}

export { DashboardBidOnList };
