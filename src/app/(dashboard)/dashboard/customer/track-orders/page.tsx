"use client"
import { useGetCustomerOrdersQuery, useUpdateOrderMutation } from "@/redux/features/orders/orderApi";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import Swal from 'sweetalert2'

const TrackOrderPage = () => {
    const { data: myOrders, isLoading, refetch } = useGetCustomerOrdersQuery([]);
    const [updateOrder] = useUpdateOrderMutation();
    const handleCancleOrder = (orderId: string) => {
        Swal.fire({
            title: "Do you want to cancle the order?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Cancle",
            denyButtonText: `Don't Cancle`,
            cancelButtonText: "Close",
            confirmButtonColor: "#dc3545",
            denyButtonColor: "#198754",
            cancelButtonColor: "green",
        }).then(async (result) => {

            if (result.isConfirmed) {
                const newData = await updateOrder({ data: { status: 'cancled' }, orderId })
                await refetch()
                console.log(newData);
                Swal.fire({
                    title: "order cancled!",
                    confirmButtonColor: "#dc3545",
                });
            } else if (result.isDenied) {
                Swal.fire({
                    title: "Order isn't cancle",
                    confirmButtonColor: "green",
                });
            }
        });

    }
    return (
        <div>
            <Table className="bg-green-800 text-white">
                <TableCaption>{isLoading ? <div className="text-center w-fit"><p className="mb-2">Loading data...</p><BarLoader cssOverride={{ width: '400px' }} color="green" /></div> : 'A list of your recent Orders'}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className=" text-center text-white">OrderId</TableHead>
                        <TableHead className="text-center text-white">Meal</TableHead>
                        <TableHead className="text-center text-white">schedule</TableHead>
                        <TableHead className="text-center text-white">quantity</TableHead>
                        <TableHead className="text-center text-white">Status</TableHead>
                        <TableHead className="text-center text-white">Price</TableHead>
                        <TableHead className="text-center text-white">Modify Order</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody >
                    {
                        myOrders?.data?.map((item: any) => (
                            <TableRow key={item?._id}>
                                <TableCell className="font-medium text-center">{item?._id}</TableCell>
                                <TableCell className="text-center font-medium">{item?.mealId?.title}</TableCell>
                                <TableCell className="text-center font-medium">{item?.schedule.replace("T", " ")}</TableCell>
                                <TableCell className="text-center font-medium">{item?.quantity}</TableCell>
                                <TableCell className="text-center font-medium">{item?.status}</TableCell>
                                <TableCell className="text-center font-medium">${item?.totalPrice}</TableCell>
                                <TableCell className="text-center font-medium"><Link href="/update-order" className="mr-1"><Button variant="outline" className="bg-orange-500 text-white">Modify</Button></Link><Button className="mr-1 bg-red-700 text-white" variant="outline" onClick={() => handleCancleOrder(item?._id)} disabled={item?.status !== "pending" && true}>Cancle</Button></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        </div>
    );
}

export default TrackOrderPage;
