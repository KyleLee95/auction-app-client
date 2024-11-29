import { useOutletContext } from "react-router-dom";
import { AuctionCard } from "@/components/auction-card";
import { Button } from "@/components/ui/button";
import { CompleteAuctionsOnWatchLists } from "@/types/auctionsonwatchlists";
import { CompleteWatchList } from "@/types/watchlist";
import { CompleteCategoriesOnWatchLists } from "@/types/categoriesonwatchlists";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Link } from "react-router-dom";
function DashboardWatchlistList() {
  const { watchlists }: { watchlists: CompleteWatchList[] } =
    useOutletContext();
  const userWatchlist = watchlists[0];
  const {
    auctions,
    categories,
  }: {
    auctions: CompleteAuctionsOnWatchLists[];
    categories: CompleteCategoriesOnWatchLists[];
  } = userWatchlist;
  return (
    <div className="mx-4">
      <h2 className="font-bold text-xl"> {userWatchlist.name} </h2>
      <h3 className="font-bold text-lg"> Categories and Filters</h3>
      <ToggleGroup variant="outline" type="multiple">
        {categories.map(({ category }) => {
          return (
            <ToggleGroupItem key={category.id} value={category.value}>
              {category.label}
            </ToggleGroupItem>
          );
        })}
        <ToggleGroupItem value="maxPrice">
          {" "}
          Max Price: ${userWatchlist.maxPrice}
        </ToggleGroupItem>
      </ToggleGroup>

      <Button asChild>
        <Link to={`/watchlist/${userWatchlist.id}/edit`}>Edit</Link>
      </Button>

      <div className="flex-col">
        {auctions.map((auctionObj: CompleteAuctionsOnWatchLists) => {
          const { auction } = auctionObj;
          return (
            <AuctionCard showRemoveButton key={auction.id} auction={auction} />
          );
        })}
      </div>
    </div>
  );
}
export { DashboardWatchlistList };
