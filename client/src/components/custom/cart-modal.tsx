"use client";

import { ShoppingCartIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CartSummary } from "@/components/custom/cart-summary";

export function CartModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <ShoppingCartIcon className="w-6 h-6" />
          <span className="text-lg font-bold text-primary">0</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
        </DialogHeader>
        <CartSummary />
      </DialogContent>
    </Dialog>
  );
}
