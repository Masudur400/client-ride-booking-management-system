/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteBookingMutation, useGetMyBookingQuery } from "@/redux/features/booking/booking.api";
import type { IBooking } from "@/types";
import { FcCancel } from "react-icons/fc";
import Loading from "../Loadin";
import DeleteConfirmation from "@/components/modules/DeleteConfirmation";
import toast from "react-hot-toast";
import { TbCurrencyTaka } from "react-icons/tb";

 
const MyBookings = () => {

    const {data, isLoading} = useGetMyBookingQuery() 
    const MyBooking = data?.data
    const [deleteBooking] = useDeleteBookingMutation()

    const handleCancelBooking = async  (id : string) =>{
        try {
            const result = await deleteBooking({id}).unwrap()
            if(result.success){
                toast.success('booking cancel successful.')
            } 
        } catch (error: any) {
            if(error){
                toast.error(error?.data?.message)
            } 
        } 
    }

    if(isLoading){
        return <Loading></Loading>
    }

    return (
         <div className="mb-10 w-full max-w-7xl mx-auto px-5">
            <div className="my-5">
                <CardTitle className="flex items-center"><span className="mr-2"> ||</span> <span> My All Booking Request</span></CardTitle>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Body</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        MyBooking?.map((item : IBooking, idx:string) => <TableRow key={idx}>
                            <TableCell className="space-y-2">
                                <p><span className="font-medium">Title :{" "}</span>{item?.title}</p>
                                <p><span className="font-medium">From :{" "}</span>{item?.from}</p>
                                <p><span className="font-medium">To :{" "}</span>{item?.to}</p>
                                <p className="flex"><span className="font-medium">Amount :{" "}</span><span className="flex items-center mx-1">{item?.amount} <TbCurrencyTaka className="text-[15px]" /></span></p>
                                <p><span className="font-medium">Booker Name :{" "}</span>{item?.bookerName}</p>
                                <p><span className="font-medium">Booker Email :{" "}</span>{item?.bookerEmail}</p>
                                <p className="flex"><span className="font-medium">Transporter Name :{" "}</span><span className="flex items-center mx-1">{item?.transporterName}</span></p>
                                <p className="flex"><span className="font-medium">Transporter Email :{" "}</span><span className="flex items-center mx-1">{item?.transporterEmail}</span></p>
                                <p><span className="font-medium">Booking Status :{" "}</span>{item?.bookingStatus}</p>
                            </TableCell>
                            <TableCell className="flex justify-end">  
                                <DeleteConfirmation onConfirm={()=>handleCancelBooking(item?._id)}>
                                    <Button variant="outline" className="w-fit flex items-center justify-center gap-1 text-red-600"><span>Cancel</span><FcCancel /></Button>  
                                </DeleteConfirmation> 
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table> 
        </div>
    );
};

export default MyBookings;