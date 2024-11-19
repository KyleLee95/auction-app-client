import { createFileRoute } from "@tanstack/react-router";
import { auctionsQueryOptions } from "../../utils/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { CompleteAuction } from "@/types/auction";

export const Route = createFileRoute("/dashboard/auctions/")({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(
      auctionsQueryOptions("c1eb0520-90a1-7030-7847-c8ca5bfbe65e")
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const auctionsQuery = useSuspenseQuery(
    auctionsQueryOptions("c1eb0520-90a1-7030-7847-c8ca5bfbe65e")
  );
  const auctions = auctionsQuery.data.auctions;
  if (!auctions) {
    return <div>No auctions found</div>;
  }
  return (
    <div className="mx-4">
      {auctions.map((auction: CompleteAuction) => {
        return (
          <Card key={auction.id} className="my-2">
            <CardHeader>
              <CardTitle>{auction.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-around">
                <img src="https://i.ebayimg.com/images/g/Uw4AAOSwscxnGWRH/s-l500.webp" />
                <div>{auction.description}</div>
                <div className="flex flex-col">
                  <Link to={`/auctions/${auction.id}`}>
                    <Button className="my-4">View</Button>
                  </Link>

                  <Link to={`/auctions/${auction.id}/edit`}>
                    <Button className="my-4">Edit</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
