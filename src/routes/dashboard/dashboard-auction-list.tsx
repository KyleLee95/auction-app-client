import { useOutletContext } from "react-router-dom";
import { type DashboardOutletProps } from "./dashboard-page";
import { AuctionCard } from "@/components/dashboard-auction-card";
function DashboardAuctionList() {
  const { auctions } = useOutletContext<DashboardOutletProps>();

  return (
    <div className="flex-col text-black">
      {auctions.map((auction) => {
        return <AuctionCard key={auction.id} auction={auction} />;
      })}
    </div>
  );
}

export { DashboardAuctionList };
