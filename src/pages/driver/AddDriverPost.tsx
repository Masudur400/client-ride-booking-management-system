/* eslint-disable @typescript-eslint/no-explicit-any */
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
 
import toast from "react-hot-toast" 
import { useCreateDriverMutation } from "@/redux/features/drive/driver.api"
import DriverTable from "./DriverTable"




const addPostSchema = z.object({
    title: z.string(),
    from: z.string(),
    to: z.string(),
    amount: z.number()
})


export function AddDriverPost({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [createDriver] = useCreateDriverMutation()


    const form = useForm<z.infer<typeof addPostSchema>>({
        resolver: zodResolver(addPostSchema),
        defaultValues: {
            title: '',
            from: '',
            to: '',
            amount: 0

             
    // "title": "Morning Office Ride",
    // "from": "Uttara",
    // "to": "Motijheel",
    // "amount": 250
   
    // "title": "Ride to University",
    // "from": "Dhanmondi",
    // "to": "Mirpur 10",
    // "amount": 200
   
    // "title": "Airport Drop Service",
    // "from": "Gulshan",
    // "to": "Hazrat Shahjalal Airport",
    // "amount": 300
 
    // "title": "Evening Market Ride",
    // "from": "Mohammadpur",
    // "to": "Karwan Bazar",
    // "amount": 150
   
    // "title": "Quick Business Trip",
    // "from": "Farmgate",
    // "to": "Shyamoli",
    // "amount": 180
  
    // "title": "Family Ride to Baridhara",
    // "from": "Mohakhali",
    // "to": "Baridhara",
    // "amount": 220
   
    // "title": "Daily Office Commuting",
    // "from": "Banani",
    // "to": "Motijheel",
    // "amount": 260
   
    // "title": "Evening University Ride",
    // "from": "Jatrabari",
    // "to": "Dhanmondi",
    // "amount": 210
   
    // "title": "Shopping Ride",
    // "from": "New Market",
    // "to": "Bashundhara City",
    // "amount": 170
  
    // "title": "Coaching Center Drop",
    // "from": "Rampura",
    // "to": "Malibagh",
    // "amount": 120
   
    // "title": "Visiting Old Dhaka",
    // "from": "Farmgate",
    // "to": "Chawk Bazar",
    // "amount": 200
   
    // "title": "Night Ride to Mirpur",
    // "from": "Panthapath",
    // "to": "Mirpur 2",
    // "amount": 190
   
    // "title": "Evening Airport Pickup",
    // "from": "Khilgaon",
    // "to": "Hazrat Shahjalal Airport",
    // "amount": 320
   
    // "title": "Weekend Family Trip",
    // "from": "Banani",
    // "to": "Purbachal",
    // "amount": 280
  
    // "title": "Daily Commuting Ride",
    // "from": "Shantinagar",
    // "to": "Motijheel",
    // "amount": 160 

        }
    })

    const onSubmit = async (data: z.infer<typeof addPostSchema>) => {
        const createData = {
            title: data.title,
            from: data.from,
            to: data.to,
            amount: data.amount
        }
        try {
            const result = await createDriver(createData).unwrap();
            if (result.success) {
                toast.success("post created successfully");
                form.reset();
            }
        } catch (error: any) {
            if (error) {
                toast.error("failed to create post");
            }
            console.log(error);
        }
    }



    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="flex justify-between">
                    <div>
                        <CardTitle>Create A Driver Post</CardTitle>
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
                                        <FormLabel>To</FormLabel>
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
                                        <FormLabel>amount</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Amount" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} className="my-1" />
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

           <DriverTable></DriverTable> 

        </div>
    )
}
