/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as DashboardIndexImport } from './routes/dashboard/index'
import { Route as WatchlistsWatchlistIdImport } from './routes/watchlists/$watchlistId'
import { Route as DashboardWatchlistsImport } from './routes/dashboard/watchlists'
import { Route as DashboardSummaryImport } from './routes/dashboard/summary'
import { Route as DashboardSellImport } from './routes/dashboard/sell'
import { Route as DashboardAuctionsImport } from './routes/dashboard/auctions'
import { Route as AuctionsAuctionIdImport } from './routes/auctions/$auctionId'
import { Route as DashboardWatchlistsIndexImport } from './routes/dashboard/watchlists.index'
import { Route as DashboardAuctionsIndexImport } from './routes/dashboard/auctions.index'
import { Route as AuctionsAuctionIdIndexImport } from './routes/auctions/$auctionId.index'
import { Route as AuctionsAuctionIdEditImport } from './routes/auctions/$auctionId.edit'

// Create/Update Routes

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardIndexRoute = DashboardIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DashboardRoute,
} as any)

const WatchlistsWatchlistIdRoute = WatchlistsWatchlistIdImport.update({
  id: '/watchlists/$watchlistId',
  path: '/watchlists/$watchlistId',
  getParentRoute: () => rootRoute,
} as any)

const DashboardWatchlistsRoute = DashboardWatchlistsImport.update({
  id: '/watchlists',
  path: '/watchlists',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardSummaryRoute = DashboardSummaryImport.update({
  id: '/summary',
  path: '/summary',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardSellRoute = DashboardSellImport.update({
  id: '/sell',
  path: '/sell',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardAuctionsRoute = DashboardAuctionsImport.update({
  id: '/auctions',
  path: '/auctions',
  getParentRoute: () => DashboardRoute,
} as any)

const AuctionsAuctionIdRoute = AuctionsAuctionIdImport.update({
  id: '/auctions/$auctionId',
  path: '/auctions/$auctionId',
  getParentRoute: () => rootRoute,
} as any)

const DashboardWatchlistsIndexRoute = DashboardWatchlistsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DashboardWatchlistsRoute,
} as any)

const DashboardAuctionsIndexRoute = DashboardAuctionsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DashboardAuctionsRoute,
} as any)

const AuctionsAuctionIdIndexRoute = AuctionsAuctionIdIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuctionsAuctionIdRoute,
} as any)

const AuctionsAuctionIdEditRoute = AuctionsAuctionIdEditImport.update({
  id: '/edit',
  path: '/edit',
  getParentRoute: () => AuctionsAuctionIdRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/auctions/$auctionId': {
      id: '/auctions/$auctionId'
      path: '/auctions/$auctionId'
      fullPath: '/auctions/$auctionId'
      preLoaderRoute: typeof AuctionsAuctionIdImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/auctions': {
      id: '/dashboard/auctions'
      path: '/auctions'
      fullPath: '/dashboard/auctions'
      preLoaderRoute: typeof DashboardAuctionsImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/sell': {
      id: '/dashboard/sell'
      path: '/sell'
      fullPath: '/dashboard/sell'
      preLoaderRoute: typeof DashboardSellImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/summary': {
      id: '/dashboard/summary'
      path: '/summary'
      fullPath: '/dashboard/summary'
      preLoaderRoute: typeof DashboardSummaryImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/watchlists': {
      id: '/dashboard/watchlists'
      path: '/watchlists'
      fullPath: '/dashboard/watchlists'
      preLoaderRoute: typeof DashboardWatchlistsImport
      parentRoute: typeof DashboardImport
    }
    '/watchlists/$watchlistId': {
      id: '/watchlists/$watchlistId'
      path: '/watchlists/$watchlistId'
      fullPath: '/watchlists/$watchlistId'
      preLoaderRoute: typeof WatchlistsWatchlistIdImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof DashboardImport
    }
    '/auctions/$auctionId/edit': {
      id: '/auctions/$auctionId/edit'
      path: '/edit'
      fullPath: '/auctions/$auctionId/edit'
      preLoaderRoute: typeof AuctionsAuctionIdEditImport
      parentRoute: typeof AuctionsAuctionIdImport
    }
    '/auctions/$auctionId/': {
      id: '/auctions/$auctionId/'
      path: '/'
      fullPath: '/auctions/$auctionId/'
      preLoaderRoute: typeof AuctionsAuctionIdIndexImport
      parentRoute: typeof AuctionsAuctionIdImport
    }
    '/dashboard/auctions/': {
      id: '/dashboard/auctions/'
      path: '/'
      fullPath: '/dashboard/auctions/'
      preLoaderRoute: typeof DashboardAuctionsIndexImport
      parentRoute: typeof DashboardAuctionsImport
    }
    '/dashboard/watchlists/': {
      id: '/dashboard/watchlists/'
      path: '/'
      fullPath: '/dashboard/watchlists/'
      preLoaderRoute: typeof DashboardWatchlistsIndexImport
      parentRoute: typeof DashboardWatchlistsImport
    }
  }
}

// Create and export the route tree

interface DashboardAuctionsRouteChildren {
  DashboardAuctionsIndexRoute: typeof DashboardAuctionsIndexRoute
}

const DashboardAuctionsRouteChildren: DashboardAuctionsRouteChildren = {
  DashboardAuctionsIndexRoute: DashboardAuctionsIndexRoute,
}

const DashboardAuctionsRouteWithChildren =
  DashboardAuctionsRoute._addFileChildren(DashboardAuctionsRouteChildren)

interface DashboardWatchlistsRouteChildren {
  DashboardWatchlistsIndexRoute: typeof DashboardWatchlistsIndexRoute
}

const DashboardWatchlistsRouteChildren: DashboardWatchlistsRouteChildren = {
  DashboardWatchlistsIndexRoute: DashboardWatchlistsIndexRoute,
}

const DashboardWatchlistsRouteWithChildren =
  DashboardWatchlistsRoute._addFileChildren(DashboardWatchlistsRouteChildren)

interface DashboardRouteChildren {
  DashboardAuctionsRoute: typeof DashboardAuctionsRouteWithChildren
  DashboardSellRoute: typeof DashboardSellRoute
  DashboardSummaryRoute: typeof DashboardSummaryRoute
  DashboardWatchlistsRoute: typeof DashboardWatchlistsRouteWithChildren
  DashboardIndexRoute: typeof DashboardIndexRoute
}

const DashboardRouteChildren: DashboardRouteChildren = {
  DashboardAuctionsRoute: DashboardAuctionsRouteWithChildren,
  DashboardSellRoute: DashboardSellRoute,
  DashboardSummaryRoute: DashboardSummaryRoute,
  DashboardWatchlistsRoute: DashboardWatchlistsRouteWithChildren,
  DashboardIndexRoute: DashboardIndexRoute,
}

const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren,
)

interface AuctionsAuctionIdRouteChildren {
  AuctionsAuctionIdEditRoute: typeof AuctionsAuctionIdEditRoute
  AuctionsAuctionIdIndexRoute: typeof AuctionsAuctionIdIndexRoute
}

const AuctionsAuctionIdRouteChildren: AuctionsAuctionIdRouteChildren = {
  AuctionsAuctionIdEditRoute: AuctionsAuctionIdEditRoute,
  AuctionsAuctionIdIndexRoute: AuctionsAuctionIdIndexRoute,
}

const AuctionsAuctionIdRouteWithChildren =
  AuctionsAuctionIdRoute._addFileChildren(AuctionsAuctionIdRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/auctions/$auctionId': typeof AuctionsAuctionIdRouteWithChildren
  '/dashboard/auctions': typeof DashboardAuctionsRouteWithChildren
  '/dashboard/sell': typeof DashboardSellRoute
  '/dashboard/summary': typeof DashboardSummaryRoute
  '/dashboard/watchlists': typeof DashboardWatchlistsRouteWithChildren
  '/watchlists/$watchlistId': typeof WatchlistsWatchlistIdRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/auctions/$auctionId/edit': typeof AuctionsAuctionIdEditRoute
  '/auctions/$auctionId/': typeof AuctionsAuctionIdIndexRoute
  '/dashboard/auctions/': typeof DashboardAuctionsIndexRoute
  '/dashboard/watchlists/': typeof DashboardWatchlistsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/dashboard/sell': typeof DashboardSellRoute
  '/dashboard/summary': typeof DashboardSummaryRoute
  '/watchlists/$watchlistId': typeof WatchlistsWatchlistIdRoute
  '/dashboard': typeof DashboardIndexRoute
  '/auctions/$auctionId/edit': typeof AuctionsAuctionIdEditRoute
  '/auctions/$auctionId': typeof AuctionsAuctionIdIndexRoute
  '/dashboard/auctions': typeof DashboardAuctionsIndexRoute
  '/dashboard/watchlists': typeof DashboardWatchlistsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/auctions/$auctionId': typeof AuctionsAuctionIdRouteWithChildren
  '/dashboard/auctions': typeof DashboardAuctionsRouteWithChildren
  '/dashboard/sell': typeof DashboardSellRoute
  '/dashboard/summary': typeof DashboardSummaryRoute
  '/dashboard/watchlists': typeof DashboardWatchlistsRouteWithChildren
  '/watchlists/$watchlistId': typeof WatchlistsWatchlistIdRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/auctions/$auctionId/edit': typeof AuctionsAuctionIdEditRoute
  '/auctions/$auctionId/': typeof AuctionsAuctionIdIndexRoute
  '/dashboard/auctions/': typeof DashboardAuctionsIndexRoute
  '/dashboard/watchlists/': typeof DashboardWatchlistsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/dashboard'
    | '/auctions/$auctionId'
    | '/dashboard/auctions'
    | '/dashboard/sell'
    | '/dashboard/summary'
    | '/dashboard/watchlists'
    | '/watchlists/$watchlistId'
    | '/dashboard/'
    | '/auctions/$auctionId/edit'
    | '/auctions/$auctionId/'
    | '/dashboard/auctions/'
    | '/dashboard/watchlists/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/dashboard/sell'
    | '/dashboard/summary'
    | '/watchlists/$watchlistId'
    | '/dashboard'
    | '/auctions/$auctionId/edit'
    | '/auctions/$auctionId'
    | '/dashboard/auctions'
    | '/dashboard/watchlists'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/dashboard'
    | '/auctions/$auctionId'
    | '/dashboard/auctions'
    | '/dashboard/sell'
    | '/dashboard/summary'
    | '/dashboard/watchlists'
    | '/watchlists/$watchlistId'
    | '/dashboard/'
    | '/auctions/$auctionId/edit'
    | '/auctions/$auctionId/'
    | '/dashboard/auctions/'
    | '/dashboard/watchlists/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  DashboardRoute: typeof DashboardRouteWithChildren
  AuctionsAuctionIdRoute: typeof AuctionsAuctionIdRouteWithChildren
  WatchlistsWatchlistIdRoute: typeof WatchlistsWatchlistIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  DashboardRoute: DashboardRouteWithChildren,
  AuctionsAuctionIdRoute: AuctionsAuctionIdRouteWithChildren,
  WatchlistsWatchlistIdRoute: WatchlistsWatchlistIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/dashboard",
        "/auctions/$auctionId",
        "/watchlists/$watchlistId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx",
      "children": [
        "/dashboard/auctions",
        "/dashboard/sell",
        "/dashboard/summary",
        "/dashboard/watchlists",
        "/dashboard/"
      ]
    },
    "/auctions/$auctionId": {
      "filePath": "auctions/$auctionId.tsx",
      "children": [
        "/auctions/$auctionId/edit",
        "/auctions/$auctionId/"
      ]
    },
    "/dashboard/auctions": {
      "filePath": "dashboard/auctions.tsx",
      "parent": "/dashboard",
      "children": [
        "/dashboard/auctions/"
      ]
    },
    "/dashboard/sell": {
      "filePath": "dashboard/sell.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/summary": {
      "filePath": "dashboard/summary.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/watchlists": {
      "filePath": "dashboard/watchlists.tsx",
      "parent": "/dashboard",
      "children": [
        "/dashboard/watchlists/"
      ]
    },
    "/watchlists/$watchlistId": {
      "filePath": "watchlists/$watchlistId.tsx"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx",
      "parent": "/dashboard"
    },
    "/auctions/$auctionId/edit": {
      "filePath": "auctions/$auctionId.edit.tsx",
      "parent": "/auctions/$auctionId"
    },
    "/auctions/$auctionId/": {
      "filePath": "auctions/$auctionId.index.tsx",
      "parent": "/auctions/$auctionId"
    },
    "/dashboard/auctions/": {
      "filePath": "dashboard/auctions.index.tsx",
      "parent": "/dashboard/auctions"
    },
    "/dashboard/watchlists/": {
      "filePath": "dashboard/watchlists.index.tsx",
      "parent": "/dashboard/watchlists"
    }
  }
}
ROUTE_MANIFEST_END */
