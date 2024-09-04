import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { OrderForm } from "@/components/forms/order-form";
import { CartItems } from "@/components/custom/cart";

// Mock data for cart items
const cartItems = [
  { id: 1, name: "Product 1", quantity: 2, price: 19.99 },
  { id: 2, name: "Product 2", quantity: 1, price: 29.99 },
  { id: 3, name: "Product 3", quantity: 3, price: 14.99 },
];

export default function OrderPageRoute() {
  return (
      <div className="container mx-auto p-4  py-12">
        <h1 className="text-2xl font-bold mb-6">Complete Your Order</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CartItems />
          <OrderForm />
        </div>
      </div>
  );
}
