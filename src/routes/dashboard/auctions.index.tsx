import { createFileRoute } from "@tanstack/react-router";
import { auctionsQueryOptions } from "../../utils/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Countdown } from "@/components/count-down-timer";
// import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { CompleteAuction } from "@/types/auction";
export const Route = createFileRoute("/dashboard/auctions/")({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(
      auctionsQueryOptions("c1eb0520-90a1-7030-7847-c8ca5bfbe65e")
    );
  },
  component: RouteComponent,
});

export function AuctionCard({ auction }: { auction: CompleteAuction }) {
  return (
    <div className="flex flex-col md:flex-row items-start p-4 border rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full">
      {/* Left Column: Image */}
      <div className="w-full md:w-1/4">
        <img
          src="https://via.placeholder.com/150" // Replace with actual image URL
          alt="Auction item"
          className="w-full h-auto rounded-md object-cover"
        />
      </div>

      {/* Middle Column: Auction Details */}
      <div className="flex-1 px-4 py-2">
        <h2 className="text-lg font-semibold">{auction.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {auction.description}
        </p>
        <p className="text-xl font-bold mt-2">
          $
          {auction?.bids?.length > 0
            ? auction.bids[auction.bids.length - 1].amount
            : auction.startPrice}
          <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
            {" "}
            + ${auction.shippingPrice} shipping
          </span>
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          <Countdown endTime={auction.endTime} />
          {/*TODO: get this information from user service*/}
          <span className="text-blue-600 dark:text-blue-400">
            username here
          </span>{" "}
          99.7% (10,248)
        </div>
      </div>

      {/* Right Column: Vertical Button Menu */}
      <div className="flex flex-col items-end space-y-2">
        <Button variant="default" className="w-full md:w-auto">
          Buy It Now
        </Button>
        <Button variant="outline" className="w-full md:w-auto">
          View Seller's Items
        </Button>
        <Button variant="ghost" className="w-full md:w-auto">
          More Actions
        </Button>
      </div>
    </div>
  );
}

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
