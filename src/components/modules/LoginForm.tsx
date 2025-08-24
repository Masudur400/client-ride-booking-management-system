/* eslint-disable @typescript-eslint/no-explicit-any */

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
import { useLoginMutation } from "@/redux/features/auth/auth.api" 
import toast from "react-hot-toast"
import { config } from "@/config"




const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8, { error: "Password is too short" }),
})


export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [login] = useLoginMutation()
    const navigate = useNavigate() 

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        const userInfo = {
            email: data.email,
            password: data.password,
        }
        try {
            const toastId = toast.loading("login...")
            const result = await login(userInfo).unwrap();
            if (result.success) {
                toast.success("Login successfully", { id: toastId });
                 navigate('/') 
            }
        } catch (error: any) {
            if (error.data.message === "Password does not match") {
                toast.error("Invalid credentials");
            }
            console.log(error);
        }
    }



    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="flex justify-between">
                    <div>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
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
                                            {/* <Input type="password" placeholder="********" {...field} className="my-1"/> */}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">Login</Button>
                        </form>
                    </Form>
                    <div>
                        <Button
                            onClick={() => window.location.assign(`${config.baseUrl}/auth/google`)}
                            type="button" variant="outline" className="w-full mt-5">
                            Login with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <Link to="/register" className="underline underline-offset-4">
                            Register
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
