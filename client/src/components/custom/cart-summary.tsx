import React from "react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react"; // Import the Trash2 icon

// Move the mock data to this component or replace it with actual cart data
const mockCartItems = [
  { id: 1, name: "Product 1", quantity: 2, price: 1000 },
  { id: 2, name: "Product 2", quantity: 1, price: 1500 },
  { id: 3, name: "Product 3", quantity: 3, price: 800 },
];

export function CartSummary() {
  
  const handleSubmitOrder = () => {
    console.log("Submitting order...");
    // Implement order submission logic here
  };

  const handleDeleteItem = (itemId: number) => {
    console.log(`Deleting item with id: ${itemId}`);
    // Implement item deletion logic here
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {mockCartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 border-b border-gray-200"
            >
              <span>{item.name}</span>
              <span>Qty: {item.quantity}</span>
              <span>{formatPrice(item.price * item.quantity)}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between items-center">
          <span className="font-bold">
            Total:{" "}
            {formatPrice(
              mockCartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )
            )}
          </span>
          <Button onClick={handleSubmitOrder}>Submit Order</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
