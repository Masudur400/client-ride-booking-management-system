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
import { Input } from "@/components/ui/input"
import { LuPencilLine } from "react-icons/lu"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { useUpdateInfoMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import {useState } from "react"




const updateInfoSchema = z.object({
    name: z.string(),
    phone: z.string(),
    address: z.string()
})



export function UpdateInfoModal() {

    const { data : userData } = useUserInfoQuery(undefined)
    const user = userData?.data 
    const [updateInfo] = useUpdateInfoMutation()
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof updateInfoSchema>>({
        resolver: zodResolver(updateInfoSchema),
        defaultValues: {
            name: user?.name || "",
            // phone: user?.phone || "",
            // address: user?.address || "",
        },
    }) 
    

    const onSubmit = async (value: z.infer<typeof updateInfoSchema>) => {
        const id = user?._id
        if (!user?._id) {
            return
        }
        // const toastId = toast.loading("login...")
        const userInfo = {
            name: value.name,
            phone: value.phone,
            address: value.address
        }
        try {
            const result = await updateInfo({ id, userInfo }).unwrap()
            console.log(result);
        } catch (error) {
            console.log('update failed',error);
        }
        console.log(userInfo);
        setOpen(false);

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="link" className="text-sm w-fit p-0 text-red-500 hover:text-red-400 flex gap-1 cursor-pointer">
                    <span>Edit Your Info</span>
                    <LuPencilLine />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle> 
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form id="update-info" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Phone" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Address" {...field} />
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
