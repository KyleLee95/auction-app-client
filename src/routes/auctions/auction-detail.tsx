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
import { AuthUser } from "aws-amplify/auth";
import {
  addAuctionToUserWatchlist,
  removeAuctionFromUserWatchlist,
} from "@/utils/watchlists";
import { addItemToCart } from "@/utils/cartlist";
import { flagAuction } from "@/utils/auctions";

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

const AuctionButtonGroup = ({
  numBids,
  auction,
  user,
  minBidAmount,
  isOnWatchlist,
}: {
  numBids: number;
  auction: CompleteAuction;
  user: AuthUser;
  minBidAmount: number;
  isOnWatchlist: boolean;
}) => {
  const isAuctionSeller = user?.userId === auction.sellerId;
  const queryClient = useQueryClient();
  const removeAuctionFromWatchlistMutation = useMutation({
    mutationFn: () => removeAuctionFromUserWatchlist(user.userId, auction.id),
    mutationKey: ["isOnWatchlist", auction?.id?.toString()],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["isOnWatchlist", auction.id?.toString()],
      });
    },
  });

  function handleRemoveAuctionFromWatchlist() {
    removeAuctionFromWatchlistMutation.mutate();
  }

  const addAuctionToWatchlistMutation = useMutation({
    mutationFn: () => addAuctionToUserWatchlist(user.userId, auction.id),
    mutationKey: ["isOnWatchlist", auction?.id?.toString()],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["isOnWatchlist", auction?.id?.toString()],
      });
    },
  });

  function handleAddAuctionToUserWatchlist() {
    addAuctionToWatchlistMutation.mutate();
  }

  const flagAuctionMutation = useMutation({
    mutationFn: (payload: any) => flagAuction(auction.id as number, payload),
    mutationKey: ["auctions", auction?.id?.toString()],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["auctions", auction?.id?.toString()],
      });
    },
  });

  function handleFlagAuction() {
    flagAuctionMutation.mutate({ isFlagged: !auction.flagged });
  }

  return (
    <div id="user-action-group" className="my-4">
      <QuantitySelect auction={auction} />
      <div id="btn-group" className="my-4">
        {auction.buyItNowEnabled ? (
          <Button
            className="my-4 w-11/12"
            onClick={async () => {
              const userId = user?.userId || "";
              const success = await addItemToCart(userId, auction);
              if (success) {
                // Display success message
                const successMessage = document.createElement("div");
                successMessage.textContent = "Add to cart successfully";
                successMessage.className =
                  "fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded";
                document.body.appendChild(successMessage);
                setTimeout(() => {
                  document.body.removeChild(successMessage);
                }, 3000);
              }
            }}
          >
            Add to Cart
          </Button>
        ) : null}

        <BidModal
          user={user}
          auctionId={auction.id as number}
          minBidAmount={minBidAmount}
        />
        <Button
          type="button"
          className="my-4 w-11/12"
          variant={isOnWatchlist ? "destructive" : "default"}
          onClick={
            isOnWatchlist
              ? handleRemoveAuctionFromWatchlist
              : handleAddAuctionToUserWatchlist
          }
        >
          {isOnWatchlist ? "Remove from Watchlist" : "Add To Watchlist"}
        </Button>
        <Button
          type="button"
          variant={auction.flagged ? "destructive" : "default"}
          className="mb-2 w-11/12"
          onClick={handleFlagAuction}
        >
          {auction.flagged ? "Flag Auction" : "Unflag Auction"}
        </Button>

        {isAuctionSeller ? (
          <>
            <Link to={`/auctions/${auction.id}/edit`}>
              <Button variant="secondary" className="my-2 w-11/12">
                Edit{" "}
              </Button>
            </Link>
            <Button
              className="w-11/12"
              variant="destructive"
              disabled={numBids > 0}
            >
              Delete
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
};

function AuctionDetail() {
  const {
    user,
    auction,
    isOnWatchlist,
  }: { user: AuthUser; auction: CompleteAuction; isOnWatchlist: boolean } =
    useOutletContext();
  const numBids = auction.bids.length;
  const minBidAmount =
    numBids > 0 ? auction.bids[0].amount : auction.startPrice;

  return (
    <div className="flex flex-wrap mt-10">
      <ImageCarousel images={images} />
      <div
        id="auction-info-container"
        className="mt-4 lg:ml-20 w-full lg:w-1/2"
      >
        <h1 className="text-xl">{auction.title}</h1>
        <h2>
          ${numBids > 0 ? minBidAmount : auction.startPrice} + $
          {auction.shippingPrice} shipping
        </h2>

        <span>{numBids} bids</span>

        {auction.isActive ? (
          <Countdown endTime={auction.endTime} isActive={auction.isActive} />
        ) : (
          <Countdown endTime={auction.startTime} isActive={auction.isActive} />
        )}
        <p className="my-4">{auction.description}</p>

        <AuctionButtonGroup
          numBids={numBids}
          minBidAmount={minBidAmount}
          auction={auction}
          isOnWatchlist={isOnWatchlist}
          user={user}
        />
      </div>
    </div>
  );
}
export { AuctionDetail };
