/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { useState} from "react" 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select" 
import { bookingStatus } from "@/constants/bookingStatus"
import { CiEdit } from "react-icons/ci" 
import toast from "react-hot-toast"
import { useUpdateBookingStatusMutation } from "@/redux/features/booking/booking.api"

 
   

interface IProps {
    id: string, 
}

const updateStatusSchema = z.object({
    bookingStatus: z.string(),
})

export function BookingStatusUpdateModal({id}: IProps) {

     const [updateStatus] = useUpdateBookingStatusMutation()
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof updateStatusSchema>>({
        resolver: zodResolver(updateStatusSchema),
        defaultValues: {
            bookingStatus: ''
        },
    })

    const onSubmit = async (data: z.infer<typeof updateStatusSchema>) => { 
        const bookingStatus = data.bookingStatus 
        try {
            const result = await updateStatus({ id: String(id), bookingStatus}).unwrap()
            setOpen(false)
            if(result.success){
                toast.success('booking status updated.')
            } 
        } catch (error:any) {
            if(error){
                toast.error(error?.data?.error || 'Set a Value')
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
               <Button variant="outline" className="w-fit border border-red-500 text-red-500"><CiEdit /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Change Booking Status</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form id="update-info" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="bookingStatus"
                            render={({ field }) => (
                                <FormItem >
                                    {/* <FormLabel>Email</FormLabel> */}
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl className="w-full">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select A Value" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent> 
                                            {Object.values(bookingStatus)?.map((status: string) => (
                                                <SelectItem key={status} value={status}>
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> 
                    </form>
                </Form> 
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button form="update-info" type="submit">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
