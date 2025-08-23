import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Logo from "@/assets/icons/Logo" 
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"




const addPostSchema = z.object({
    title: z.string(),
    from: z.string(),
    to: z.string(),
    amount: z.number()
})


export function AddRiderPost({
    className,
    ...props
}: React.ComponentProps<"div">) {

    // const [login] = useLoginMutation()
    // const navigate = useNavigate() 

    const form = useForm<z.infer<typeof addPostSchema>>({
        resolver: zodResolver(addPostSchema),
        defaultValues: {
            "title": "Office Commuting to Motijheel",
            "from": "Uttara",
            "to": "Motijheel",
            "amount": 250
        }
    })

    const onSubmit = async (data: z.infer<typeof addPostSchema>) => {
        console.log(data);
        // const toastId = toast.loading("login...")
        // const postData = {

        // }
        // try {
        //     // const result = await login(userInfo).unwrap();
        //     if (result.success) {
        //         toast.success("Login successfully", { id: toastId });

        //     }
        // } catch (error: any) {
        //     if (error.data.message === "Password does not match") {
        //         toast.error("Invalid credentials");
        //     }
        //     console.log(error);
        // }
    }



    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="flex justify-between">
                    <div>
                        <CardTitle>Create A Rider Post</CardTitle>
                    </div>
                    <div>
                        <Logo></Logo>
                    </div>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Title" {...field} className="my-1" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="from"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>From</FormLabel>
                                        <FormControl>
                                            <Input placeholder="From" {...field} className="my-1" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="to"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>From</FormLabel>
                                        <FormControl>
                                            <Input placeholder="To" {...field} className="my-1" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>From</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Amount" {...field} className="my-1" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">Create Post</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
