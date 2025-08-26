/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllRiderPostQuery } from "@/redux/features/ride/ride.api";
import Loading from "./Loadin";
import { postStatus, type IPost } from "@/types";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TbCurrencyTaka } from "react-icons/tb";
import { useEffect, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useCreateBookingMutation } from "@/redux/features/booking/booking.api"; 

const searchSchema = z.object({
    search: z.string(),
});
const RiderPosts = () => {
    // const { data, isLoading } = useGetAllRiderPostQuery({ page: currentPage, limit });
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const [searchTerm, setSearchTerm] = useState("");

     
    const { data, isLoading } = useGetAllRiderPostQuery({ page: currentPage, limit, searchTerm });
    const riderPosts = data?.data || [];
    const totalPage = data?.meta?.totalPage
        ? data.meta.totalPage
        : Math.ceil((data?.meta?.total || 0) / limit);

    // React Hook Form
    const form = useForm<z.infer<typeof searchSchema>>({
        resolver: zodResolver(searchSchema),
        defaultValues: { search: "" },
    });

    const onSubmit = (data: z.infer<typeof searchSchema>) => {
        const term = data.search.trim();
        setSearchTerm(term);
        setCurrentPage(1); // Reset page on search
    };
    useEffect(() => {
        if (searchTerm === "") {
            setCurrentPage(1);
        }
    }, [searchTerm]);


    const [createBooking] = useCreateBookingMutation();

const handleCreateBooking = async (postId: string) => {
    try {
        const res = await createBooking({ postId }).unwrap();
        if (res.success) {
            toast.success('Booking created successfully');
        }
    } catch (error: any) {
        toast.error(error?.data?.message || 'Booking failed');
        console.log(error);
    }
};

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            {riderPosts?.length < 1 && <p>No data available</p>}

            <div>
                <div className="flex flex-col items-center my-5 gap-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-center">
                            <FormField
                                control={form.control}
                                name="search"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormControl>
                                            <Input placeholder="Search" {...field} className="max-w-52" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" variant="outline">Search</Button>
                            <Button type="button" variant="outline" onClick={() => {
                                form.reset({ search: "" });
                                setSearchTerm("");
                                setCurrentPage(1);
                            }}>
                                Reset
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5 px-5">
                {riderPosts?.map((post: IPost, idx: number) => (
                    <Card key={idx} className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle>{post?.title}</CardTitle>
                            <CardDescription>From: {post?.from}</CardDescription>
                            <CardDescription>To: {post?.to}</CardDescription>
                            <CardDescription className="flex items-center gap-1">
                                Cost: {post?.amount} <TbCurrencyTaka className="text-[15px]" />
                            </CardDescription>
                            <CardDescription >
                                {
                                    post?.postStatus === postStatus.BLOCKED && <p className="text-red-500">This post has blocked</p>
                                }
                            </CardDescription>
                            <CardDescription className="flex justify-end">
                                {
                                    post?.postStatus === postStatus.BLOCKED
                                        ? <Button onClick={() => toast.error('This post has blocked. You can not book')} className="w-fit">Book Driver</Button>
                                        : <Button onClick={()=> handleCreateBooking(post?._id)} className="w-fit">Book Rider</Button>
                                }
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            {totalPage > 1 && (
                <div className="flex justify-end mt-4">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
                                <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                                    <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default RiderPosts;