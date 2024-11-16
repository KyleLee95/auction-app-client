import { createFileRoute } from "@tanstack/react-router";
import { auctionsQueryOptions } from "../../utils/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/auctions/")({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(auctionsQueryOptions);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const auctionsQuery = useSuspenseQuery(auctionsQueryOptions);
  const auctions = auctionsQuery.data;
  return (
    <div className="mx-4">
      {auctions.map((auction) => {
        return (
          <Card key={auction._id} className="my-2">
            <CardHeader>
              <CardTitle>{auction.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-around">
                <img src="https://i.ebayimg.com/images/g/Uw4AAOSwscxnGWRH/s-l500.webp" />
                <div>{auction.description}</div>
                <div className="flex flex-col">
                  <Link to={`/auctions/${auction._id}`}>
                    <Button className="my-4">View</Button>
                  </Link>

                  <Link to={`/auctions/${auction._id}/edit`}>
                    <Button className="my-4">Edit</Button>
                  </Link>
                  <Button className="my-4">End</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
