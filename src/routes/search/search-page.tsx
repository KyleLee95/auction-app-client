import { useQuery } from "@tanstack/react-query";
import { useSearchParams, Outlet } from "react-router-dom";
import { searchAuctions } from "@/utils/auctions";
const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["searchResults", searchParams.toString()],
    queryFn: () => searchAuctions(searchParams.toString()),
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
