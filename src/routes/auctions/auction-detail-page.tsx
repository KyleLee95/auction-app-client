import { Outlet } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { fetchAuctionById } from "@/utils/auctions";

const fetchCategories = async () => {
  const res = await fetch("/api/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  const { categories }: { categories: any } = data;
  return { categories: categories };
};
function AuctionPage() {
  const { auctionId } = useParams();
  const { user } = useAuthenticator();

  const queryResults = useQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: () => fetchCategories(),
      },
      {
        queryKey: ["auctions", auctionId],
        queryFn: () => fetchAuctionById(auctionId as string),
      },
    ],

    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        loading: results.map((result) => result.isLoading),
        error: results.map((result) => result.isError),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  const isLoading = queryResults.loading.some((result) => {
    result === true;
  });

  const isError = queryResults.error.some((result) => {
    result === true;
  });
  const isPending = queryResults.pending;

  if (isError) {
    return "Error";
  }

  if (isPending || isLoading) {
    return "Loading...";
  }
  const categories = queryResults?.data[0]?.categories;
  const auction = queryResults?.data[1]?.auctions[0];
  return <Outlet context={{ categories, auction, user }} />;
}

export { AuctionPage };
