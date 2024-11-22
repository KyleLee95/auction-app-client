import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, Outlet } from "react-router-dom";
import { searchAuctions } from "@/utils/auctions";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const category: string = searchParams.get("category") || "";
  const { isLoading, isError, data } = useQuery({
    queryKey: ["searchResults", searchParams],
    queryFn: () => searchAuctions(category),
  });
  if (isLoading) {
    return "Loading...";
  }
  if (isError) {
    return "Error";
  }
  const auctions = data?.auctions;
  return <Outlet context={{ auctions }} />;
};

export { SearchPage };
