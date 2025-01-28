import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface OrderHistoryProps {
  customerId: string;
}

const OrderHistory = ({ customerId }: OrderHistoryProps) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select(`
            *,
            order_items (
              *,
              product:products (
                name
              )
            )
          `)
          .eq("customer_id", customerId)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId, toast]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Order History</h3>
      
      {orders.length === 0 ? (
        <p className="text-muted-foreground">No orders found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Date</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  {format(new Date(order.created_at), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="font-mono">{order.id.slice(0, 8)}</TableCell>
                <TableCell>
                  <ul className="list-disc list-inside">
                    {order.order_items.map((item: any) => (
                      <li key={item.id}>
                        {item.product.name} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>${order.total_amount}</TableCell>
                <TableCell className="capitalize">{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default OrderHistory;