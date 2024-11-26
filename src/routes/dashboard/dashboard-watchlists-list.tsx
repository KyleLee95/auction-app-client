import React from "react";
import { useOutletContext } from "react-router-dom";
import { AuctionCard } from "@/components/dashboard-auction-card";
import { Button } from "@/components/ui";
import {
  CompleteAuctionsOnWatchLists,
  CompleteWatchList,
  CompleteCategoriesOnWatchLists,
} from "@/types";
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
      <div className="flex-row justify-around w-full">
        <h3 className="font-bold text-lg">Categories:</h3>
        {categories.map((categoryObj) => {
          const { category } = categoryObj;
          return (
            <Button
              className="mx-2"
              key={category.id}
              onClick={() => {
                //TODO: filter by category
              }}
            >
              {category.label}
            </Button>
          );
        })}
      </div>

      <div className="flex-col">
        {auctions.map((auctionObj: CompleteAuctionsOnWatchLists) => {
          const { auction } = auctionObj;
          return <AuctionCard key={auction.id} auction={auction} />;
        })}
      </div>
    </div>
  );
}
export { DashboardWatchlistList };
