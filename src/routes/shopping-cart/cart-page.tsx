import { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { fetchCartById } from "@/utils/cart";
import { useAuthenticator } from "@aws-amplify/ui-react";


function CartPage() {
    const { user } = useAuthenticator();
    const cognitoUserId = user?.userId || '';

  console.log("cognitoUserId:", cognitoUserId);

  const queryResults = useQueries({
    queries: [
      {
        queryKey: ["cart", cognitoUserId],
        queryFn: () => fetchCartById(cognitoUserId as string),
        enabled: !!cognitoUserId, // Ensures the query runs only when cognitoUserId is available
      },
    ],

    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        loading: results.map((result) => result.isLoading),
        error: results.map((result) => result.isError),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  const isLoading = queryResults.loading.some((result) => result === true);
  const isError = queryResults.error.some((result) => result === true);
  const isPending = queryResults.pending;

  if (isError) {
    console.error("Error fetching cart data:", queryResults.error);
    return <div>Error. Something happened: {JSON.stringify(queryResults.error)}</div>;
  }

  if (isPending || isLoading) {
    return "Loading cart data...";
  }

  const cartItems = queryResults?.data[0]?.length > 0 
    ? queryResults.data[0] 
    : "No items in your cart";

  return <Outlet context={{ cartItems }} />;
}

export { CartPage };
