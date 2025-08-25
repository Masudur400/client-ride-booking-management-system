import { useGetUserDashboardStatsQuery } from '@/redux/features/dashboard/dashboard.api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"; 
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import Loading from '../Loadin';

const UserDeshboard = () => {
    const { data, isLoading } = useGetUserDashboardStatsQuery(undefined);
    const dashBoardData = data?.data
    const totalBookings = dashBoardData?.totalBookings
    const completedBookings = dashBoardData?.completedBookings
    const pendingBookings = dashBoardData?.pendingBookings
    const cancelledBookings = dashBoardData?.cancelledBookings
    const chartData = [
        { name: "Completed", value: totalBookings },
        { name: "Pending", value: pendingBookings },
        { name: "Cancelled", value: cancelledBookings }, 
    ];

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div className="space-y-6 p-4">
            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Bookings</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">{totalBookings}</CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Completed</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold text-green-600">{completedBookings}</CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Pending</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold text-yellow-600">{pendingBookings}</CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Cancelled</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold text-red-600">{cancelledBookings}</CardContent>
                </Card>

            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Booking Status Overview</CardTitle>
                    <CardDescription>Visual representation of your bookings</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

        </div>
    );
};

export default UserDeshboard;