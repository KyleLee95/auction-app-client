import * as React from "react";
import { retainSearchParams, createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({
    searchView: z
      .object({
        category: z.string().optional(),
        term: z.string().optional(),
      })
      .optional(),
  }).parse,
  search: {
    // Retain the usersView search param while navigating
    // within or to this route (or it's children!)
    middlewares: [retainSearchParams(["searchView"])],
  },
  loaderDeps: ({ search }) => ({
    term: search?.searchView?.term,
    category: search?.searchView?.category,
  }),
  loader: async ({ deps }) => {
    const res = await fetch(
      `/api/search?term=${deps.term}category=${deps.category}`
    );
    if (!res.ok) {
      console.error(res.statusText);
    }
    const data = await res.json();

    return { auctions: data.auctions };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { searchView } = Route.useSearch();
  const { auctions } = Route.useLoaderData();
  console.log("searchView", searchView);
  console.log("auctions", auctions);

  return (
    <div>
      {auctions.map((auction: any) => {
        return <div key={auction.id}>auction.title</div>;
      })}
    </div>
  );
}
