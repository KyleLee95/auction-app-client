import { useOutletContext } from "react-router-dom";
import { useState } from "react";
function SearchPageResultsFeed() {
  const { auctions } = useOutletContext();
  const [page, setPage] = useState(0);

  return (
    <div>
      {auctions.map((auction, idx) => {
        return <div>{auction.title}</div>;
      })}
    </div>
  );
}

export { SearchPageResultsFeed };
