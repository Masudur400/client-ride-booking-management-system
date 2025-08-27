import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table" 
import type { IRider } from "@/types";
import { TbCurrencyTaka } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import DeleteConfirmation from "@/components/modules/DeleteConfirmation";
import toast from "react-hot-toast";
import {
    Pagination,
    PaginationContent, 
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react";
import { useGetMyDriverPostQuery, useRemoveDriverMutation } from "@/redux/features/drive/driver.api";




const DriverTable = () => {
    const [currentPage, setCurrentPage] = useState(1);  
    const [limit] = useState(10);


    const { data, isLoading } = useGetMyDriverPostQuery({page: currentPage, limit})
    const MyRiderPosts = data?.data?.data
    const [removeDriver] = useRemoveDriverMutation()
    const totalPage = data?.data?.meta?.totalPage || 1; 

    const handleRemoveDriver = async (id: string) => {
        const toastId = toast.loading('removing...')
        try {
            const result = await removeDriver(id).unwrap()
            if (result.success) {
                toast.success('Remove post successfully.', { id: toastId })
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading) {
        return <p className="text-center mt-5">Loading...</p>
    }


    return (
        <div className="mb-10 w-full max-w-7xl mx-auto px-5">
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
                        MyRiderPosts?.map((item: IRider, idx:string) => <TableRow key={idx}>
                            <TableCell className="space-y-2">
                                <p><span className="font-medium">Title :{" "}</span>{item?.title}</p>
                                <p><span className="font-medium">From :{" "}</span>{item?.from}</p>
                                <p><span className="font-medium">To :{" "}</span>{item?.to}</p>
                                <p className="flex"><span className="font-medium">Amount :{" "}</span><span className="flex items-center mx-1">{item?.amount} <TbCurrencyTaka className="text-[15px]" /></span></p>
                            </TableCell>
                            <TableCell className="flex justify-end">
                                <DeleteConfirmation onConfirm={() => handleRemoveDriver(item?._id)}>
                                    <Button variant="destructive" className="w-fit"><MdDeleteForever /></Button>
                                </DeleteConfirmation> 
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>

            {totalPage > 1 && (
                <div className="flex justify-end mt-4">
                    <div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => setCurrentPage((prev) => prev - 1)}
                                        className={
                                            currentPage === 1
                                                ? "pointer-events-none opacity-50"
                                                : "cursor-pointer"
                                        }
                                    />
                                </PaginationItem>
                                {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                                    (page) => (
                                        <PaginationItem
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            <PaginationLink isActive={currentPage === page}>
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                )}
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => setCurrentPage((prev) => prev + 1)}
                                        className={
                                            currentPage === totalPage
                                                ? "pointer-events-none opacity-50"
                                                : "cursor-pointer"
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DriverTable;