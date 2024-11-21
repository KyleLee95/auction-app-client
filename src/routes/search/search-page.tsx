import React from "react";
import { useSearchParams } from "react-router-dom";
import { SearchPageLayout } from "./search-layout";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  return <SearchPageLayout />;
};

export { SearchPage };
