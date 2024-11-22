import React from "react";
import { useOutletContext } from "react-router-dom";
import { AuctionCard } from "@/components";
import { type IBidModelWithAuction } from "@/types";
function DashboardBidOnList() {
  const { bidOnAuctions } = useOutletContext();

  return (
    <div className="flex-col text-black">
      {bidOnAuctions.map((bid: IBidModelWithAuction) => {
        return <AuctionCard key={bid.id} auction={bid.auction} />;
      })}
    </div>
  );
}

export { DashboardBidOnList };
