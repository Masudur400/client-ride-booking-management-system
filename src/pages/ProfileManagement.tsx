/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import Avatar from 'react-avatar';
import Loading from './Loadin';
import { Role } from '@/constants/role';
import { UpdateInfoModal } from '@/components/modules/UpdateInfoModal';
import { ChangePasswordModal } from '@/components/modules/ChangePasswordModal';
import { SendRoleRequestModal } from '@/components/modules/SendRoleRequestModal';
import { useCancelRequestMutation, useMySendRequestQuery } from '@/redux/features/applyForRole/apply.api';
import { BiRightArrowAlt } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';




const ProfileManagement = () => {

    const { data, isLoading } = useUserInfoQuery(undefined)
    const user = data?.data
    const { data: mySendRequest, isLoading: requestLoading } = useMySendRequestQuery(undefined)
    const myRequest = mySendRequest?.data[0] 
    const [cancelRequest] = useCancelRequestMutation()
    if (isLoading || requestLoading) {
        return <Loading></Loading>
    }

    const handleCancel = async () => { 
        try {
            const result = await cancelRequest(myRequest?._id)
            if(result.data.success){
                toast.success('Application cancelled successfully')
            } 
        } catch (error : any) {
            if(error){
                toast.error(error?.data?.message)
            }
        }
    }


    return (
        <div>
            <div className='md:flex items-center gap-10'>
                <Avatar name={user?.name?.charAt(0)} src={'preview'} alt='img' size="300" className='rounded-full' />
                <div className='space-y-2'>
                    <p className='flex items-center gap-1'>
                        <p>
                        <span className="font-medium">Name : </span>
                        {user?.name}
                    </p>  <UpdateInfoModal></UpdateInfoModal>
                    </p>
                    <p>
                        <span className="font-medium">Email : </span>
                        {user?.email}
                    </p> 
                    {
                        user?.isVerified ? <p>
                            <span className="font-medium">Verified : </span>
                            <span className='text-green-500'>Yes</span>
                        </p> : <p>
                            <span className="font-medium">Verified : </span>
                            <span className='text-red-500'>No</span>
                        </p>
                    }
                    <p>
                        <span className="font-medium">Role : </span>
                        {user?.role}
                    </p>
                    <div className='flex-col flex'>
                        <ChangePasswordModal></ChangePasswordModal>
                       
                        <div>

                            {
                                user?.role !== Role.SUPER_ADMIN && user?.role !== Role.DRIVER && user?.role !== Role.RIDER && !myRequest &&
                                <SendRoleRequestModal></SendRoleRequestModal>
                            }
                            {
                                myRequest &&
                                <Button onClick={handleCancel} variant="link" className='text-sm p-0 flex gap-0 justify-center cursor-pointer'><span>Cancel Request</span><BiRightArrowAlt className='mt-1' /></Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileManagement;