import { useQuery } from "@tanstack/react-query";
import { fetchUserAuctions } from "@/utils/auctions";
import { useAuthenticator } from "@aws-amplify/ui-react";
function DashboardAuctionList() {
  const { user } = useAuthenticator();
}

export { DashboardAuctionList };
