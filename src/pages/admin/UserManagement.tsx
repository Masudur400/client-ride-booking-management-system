import { useGetAllUserQuery } from "@/redux/features/auth/auth.api";
import Loading from "../Loadin";
import { CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";  
import type { IUser } from "@/types";
import { UpdateUserRoleModal } from "@/components/modules/UpdateUserRoleModal";

 
const UserManagement = () => {

    const {data, isLoading} = useGetAllUserQuery(undefined)
    const allUsers = data?.data
    // console.log(allUsers);
    // console.log(data?.meta);


    if(isLoading){
        return  <Loading></Loading>
    }
    return (
        <div>
            <div className="my-5">
                <CardTitle className="flex items-center"><span className="mr-2"> ||</span> <span>All Users</span></CardTitle>
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
                        allUsers?.map((user: IUser, idx:string) => <TableRow key={idx}>
                            <TableCell className="space-y-2">
                                <p><span className="font-medium">Name :{" "}</span>{user?.name}</p>
                                <p><span className="font-medium">Email :{" "}</span>{user?.email}</p>
                                <p><span className="font-medium">Role :{" "}</span>{user?.role}</p>
                                 
                            </TableCell>
                            <TableCell className="flex justify-end">
                                 <UpdateUserRoleModal id={String(user?._id)}></UpdateUserRoleModal>
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>

        </div>
    );
};

export default UserManagement;