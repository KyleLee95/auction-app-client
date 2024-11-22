import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { CompleteAuction } from "@/types/auction";
function SearchPageResultsFeed() {
  const { auctions } = useOutletContext();
  const [page, setPage] = useState(0);

  return (
    <div>
      {auctions.map((auction: CompleteAuction) => {
        return <div key={auction.id}>{auction.title}</div>;
      })}
    </div>
  );
}

export { SearchPageResultsFeed };
