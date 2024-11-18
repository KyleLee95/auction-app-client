import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { auctionQueryOptions } from "../../utils/queryOptions";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";

interface CountdownProps {
  endTime: string; // ISO datetime string
}

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

export function CarouselOrientation() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full max-w-xs"
    >
      <CarouselContent className="-mt-1 h-[200px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function CarouselDemo() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function RouteComponent() {
  const params = Route.useParams();
  const auctionQuery = useSuspenseQuery(auctionQueryOptions(params.auctionId));
  console.log(auctionQuery);
  const auction = auctionQuery.data.auctions[0];

  if (!auction) {
    return "Loading...";
  }

  return (
    <div className="flex flex-wrap">
      <div className="flex-none bg-red-500">
        <CarouselDemo />
      </div>
      <div className="flex-grow bg-slate-500 md:ml-20">
        <div className="ml-4">
          <h1 className="text-xl">{auction.title}</h1>

          <h2>
            $
            {auction?.bids?.length
              ? auction.bids[auction.bids.length - 1].amount
              : auction.startPrice}
          </h2>
          <Countdown endTime={auction.endTime} />

          {auction.buyItNowEnabled ? <Button>Add to Cart</Button> : null}
          <form
            className="flex flex-col max-w-sm"
            onSubmit={() => console.log("submit bid logic")}
          >
            <Input placeholder="Enter your bid amount here" />
            <Button className="mt-4" type="submit">
              Bid
            </Button>
          </form>
          <p className="mt-4">{auction.description}</p>
        </div>
      </div>
    </div>
  );
}
