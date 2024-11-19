import { createFileRoute } from "@tanstack/react-router";
import { AuctionCard } from "@/components/dashboard-auction-card";
import { CompleteAuction } from "@/types/auction";

export const Route = createFileRoute("/dashboard/auctions/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-2">
      auctions?
      {/*auctions.map((auction: CompleteAuction) => {
        return <AuctionCard auction={auction} key={auction.id} />;
      })*/}
    </div>
  );
}
