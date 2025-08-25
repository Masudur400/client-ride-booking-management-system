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
import { useState } from "react"  
import toast from "react-hot-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { BiRightArrowAlt } from "react-icons/bi"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useSendRequestMutation } from "@/redux/features/applyForRole/apply.api"
import { Role } from "@/constants/role"




const updateInfoSchema = z.object({
    want: z.string(),
}) 

export function SendRoleRequestModal() {

    const {data} = useUserInfoQuery(undefined) 
    const [sendRequest] = useSendRequestMutation() 
    const [open, setOpen] = useState(false); 

    const form = useForm<z.infer<typeof updateInfoSchema>>({
        resolver: zodResolver(updateInfoSchema),
        defaultValues: {
            want: data?.data?.role
        },
    }) 

    const onSubmit = async (data: z.infer<typeof updateInfoSchema>) => { 
        const want = data.want  
        try { 
            const result = await sendRequest({want}).unwrap() 
            if(result.success){
                toast.success('request send successfully')
                setOpen(false);
            } 
        } catch (error: any) {
            console.log('request failed...', error);
            if (error.data.message === 'You have already applied') {
                toast.error('You have already applied')
                setOpen(false);
            }
            if (error.data.message === 'You are not permitted to view this route!!!') {
                toast.error('You role already exist')
                setOpen(false);
            }
        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button  variant="link" className='text-sm p-0 flex gap-0 justify-center cursor-pointer'><span>Send Request For Role as Rider/Driver</span><BiRightArrowAlt className='mt-1'/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Send Request For Role as Driver/Rider</DialogTitle> 
                </DialogHeader>

                <Form {...form}>
                    <form id="update-info" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="want"
                            render={({ field }) => (
                                <FormItem >
                                    {/* <FormLabel>Email</FormLabel> */}
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl className="w-full">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={Role.DRIVER}>{Role.DRIVER}</SelectItem>
                                            <SelectItem value={Role.RIDER}>{Role.RIDER}</SelectItem> 
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
