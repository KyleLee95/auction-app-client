/**
 * Fetches the shopping cart for a specific user.
 * @param userId The ID of the user whose cart needs to be fetched.
 * @returns A Promise resolving to the user's cart data.
 */
export async function fetchCartById(userId: string) {
  try {
    const response = await fetch(`/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        action: "post",
      }),
    });

    if (!response.ok) {
      console.error(`Error fetching cart: ${response.statusText}`);
      throw new Error("Failed to fetch cart");
    }

    const data = await response.json();
    return data.cart;
  } catch (error) {
    console.error("Error while fetching the cart:", error);
    throw error;
  }
}
