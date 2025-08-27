/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendContactMailMutation } from "@/redux/features/conatct/contact.api";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import toast from "react-hot-toast";
import img from '../assets/images/home-bg.jpeg'
import Logo from "@/assets/icons/Logo";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

const contactSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email({ message: "Invalid email" }),
    subject: z.string().min(1, { message: "Subject is required" }),
    message: z.string().min(1, { message: "Message is required" }),
});

export function Contact({ className, ...props }: React.ComponentProps<"div">) {
    const [sendContactMail] = useSendContactMailMutation()
    const { data } = useUserInfoQuery(undefined)
    const user = data?.data

    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof contactSchema>) => {
        try {
            const result = await sendContactMail(data).unwrap();
            if (result.success) {
                toast.success('Mail sent.')
                form.reset();
            }
        } catch (error: any) {
            if (error?.data?.message) {
                toast.error(error?.data?.message)
            }
        }
    };

    return ( 
        <div
            className={cn(
                "relative flex flex-col items-center justify-center min-h-screen",
                className
            )}
            {...props}
        >
            <img
                src={img}
                alt="Contact background"
                className="absolute inset-0 w-full h-full object-cover -z-10"
            />
            <div className="absolute inset-0 bg-black/50 -z-10"></div>

            <Card className="my-10 md:w-1/3 mx-auto bg-card/90 backdrop-blur-md shadow-2xl">
                <CardHeader className="flex justify-between">
                    <div className="space-y-2">
                        <CardTitle className="text-2xl font-semibold flex justify-between items-center">
                            <p>Contact Us</p> <p><Logo></Logo></p>
                        </CardTitle>
                        <CardDescription className="">
                            Fill out the form below and we will get back to you shortly.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="you@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">Subject</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Subject" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">Message</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Your Message" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {
                                user
                                    ? <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md">Send Message</Button>
                                    : <Button
                                    onClick={()=>toast.error('Please Login.')} type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"> Send Message </Button>
                            }
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>

    );
}
