import React, { useState, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { auctionQueryOptions } from "../../utils/queryOptions";
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
import { CompleteAuction } from "@/types/auction";
interface CountdownProps {
  endTime: string; // ISO datetime string
}

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

const Countdown: React.FC<CountdownProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const end = new Date(endTime);
      const difference = end.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft("Auction ended");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const intervalId = setInterval(updateCountdown, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [endTime]);

  return (
    <div>
      <h2 className="text-xl">Time Left:</h2>
      <p className="font-bold">{timeLeft}</p>
    </div>
  );
};

export default Countdown;

export const Route = createFileRoute("/auctions/$auctionId/")({
  loader: (opts) => {
    opts.context.queryClient.ensureQueryData(
      auctionQueryOptions(opts.params.auctionId)
    );
  },
  component: RouteComponent,
});

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
function RouteComponent() {
  const params = Route.useParams();
  const auctionQuery = useSuspenseQuery(auctionQueryOptions(params.auctionId));
  const auction = auctionQuery.data.auctions[0];

  const { user } = useAuthenticator();

  console.log("user", user);
  if (!auction) {
    return "Loading...";
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
          $
          {auction?.bids?.length
            ? auction.bids[auction.bids.length - 1].amount
            : auction.startPrice}
        </h2>

        <Countdown endTime={auction.endTime} />

        <p className="mt-4">{auction.description}</p>
        <div id="btn-group" className="mt-4">
          <QuantitySelect auction={auction} />
          {auction.buyItNowEnabled ? (
            <Button className="my-4 w-11/12">Add to Cart</Button>
          ) : null}
          <BidModal />

          {user?.userId === auction.sellerId ? (
            <Button className="my-4 w-11/12"> Edit </Button>
          ) : null}
          {user?.userId === auction.sellerId ? (
            <Button className="w-11/12"> Delete </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
