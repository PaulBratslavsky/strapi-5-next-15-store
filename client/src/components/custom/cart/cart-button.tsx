import React from "react";
import { ShoppingCartIcon } from "lucide-react";
import { getCartItems } from "@/data/loaders";

async function loader() {
  const cartItems = await getCartItems();
  return cartItems?.data?.length || 0;
}

export async function CartButton() {
  const cartItems = await loader();
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <ShoppingCartIcon className="w-6 h-6" />
      <span className="text-lg font-bold text-primary">{cartItems}</span>
    </div>
  );
}
