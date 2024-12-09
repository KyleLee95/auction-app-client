import { CompleteAuction } from "@/types/auction";

export async function fetchUserCart(userId: string): Promise<any> {
  try {
    const res = await fetch(`/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, action: "get" }),
    });

    if (!res.ok) {
      console.error("fetch cart error", res.statusText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("fetch cart error", error);
    return null;
  }
}

export async function addItemToCart(userId: string, item: CompleteAuction, quantity: number): Promise<boolean> {
    try {
        item.cartQuantity = quantity;
        const res = await fetch(`/api/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, item, action: "add" }),
        });

    if (!res.ok) {
      console.error("add item to cart error", res.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("add item to cart error", error);
    return false;
  }
}

export async function removeItemFromCart(
  userId: string,
  item: CompleteAuction
): Promise<boolean> {
  try {
    const res = await fetch(`/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, itemId: item.id, action: "remove" }),
    });

    if (!res.ok) {
      console.error("remove item from cart error", res.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("remove item from cart error", error);
    return false;
  }
}

export async function checkoutCart(userId: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, action: "checkout" }),
    });

    if (!res.ok) {
      console.error("checkout cart error", res.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("checkout cart error", error);
    return false;
  }
}

