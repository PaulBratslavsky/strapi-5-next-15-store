import { formatPrice } from "@/lib/utils";
import { getCartItems } from "@/data/loaders";
import { deleteCartAction } from "@/data/actions";

import { StrapiImage } from "@/components/custom/strapi-image";

import { Trash2 } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: number;
  documentId: string;
  item: {
    name: string;
    priceInCents: number;
    image: {
      title: string;
      url: string;
      alternativeText: string;
    };
  };
  quantity: number;
}

// Move the mock data to this component or replace it with actual cart data
// const mockCartItems = [
//   { id: 1, name: "Product 1", quantity: 2, price: 1000 },
//   { id: 2, name: "Product 2", quantity: 1, price: 1500 },
//   { id: 3, name: "Product 3", quantity: 3, price: 800 },
// ];

async function loader() {
  const cartItems = await getCartItems();
  return cartItems?.data || [];
}

export async function CartItems({ children }: { children?: React.ReactNode }) {
  const cartItems = await loader();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px]">
          {cartItems.map((product: CartItem) => {
            const { id, documentId, item, quantity } = product;
            return (
              <form
                key={id}
                className="grid grid-cols-[1fr,2fr,1fr,1fr,1fr] gap-2 items-center border-b border-gray-200 py-2"
              >
                <StrapiImage
                  src={item.image.url}
                  alt={item.image.title}
                  width={45}
                  height={45}
                  className="justify-self-start rounded-md"
                />
                <span>{item.name}</span>
                <span className="text-left">Qty: {quantity}</span>
                <span className="text-right">
                  {formatPrice(item.priceInCents * quantity)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="justify-self-end"
                  formAction={deleteCartAction}
                >
                  <input type="hidden" name="documentId" value={documentId} />
                  <Trash2 className="h-4 w-4" />
                </Button>
              </form>
            );
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between items-center">
          <span className="font-bold">
            Total:
            <span className="ml-2 font-normal">
              {formatPrice(
                cartItems.reduce(
                  (acc: number, item: CartItem) =>
                    acc + item.item.priceInCents * item.quantity,
                  0
                )
              )}
            </span>
          </span>
          {children}
        </div>
      </CardFooter>
    </Card>
  );
}
