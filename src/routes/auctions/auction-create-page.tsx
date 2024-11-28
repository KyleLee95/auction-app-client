import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useQuery } from "@tanstack/react-query";
import { AuctionCreateForm } from "@/routes/auctions/auction-create-form";
async function fetchAllCategories() {
  const res = await fetch("/api/categories");
  if (!res.ok) {
    console.error(res.statusText);
  }
  const data = await res.json();
  return data;
}

function AuctionCreatePage() {
  const { user } = useAuthenticator();
  const { isLoading, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await fetchAllCategories(),
  });
  if (isLoading) {
    return "Loading...";
  }
  if (error) {
    console.log(error);
    return error.message;
  }

  const { categories } = data;

  return (
    <Authenticator>
      <AuctionCreateForm user={user} categories={categories} />
    </Authenticator>
  );
}

export { AuctionCreatePage };
