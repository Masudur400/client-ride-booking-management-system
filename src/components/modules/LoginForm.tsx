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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Logo from "@/assets/icons/Logo"
import Password from "../ui/Password"
import { useLoginMutation } from "@/redux/features/auth/auth.api"
import toast from "react-hot-toast"
import { config } from "@/config"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, { message: "Password is too short" }),
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
      email: "",
      password: "12345678",
    },
  })

  const handleRoleSelect = (email: string) => {
    form.setValue("email", email) 
  }

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    }
    try {
      const toastId = toast.loading("login...")
      const result = await login(userInfo).unwrap()
      if (result.success) {
        toast.success("Login successfully", { id: toastId })
        navigate("/")
      }
    } catch (error: any) {
      if (error.data?.message === "Password does not match") {
        toast.error("Invalid credentials")
      }
      console.log(error)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="lg:w-2/3 md:w-3/4 mx-auto">
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </div>
          <div>
            <Logo />
          </div>
        </CardHeader>
        <CardContent className="md:flex w-full gap-6">
          <div className="w-full mb-5">
            {/* <CardTitle className="my-5">LogIn As Your Role</CardTitle> */}
            <CardDescription className="mb-5"> 
              When you select a button, you will log in as that role.
            </CardDescription>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => handleRoleSelect("super@gmail.com")}
                variant={"outline"}
                className="text-foreground"
              >
                Super Admin
              </Button>
              <Button
                onClick={() => handleRoleSelect("user@gmail.com")}
                variant={"outline"}
                className="text-foreground"
              >
                User
              </Button>
              <Button
                onClick={() => handleRoleSelect("rider@gmail.com")}
                variant={"outline"}
                className="text-foreground"
              >
                Rider
              </Button>
              <Button
                onClick={() => handleRoleSelect("driver@gmail.com")}
                variant={"outline"}
                className="text-foreground"
              >
                Driver
              </Button>
            </div>
          </div>

          <div className="w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="jon@gmail.com"
                          {...field}
                          className="my-1"
                        />
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
                        <Password {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>

            <div>
              <Button
                onClick={() =>
                  window.location.assign(`${config.baseUrl}/auth/google`)
                }
                type="button"
                variant="outline"
                className="w-full mt-5"
              >
                Login with Google
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="underline underline-offset-4">
                Register
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
