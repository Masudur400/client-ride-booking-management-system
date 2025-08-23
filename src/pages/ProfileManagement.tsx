import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import Avatar from 'react-avatar';
import Loading from './Loadin';
import { Button } from '@/components/ui/button';
import { Role } from '@/constants/role';
import { TbHandMove } from "react-icons/tb";
import { BiRightArrowAlt } from "react-icons/bi"; 
import { UpdateInfoModal } from '@/components/modules/UpdateInfoModal';



const ProfileManagement = () => {

    const { data, isLoading } = useUserInfoQuery(undefined)
    if (isLoading) {
        return <Loading></Loading>
    } 

    return (
        <div>
            <div className='md:flex items-center gap-10'>
                <Avatar name={data?.data?.name?.charAt(0)} src={'preview'} alt='img' size="300" className='rounded-full' />
                <div className='space-y-2'>
                    <p>
                        <span className="font-medium">Name : </span>
                        {data?.data?.name}
                    </p>
                    <p>
                        <span className="font-medium">Email : </span>
                        {data?.data?.email}
                    </p>
                    {
                        data?.data?.phone && 
                        <p>
                        <span className="font-medium">Email : </span>
                        {data?.data?.phone}
                    </p>
                    }
                    {
                        data?.data?.address && 
                        <p>
                        <span className="font-medium">Email : </span>
                        {data?.data?.address}
                    </p>
                    }
                    {
                        data?.data?.isVerified ? <p>
                        <span className="font-medium">Verified : </span>
                         <span className='text-green-500'>Yes</span>
                    </p> : <p>
                        <span className="font-medium">Verified : </span>
                         <span className='text-red-500'>No</span>
                    </p>
                    }
                    <p>
                        <span className="font-medium">Role : </span>
                        {data?.data?.role}
                    </p>
                    <div className='flex-col flex'>
                        <Button  variant="link" className='text-sm w-fit p-0 text-red-500  hover:text-red-400 flex gap-1 cursor-pointer'><span>Change Password</span><TbHandMove /></Button> 
                        <UpdateInfoModal></UpdateInfoModal>
                        {
                            data?.data?.role !== Role.SUPER_ADMIN && <Button  variant="link" className='text-sm p-0 flex gap-0 justify-center cursor-pointer'><span>Send Request For Role as Rider/Driver</span><BiRightArrowAlt className='mt-1'/></Button>
                        }
                    </div> 
                </div>
            </div>
        </div>
    );
};

export default ProfileManagement;