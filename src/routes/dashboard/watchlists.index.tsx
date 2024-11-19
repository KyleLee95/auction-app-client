import { createFileRoute } from "@tanstack/react-router";
import { useAuthenticator } from "@aws-amplify/ui-react";
export const Route = createFileRoute("/dashboard/watchlists/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuthenticator();
  return (
    <div className="mx-2">
      ??sasndfioasdfnasof
      {/*.map((auction: CompleteAuction) => {
        return <AuctionCard auction={auction} key={auction.id} />;
      })*/}
    </div>
  );
}
