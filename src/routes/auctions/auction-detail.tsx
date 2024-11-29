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

function AuctionDetail() {
  const context = useOutletContext();
  const { user, auction } = context;
  console.log(user);
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
        <h2>${numBids > 0 ? auction?.bids[0]?.amount : auction.startPrice}</h2>
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
              <Link to={`/auctions/${auction.id}/edit`}>
                <Button className="my-4 w-11/12">Edit </Button>
              </Link>
            ) : null}
            {user?.userId === auction.sellerId ? (
              <Button className="w-11/12"> Delete </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
export { AuctionDetail };
