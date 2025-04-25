"use client"
import { useGetCustomerOrdersQuery } from "@/redux/features/orders/orderApi";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const TrackOrderPage = () => {
    const { data: myOrders } = useGetCustomerOrdersQuery([]);
    console.log(myOrders);
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent Orders</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">OrderId</TableHead>
                        <TableHead>Meal</TableHead>
                        <TableHead>schedule</TableHead>
                        <TableHead>quantity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </div>
    );
}

export default TrackOrderPage;
