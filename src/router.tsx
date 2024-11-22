import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RootLayout } from "./routes/root-layout";

import { DashboardPage } from "@/routes/dashboard/dashboard-page";
import { DashboardAuctionList } from "@/routes/dashboard/dashboard-auction-list";
import { DashboardBidOnList } from "@/routes/dashboard/dashboard-bidon-list";
import { DashboardWatchlistList } from "@/routes/dashboard/dashboard-watchlists-list";

import { AuctionPage } from "@/routes/auctions/auction-page";
import { AuctionDetail } from "@/routes/auctions/auction-detail";
import { AuctionEdit } from "@/routes/auctions/auction-edit";
import { AuctionCreate } from "@/routes/auctions/auction-create";
import { SearchPage } from "@/routes/search/search-page";
import { SearchPageResultsFeed } from "@/routes/search/search-feed";

import { ErrorPage } from "@/routes/error-page";
import { Index } from "@/routes/index";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<Index />} />
      <Route errorElement={<ErrorPage />}>
        <Route path="dashboard" element={<DashboardPage />}>
          <Route path="my-auctions/" element={<DashboardAuctionList />} />
          <Route path="bid-on/" element={<DashboardBidOnList />} />
          <Route path="watchlists/" element={<DashboardWatchlistList />} />
        </Route>

        <Route path="auctions/" element={<AuctionPage />}>
          <Route path="/auctions/:auctionId" element={<AuctionDetail />} />
          <Route path="/auctions/:auctionId/edit" element={<AuctionEdit />} />
        </Route>

        <Route path="/create" element={<AuctionCreate />} />

        <Route path="/search" element={<SearchPage />}>
          <Route path="" element={<SearchPageResultsFeed />} />
        </Route>
      </Route>
    </Route>
  ),
  {
    future: {
      v7_fetcherPersist: true,
    },
  }
);
export { router };
