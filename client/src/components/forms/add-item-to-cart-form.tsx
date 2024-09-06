"use client";
import React, { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StrapiImage } from "@/components/custom/strapi-image";
import { formatPrice } from "@/lib/utils";
import { SubmitButton } from "@/components/custom/submit-button";

import { ProductProps } from "@/lib/types";
import { addItemToCartAction } from "@/data/actions";

export function AddItemToCartForm({
  product,
}: {
  readonly product: ProductProps;
}) {
  const [quantity, setQuantity] = useState(1);
  const total = product.priceInCents * quantity;

  return (
    <Card>
      <CardContent>
        <form className="flex flex-row gap-4 p-6" action={addItemToCartAction}>
          <div className="w-1/2 relative">
            <StrapiImage
              src={product.image.url}
              alt={product.name}
              className="w-full rounded-lg"
              width={500}
              height={500}
            />
            {product.onSale && (
              <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-sm font-semibold rounded">
                On Sale!
              </div>
            )}
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
            <p className="text-lg font-semibold">
              {formatPrice(product.priceInCents)}
            </p>
            <div className="flex items-center justify-between gap-2">
              <div>
                <Input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  className="w-20"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <input
                  type="hidden"
                  id="productId"
                  name="productId"
                  value={product.documentId}
                />
              </div>
              <span className="text-sm font-semibold">
                Total: ${formatPrice(total)}
              </span>
            </div>
            <SubmitButton text="Add to Cart" loadingText="Adding to Cart" />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
