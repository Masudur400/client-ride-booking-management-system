
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllRiderPostQuery } from "@/redux/features/ride/ride.api";
import { postStatus, type IPost } from "@/types";
import { Button } from "@/components/ui/button"
import { 
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod"; 
import Loading from "../Loadin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";  
import { RiderPostStatusUpdateModal } from "@/components/modules/RiderPostStatusUpdateModal";

const searchSchema = z.object({
    search: z.string(),
});
const RideOversight = () => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const [searchTerm, setSearchTerm] = useState("");


    const { data, isLoading } = useGetAllRiderPostQuery({ page: currentPage, limit, searchTerm });
    const riderPosts = data?.data || [];
    const totalPage = data?.meta?.totalPage
        ? data.meta.totalPage
        : Math.ceil((data?.meta?.total || 0) / limit);

   
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

            <div className="my-5">
                <CardTitle className="flex items-center"><span className="mr-2"> ||</span> <span>All Rider Posts</span></CardTitle>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Body</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        riderPosts?.map((item: IPost, idx: string) => <TableRow key={idx}>
                            <TableCell className="space-y-2">
                                <p><span className="font-medium">Title :{" "}</span>{item?.title}</p>
                                <p><span className="font-medium">From :{" "}</span>{item?.from}</p>
                                <p><span className="font-medium">To :{" "}</span>{item?.to}</p>
                                <p className="flex"><span className="font-medium">Amount :{" "}</span><span className="flex items-center mx-1">{item?.amount} <TbCurrencyTaka className="text-[15px]" /></span></p>
                                {
                                    item.postStatus === postStatus.BLOCKED 
                                    ?<p><span className="font-medium">Status :{" "}</span><span className="text-red-500">{item?.postStatus}</span></p>
                                    :<p><span className="font-medium">Status :{" "}</span><span className="text-green-600">{item?.postStatus}</span></p> 
                                }  
                            </TableCell>
                            <TableCell className="flex justify-end">

                                <RiderPostStatusUpdateModal id={item?._id}></RiderPostStatusUpdateModal> 
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>

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

export default RideOversight;