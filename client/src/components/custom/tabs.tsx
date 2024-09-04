import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface OrderTabsProps {
  orderSummary: React.ReactNode;
  orderForm: React.ReactNode;
}

export function OrderTabs({ orderSummary, orderForm }: OrderTabsProps) {
  return (
    <Tabs defaultValue="items" className="w-[400px]">
    <TabsList>
      <TabsTrigger value="items">Items</TabsTrigger>
      <TabsTrigger value="order">Order</TabsTrigger>
    </TabsList>
    <TabsContent value="items">{orderSummary}</TabsContent>
    <TabsContent value="order">{orderForm}</TabsContent>
  </Tabs>
  );
}
