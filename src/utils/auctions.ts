import { type CompleteAuction } from "@/types/auction";
import { IBidModelWithAuction } from "@/types/bid";

export async function searchAuctions(
  params: string
): Promise<{ auctions: CompleteAuction[] }> {
  const res = await fetch(`/api/auctions/search?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("fetch auctions error", res.statusText);
  }
  const { auctions } = await res.json();
  return { auctions: auctions };
}

export async function fetchUserAuctions(
  userId: string,
  includeBidOn: boolean
): Promise<{
  auctions: CompleteAuction[];
  bidOnAuctions: IBidModelWithAuction[];
}> {
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

export async function updateAuctionById(
  auctionId: number,
  payload: any
): Promise<{}> {
  const res = await fetch(`/api/auctions/${auctionId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}
