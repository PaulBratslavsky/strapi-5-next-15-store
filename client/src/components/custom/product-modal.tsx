"use client";

import React, { useState } from "react";
import { ProductProps } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { StrapiImage } from "@/components/custom/strapi-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { CartSummary } from "@/components/custom/cart-summary";

export default function ProductModal({
  product,
}: {
  readonly product: ProductProps;
}) {
  const { name, description, image, priceInCents, onSale } = product;
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(priceInCents);

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(1, newQuantity);
    setQuantity(validQuantity);
    setSubtotal(validQuantity * priceInCents);
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log(
      `Added ${quantity} ${name}(s) to cart. Subtotal: ${formatPrice(subtotal)}`
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <Card>
          <CardContent className="flex flex-row gap-4 p-6">
            <div className="w-1/2 relative">
              <StrapiImage
                src={image.url}
                alt={name}
                className="w-full rounded-lg"
                width={500}
                height={500}
              />
              {onSale && (
                <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-sm font-semibold rounded">
                  On Sale!
                </div>
              )}
            </div>
            <div className="w-1/2 flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">{description}</p>
              <p className="text-lg font-semibold">
                {formatPrice(priceInCents)}
              </p>
              <div className="flex items-center justify-between gap-2">
                <div>
      
                  <Input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value))
                    }
                    className="w-20"
                  />
                </div>
                <span className="text-sm font-semibold">
                  Total: ${formatPrice(subtotal)}
                </span>
              </div>

              <Button onClick={handleAddToCart} className="w-full">
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>

        <CartSummary />
      </DialogContent>
    </Dialog>
  );
}
