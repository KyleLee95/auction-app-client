import {
  Outlet,
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";

import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { DashboardPage } from "@/routes/dashboard/dashboard-page";
import { DashboardAuctionList } from "@/routes/dashboard/dashboard-auction-list";
import { DashboardSellList } from "@/routes/dashboard/dashboard-sell-list";
import { DashboardWatchlistList } from "@/routes/dashboard/dashboard-watchlists-list";

import { SearchPage } from "@/routes/search/search-page";
import { SearchPageResultsFeed } from "@/routes/search/search-feed";

import { SiteHeader } from "@/components/site-header";
import { ErrorPage } from "@/routes/error-page";
import { Index } from "@/routes/index";

const RootLayout = () => {
  return (
    <>
      <SiteHeader />
      {/* Content */}
      <main className="flex flex-wrap pb-2 lg:px-2">
        <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </div>
      </main>
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </>
  );
};

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

function App() {
  return (
    <RouterProvider
      future={{
        v7_startTransition: true,
      }}
      router={router}
    />
  );
}

export { App };
