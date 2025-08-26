
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { LuPencilLine } from "react-icons/lu"
import { Role } from "@/constants/role"
import { useUpdateUserRoleMutation } from "@/redux/features/auth/auth.api"
import toast from "react-hot-toast"




interface IProps {
    id: string,
}

const updateRoleSchema = z.object({
    role: z.string(),
})

export function UpdateUserRoleModal({ id }: IProps) {

    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof updateRoleSchema>>({
        resolver: zodResolver(updateRoleSchema),
        defaultValues: {
            role: ''
        },
    })

    const [updateUserRole] = useUpdateUserRoleMutation()
    // const [updatePostStatus] = useUpdateRiderPostMutation()
    const onSubmit = async (data: z.infer<typeof updateRoleSchema>) => { 
        const role = data.role
        try {
            const result = await updateUserRole({ id: String(id), role }).unwrap()
            if (result.success) {
                toast.success(`Role has ${role}`)
            }
            setOpen(false) 
        } catch (error: any) {
            if (error) {
                toast.error(error?.data?.error || 'Set a Value')
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' className="text-sm w-fit p-0 text-red-500 hover:text-red-400 flex gap-1 cursor-pointer">
                    Edit Role<LuPencilLine />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Change Booking Status</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form id="update-info" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="role"
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
                                            <SelectItem value={Role.DRIVER}> {Role.DRIVER} </SelectItem>
                                            <SelectItem value={Role.RIDER}> {Role.RIDER} </SelectItem>
                                            <SelectItem value={Role.USER}> {Role.USER} </SelectItem>
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
