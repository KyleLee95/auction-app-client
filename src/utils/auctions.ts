import { IBidModelWithAuction, type CompleteAuction } from "../types";

export type AuctionsSortBy = "" | "" | "";

export async function fetchUserAuctions(
  userId: string,
  includeBidOn: boolean
): Promise<{
  auctions: CompleteAuction[];
  bidOnAuctions: IBidModelWithAuction[];
}> {
  // {
  //   filterBy,
  //   sortBy,
  // }: { filterBy?: string; sortBy: AuctionsSortBy } = {}
  const res = await fetch(
    `/api/auctions?userId=${userId}&includeBidOn=${includeBidOn}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    console.error("fetch auctions error", res.statusText);
  }
  const { auctions, bidOnAuctions } = await res.json();
  return { auctions: auctions, bidOnAuctions: bidOnAuctions };
}

export async function fetchAuctionById(auctionId: string): Promise<{
  auctions: CompleteAuction[];
  bidOnAuctions: IBidModelWithAuction[];
}> {
  const res = await fetch(`/api/auctions/${auctionId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    console.error("fetch auctions error", res.statusText);
  }
  const data = await res.json();
  return data;
}
