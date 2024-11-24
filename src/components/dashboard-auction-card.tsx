import { Button } from "@/components/ui/button";
import { CompleteAuction } from "@/types/auction";
import { Countdown } from "@/components/countdown-timer";
import { Link } from "react-router-dom";
export function AuctionCard({ auction }: { auction: CompleteAuction }) {
  return (
    <div className="flex flex-col md:flex-row items-start p-4 border rounded-md shadow-sm bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 w-full my-4">
      {/* Left Column: Image */}
      <Link className="w-full md:w-1/4" to={`/auctions/${auction.id}`}>
        <div>
          <img
            src="https://via.placeholder.com/150" // Replace with actual image URL
            alt="Auction item"
            className="w-full h-auto rounded-md object-cover"
          />
        </div>
      </Link>

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
