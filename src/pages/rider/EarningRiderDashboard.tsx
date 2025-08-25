import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useGetRiderDashboardStatsQuery } from "@/redux/features/dashboard/dashboard.api";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import Loading from "../Loadin";
import { TbCurrencyTaka } from "react-icons/tb";

const EarningRiderDashboard = () => {

    const { data, isLoading } = useGetRiderDashboardStatsQuery(undefined);
    const stats = data?.data;



    const totalBookings= stats?.totalBookings
    const completedBookings= stats?.completedBookings
    const pendingBookings= stats?.pendingBookings
    const cancelledBookings= stats?.cancelledBookings
    const totalEarnings= stats?.totalEarnings

    // Chart data
    const chartData = [
        { name: "Completed", value: completedBookings },
        { name: "Pending", value: pendingBookings },
        { name: "Cancelled", value: cancelledBookings },
    ];

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div className="space-y-6 p-4">
            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card>
                    <CardHeader><CardTitle>Total Bookings</CardTitle></CardHeader>
                    <CardContent className="text-2xl font-bold">{totalBookings}</CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Completed</CardTitle></CardHeader>
                    <CardContent className="text-2xl font-bold text-green-600">{completedBookings}</CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Pending</CardTitle></CardHeader>
                    <CardContent className="text-2xl font-bold text-yellow-600">{pendingBookings}</CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Cancelled</CardTitle></CardHeader>
                    <CardContent className="text-2xl font-bold text-red-600">{cancelledBookings}</CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Total Earnings</CardTitle></CardHeader>
                    <CardContent className="text-2xl font-bold text-purple-600 flex items-center">{totalEarnings || 0}<TbCurrencyTaka className="text-[27px]" /></CardContent>
                </Card>
            </div>

            {/* Line Chart */}
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

export default EarningRiderDashboard;