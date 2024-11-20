import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RootLayout } from "./routes/root-layout";

import { DashboardPage } from "@/routes/dashboard/dashboard-page";
import { DashboardAuctionList } from "@/routes/dashboard/dashboard-auction-list";
import { DashboardSellList } from "@/routes/dashboard/dashboard-sell-list";
import { DashboardWatchlistList } from "@/routes/dashboard/dashboard-watchlists-list";

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
          <Route path="auctions/" element={<DashboardAuctionList />} />
          <Route path="sell/" element={<DashboardSellList />} />
          <Route path="watchlists/" element={<DashboardWatchlistList />} />
        </Route>

        <Route
          path="auctions"
          element={<div className="bg-slate-500">auctionId layout</div>}
        />
        <Route path="/auctions/:auctionId" element={<>auctionId</>} />
        <Route path="/auctions/:auctionId/edit" element={<>auctionId/edit</>} />

        <Route path="search" element={<SearchPage />} />
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
