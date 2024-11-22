import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, Outlet } from "react-router-dom";
import { searchAuctions } from "@/utils/auctions";
import { queryClient } from "@/main";
const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const category: string = searchParams.get("category") || "";
  const { isLoading, isError, data } = useQuery({
    queryKey: ["searchResults", category],
    queryFn: () => searchAuctions(category),
  });
  console.log("re-render");

  // useEffect(() => {
  // console/l
  //   queryClient.invalidateQueries({ queryKey: ["searchResults"] });
  // }, [searchParams]);

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
