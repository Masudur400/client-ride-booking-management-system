import { useGetAllApplyQuery, useUpdateApplyMutation } from "@/redux/features/applyForRole/apply.api";
import Loading from "../Loadin";
import { CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { IApply } from "@/types";
import { Button } from "@/components/ui/button";
import { GiConfirmed } from "react-icons/gi";
import toast from "react-hot-toast";


const ManageRoleApplies = () => {

    const { data, isLoading } = useGetAllApplyQuery(undefined)
    const applies = data?.data
    const [approvedRole] = useUpdateApplyMutation()

    const handleApproved = async (id: string) => {
        console.log(id);
        try {
            const result = await approvedRole({ id, isApproved: true }).unwrap()
            if (result.success) {
                toast.success('updated successfully')
            }
        } catch (error) {
            console.log('update failed', error);
        }
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="my-5">
                <CardTitle className="flex items-center"><span className="mr-2"> ||</span> <span>All Applies for Role</span></CardTitle>

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
                        applies?.map((apply: IApply, idx: string) => <TableRow key={idx}>
                            <TableCell className="space-y-2">
                                <p><span className="font-medium">Name :{" "}</span>{apply?.userData?.name}</p>
                                <p><span className="font-medium">Email :{" "}</span>{apply?.userData?.email}</p>
                                <p>This User ({apply?.userData?.name}) Wants to change her role as <span className="font-medium">{apply?.want}</span></p>
                            </TableCell>
                            <TableCell className="flex justify-end">
                                <Button disabled={apply?.isApproved} onClick={() => handleApproved(apply?._id)} variant={"outline"} className="text-green-500 border border-green-500"><GiConfirmed /></Button>
                                {/* <UpdateUserRoleModal id={String(user?._id)}></UpdateUserRoleModal> */}
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
            {applies?.length < 1 && <p>No data available</p>}
        </div>
    );
};

export default ManageRoleApplies;