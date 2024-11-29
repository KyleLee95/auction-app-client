import { Button } from "@/components/ui/button";
import { CompleteAuction } from "@/types/auction";
import { Countdown } from "@/components/countdown-timer";
import { Link } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const removeAuctionFromUserWatchlist = async (
  watchlistId: number,
  auctionId: number
) => {
  const res = await fetch(
    `/api/watchlists/${watchlistId}/auction/${auctionId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    console.error(res.statusText);
    return;
  }
  const data = await res.json();
  return data;
};

export function AuctionCard({
  auction,
  showRemoveButton,
  watchlistId,
}: {
  auction: CompleteAuction;
  showRemoveButton?: boolean;
  watchlistId?: number;
}) {
  const queryClient = useQueryClient();

  const removeAuctionMutation = useMutation({
    mutationFn: async () =>
      removeAuctionFromUserWatchlist(watchlistId as number, auction.id),
    mutationKey: ["watchlists"],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["watchlists"] });
    },
  });

  function handleRemoveAuctionFromWatchlist() {
    removeAuctionMutation.mutate();
  }

  return (
    <div className="flex flex-col items-stretch p-4 border rounded-md shadow-sm bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 w-full my-4 gap-4">
      {/* Top Section: Image and Details */}
      <div className="flex flex-col md:flex-row w-full">
        {/* Left Column: Image */}
        <Link
          className="flex-shrink-0 w-full md:w-1/4"
          to={`/auctions/${auction.id}`}
        >
          <img
            src="./150.png"
            alt="Auction item image"
            className="w-full h-auto rounded-md object-cover"
          />
        </Link>
        {/* Middle Column: Auction Details */}
        <div className="flex-1 px-4 py-2">
          <Link to={`/auctions/${auction.id}`}>
            <h2 className="text-lg font-semibold">{auction.title}</h2>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {auction.description}
          </p>
          <p className="text-xl font-bold mt-2">
            $
            {auction?.bids?.length > 0
              ? auction.bids[auction.bids.length - 1].amount
              : auction.startPrice}
            <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
              + ${auction.shippingPrice} shipping
            </span>
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            <Countdown endTime={auction.endTime} />
            {/* TODO: get this information from user service */}
            <span className="text-blue-600 dark:text-blue-400">
              username here
            </span>{" "}
            99.7% (10,248)
          </div>
        </div>

        {/* Right Column: Vertical Button Menu */}
        <div className="flex flex-col items-end space-y-2">
          <Button variant="default" asChild className="w-full">
            <Link to={`/auctions/${auction.id}`}>Place Bid</Link>
          </Button>
          {auction.buyItNowEnabled ? (
            <Button variant="default" asChild className="w-full">
              <Link to={`/auctions/${auction.id}`}> Buy It Now </Link>
            </Button>
          ) : null}
          {showRemoveButton ? (
            <Button
              variant="destructive"
              className="w-full md:w-auto"
              onClick={handleRemoveAuctionFromWatchlist}
            >
              Remove from Watchlist
            </Button>
          ) : null}
        </div>
      </div>
      {/* Footer Section */}
      <div
        id="card-footer"
        className="w-full flex flex-wrap items-center justify-start gap-2 mt-4 pt-4 border-t border-gray-300 dark:border-gray-700"
      >
        <p className="text-lg">Categories:</p>
        {auction.categories.map((categoryObj) => {
          const { category } = categoryObj;
          return (
            <Button key={category.id} variant="default" size="sm" asChild>
              <Link
                to={`/search?categories=${category.value}&minPrice=0&maxPrice=10000`}
              >
                {category.label}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
