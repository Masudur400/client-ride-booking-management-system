
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Logo from "@/assets/icons/Logo"
import Password from "../ui/Password"
import { useRegisterMutation } from "@/redux/features/auth/auth.api"
import toast from "react-hot-toast" 
import { config } from "@/config"




const registerSchema = z.object({
    name: z.string().min(3, { error: "Name is too short", }).max(50),
    email: z.email(),
    password: z.string().min(8, { error: "Password is too short" }),
    confirmPassword: z.string().min(8, { error: "Confirm Password is too short" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
});



export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [register] = useRegisterMutation()
    const navigate = useNavigate() 

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    })

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {

        const toastId = toast.loading("account creating...")
        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password,
        }
        try {
            const result = await register(userInfo).unwrap();
            if (result.success) {
                toast.success("User created successfully", { id: toastId });
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="flex justify-between">
                    <div>
                        <CardTitle>Register your account</CardTitle>
                        <CardDescription>
                            Enter your details to create an account
                        </CardDescription>
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
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Mr.jon" {...field} className="my-1" />
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
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="jon@gmail.com" {...field} className="my-1" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Password {...field}></Password>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Password {...field}></Password>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">Register</Button>
                        </form>
                    </Form>
                    <div>
                        <Button onClick={() => window.location.assign(`${config.baseUrl}/auth/google`)}
                            type="button" variant="outline" className="w-full mt-5">
                            Login with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="underline underline-offset-4">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
