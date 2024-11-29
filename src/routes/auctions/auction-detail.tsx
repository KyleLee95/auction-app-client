import { Link, useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImageCarousel } from "@/components/image-carousel";
import { BidModal } from "@/components/bid-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { CompleteAuction } from "@/types/auction";
import { Countdown } from "@/components/countdown-timer";

const QuantitySelect = ({ auction }: { auction: CompleteAuction }) => {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a quantity" />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: auction.quantity }, (_, i) => i + 1).map(
          (num) => {
            return (
              <SelectItem key={num} value={String(num)}>
                {num}
              </SelectItem>
            );
          }
        )}
      </SelectContent>
    </Select>
  );
};

const images = [
  {
    id: 1,
    src: "https://i.ebayimg.com/images/g/d2UAAOSwuydmWSOT/s-l1600.jpg",
    alt: "test",
  },

  {
    id: 2,
    src: "https://i.ebayimg.com/images/g/rZ0AAOSw6HdmWSOT/s-l1600.jpg",
    alt: "test",
  },
];

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

const addAuctionToUserWatchlist = async (userId: string, auctionId: number) => {
  const res = await fetch(
    `/api/watchlists/addAuction?userId=${userId}&auctionId=${auctionId}`,
    {
      method: "POST",
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

function AuctionDetail() {
  const { user, auction } = useOutletContext();
  const numBids = auction.bids.length;
  const minBidAmount =
    numBids > 0 ? auction.bids[0].amount : auction.startPrice;

  const queryClient = useQueryClient();

  const removeAuctionFromUserMutation = useMutation({
    mutationFn: async () =>
      await removeAuctionFromUserWatchlist(auction.id as number),
    mutationKey: ["auctionsOnWatchlists"],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["auctionsOnWatchlists"] });
    },
  });

  function handleRemoveAuctionFromWatchlist() {
    removeAuctionFromUserMutation.mutate();
  }

  const addAuctionToUserWatchlistMutation = useMutation({
    mutationFn: async () =>
      await addAuctionToUserWatchlist(user.userId, auction.id as number),
    mutationKey: ["auctionsONWatchlists"],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["auctionsOnWatchlists"] });
    },
  });

  function handleAddAuctionToUserWatchlist() {
    console.log("?");
    addAuctionToUserWatchlistMutation.mutate();
  }

  return (
    <div className="flex flex-wrap mt-10">
      <ImageCarousel images={images} />
      <div
        id="auction-info-container"
        className="mt-4 lg:ml-20 w-full lg:w-1/2"
      >
        <h1 className="text-xl">{auction.title}</h1>
        <h2>
          ${numBids > 0 ? auction?.bids[0]?.amount : auction.startPrice} + $
          {auction.shippingPrice} shipping
        </h2>
        <span>{numBids} bids</span>
        <Countdown endTime={auction.endTime} />
        <p className="my-4">{auction.description}</p>
        <div id="user-action-group" className="my-4">
          <QuantitySelect auction={auction} />
          <div id="btn-group" className="my-4">
            {auction.buyItNowEnabled ? (
              <Button className="my-4 w-11/12">Add to Cart</Button>
            ) : null}

            <BidModal
              user={user}
              auctionId={auction.id}
              minBidAmount={minBidAmount}
            />

            {user?.userId === auction.sellerId ? (
              <>
                <Link to={`/auctions/${auction.id}/edit`}>
                  <Button className="my-4 w-11/12">Edit </Button>
                </Link>
                <Button className="w-11/12" disabled={numBids > 0}>
                  {" "}
                  Delete{" "}
                </Button>
              </>
            ) : null}

            <Button
              type="button"
              onClick={() => {
                console.log("click?");
              }}
            >
              Add To Watchlist
            </Button>

            <Button
              type="button"
              variant="destructive"
              className="w-full md:w-auto"
              onClick={() => {
                console.log("click?");
              }}
            >
              Remove from Watchlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export { AuctionDetail };
