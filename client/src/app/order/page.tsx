
import { OrderForm } from "@/components/forms/order-form";
import { CartItems } from "@/components/custom/cart";

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
