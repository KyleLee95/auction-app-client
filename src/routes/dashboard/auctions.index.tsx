import { createFileRoute } from "@tanstack/react-router";
import { auctionsQueryOptions } from "../../utils/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AuctionCard } from "@/components/dashboard-auction-card";
import { CompleteAuction } from "@/types/auction";
export const Route = createFileRoute("/dashboard/auctions/")({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(
      auctionsQueryOptions("c1eb0520-90a1-7030-7847-c8ca5bfbe65e")
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const auctionsQuery = useSuspenseQuery(
    auctionsQueryOptions("c1eb0520-90a1-7030-7847-c8ca5bfbe65e")
  );
  const auctions = auctionsQuery.data.auctions;
  if (!auctions) {
    return <div>No auctions found</div>;
  }
  return (
    <div className="mx-2">
      {auctions.map((auction: CompleteAuction) => {
        return <AuctionCard auction={auction} key={auction.id} />;
      })}
    </div>
  );
}
