import React from "react";
import { useOutletContext } from "react-router-dom";
function DashboardWatchlistList() {
  const { watchlists } = useOutletContext();

  return watchlists?.map((list) => {
    return <div key={list.id}>{list.name}</div>;
  });
}
export { DashboardWatchlistList };
