
import { fetchUserCart, removeItemFromCart, checkoutCart } from "@/utils/cartlist";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useQuery } from "@tanstack/react-query";
import { CompleteAuction } from "@/types/auction";
import { Button } from "@/components/ui/button";

function CartPage() {
    const { user } = useAuthenticator();
    const userId = user?.userId || '';

    console.log(userId);

    const { data, isLoading, error } = useQuery({
        queryKey: ["cart", userId],
        queryFn: () => fetchUserCart(userId),
    });

    if (isLoading) {
        return "Loading...";
    }

    if (error) {
        return "Error loading cart";
    }

    if (data?.length === 0) {
        return "No item in cart";
    }

    const totalPrice = data.reduce((sum, auction) => sum + (auction.buyItNowPrice * (auction.cartQuantity || 1)), 0);
    const totalShippingPrice = data.reduce((sum, auction) => sum + auction.shippingPrice, 0);
    const tax = totalPrice * 0.08;
    const totalPayment = totalPrice + totalShippingPrice + tax;

    return (
        <div className="mx-4">
            <h2 className="font-bold text-3xl mb-2">Your Cart</h2>
            <div className="flex-col">
                {data.map((auction: CompleteAuction) => (
                    <div key={auction.id} className="border p-4 mb-4 flex flex-col md:flex-row h-48">
                        <div className="flex-shrink-0 w-full md:w-1/4 h-full">
                            <a href={`/auctions/${auction.id}`}>
                                <img
                                    src="./150.png"
                                    alt="Auction item image"
                                    className="w-full h-full rounded-md object-cover"
                                />
                            </a>
                        </div>
                        <div className="flex-1 px-4 py-2">
                            <a href={`/auctions/${auction.id}`}>
                                <h3 className="font-bold text-lg">{auction.title}</h3>
                            </a>
                            <p>{auction.description}</p>
                            <p>Price: ${auction.buyItNowPrice}</p>
                            <p>Shipping Price: ${auction.shippingPrice}</p>
                            <p>Quantity: {auction.cartQuantity || 1}</p>
                        </div>
                        <div className="flex flex-col items-end justify-end mt-4 md:mt-0">
                            <Button
                                onClick={async () => {
                                    const success = await removeItemFromCart(userId, auction);
                                    if (success) {
                                        // Optionally, you can refetch the cart data or update the state to remove the item from the UI
                                        window.location.reload();
                                    }
                                }}
                            >
                                Remove from Cart
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col items-end mt-4">
                <p className="font-bold text-left mb-1.5">Total Item Price: ${totalPrice.toFixed(2)}</p>
                <p className="font-bold text-left mb-1.5">Tax (8%): ${tax.toFixed(2)}</p>
                <p className="font-bold text-left mb-1.5">Total Shipping Price: ${totalShippingPrice.toFixed(2)}</p>
                <p className="font-bold text-left mb-1.5">Total Payment: ${totalPayment.toFixed(2)}</p>
                <Button
                    className="mt-1.5"
                    onClick={async () => {
                        const paymentAppURL = `http://localhost:3000/checkout?amount=${totalPayment.toFixed(2)}`;
                        const paymentWindow = window.open(paymentAppURL, "_blank");
                        
                        window.addEventListener("message", async (event) => {
                            console.log(event.origin);
                            // Validate the origin for security
                            if (event.origin !== `http://localhost:3000`) return;
                            console.log(event)
                            const { success } = event.data; // Extract the success status
                            console.log(success);
                            if (success) {
                              console.log("Payment succeeded!");
                              const success = await checkoutCart(userId);
                                if (!success) {
                                    console.error("Error checking out cart");
                                }
                            } else {
                              console.log("Payment failed!");
                            }
                          });
                    }}
                >
                    Pay Now
                </Button>
            </div>
        </div>
    );
}

export { CartPage };