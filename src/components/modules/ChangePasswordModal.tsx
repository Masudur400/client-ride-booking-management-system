/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"  
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod" 
import {useState } from "react"
import Password from "../ui/Password"
import { TbHandMove } from "react-icons/tb"
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api"
import toast from "react-hot-toast"




const updateInfoSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string(), 
})



export function ChangePasswordModal() {
 
    const [open, setOpen] = useState(false);
    const [changePassword] = useChangePasswordMutation()

    const form = useForm<z.infer<typeof updateInfoSchema>>({
        resolver: zodResolver(updateInfoSchema),
        defaultValues: {
            oldPassword:"",
            newPassword:"" 
        },
    }) 
    

    const onSubmit = async (data: z.infer<typeof updateInfoSchema>) => { 
        const toastId = toast.loading("reseting password...")
        const changedData = {
             oldPassword:data.oldPassword,
            newPassword:data.newPassword
        }
        
        try {
            const result = await changePassword(changedData).unwrap() 
            if(result.success){
                toast.success('reset password Successfully',{id:toastId})
                setOpen(false);
            } 
        } catch (error: any) {
            console.log('password reset failed...',error);
            if(error){
                toast.error('old password does not match')
            }
        } 

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button  variant="link" className='text-sm w-fit p-0 text-red-500  hover:text-red-400 flex gap-1 cursor-pointer'><span>Change Password</span><TbHandMove /></Button> 
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Reset Password</DialogTitle> 
                    <DialogDescription>
                        Make changes to your password. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form id="update-info" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                       <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Old Password</FormLabel>
                                    <FormControl>
                                        <Password {...field}></Password>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Password {...field}></Password>
                                    </FormControl>
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
