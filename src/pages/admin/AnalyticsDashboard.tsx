/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useGetDashboardStatsQuery } from "@/redux/features/dashboard/dashboard.api";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid, Legend } from "recharts";
import Loading from "../Loadin";

const AnalyticsDashboard = () => {
  const { data, isLoading } = useGetDashboardStatsQuery(undefined);
  const stats = data?.data;

  if (isLoading) return <Loading />;

  // Chart Data
  const userChartData = stats?.users?.byRole?.map((role: any) => ({
    role: role._id,
    count: role.count,
  }));

  const bookingChartData = stats?.bookings?.byStatus?.map((status: any) => ({
    status: status._id,
    count: status.count,
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Riders</CardTitle>
            <CardDescription>
              {stats?.users?.byRole?.find((r: any) => r._id === "RIDER")?.count || 0}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Total Rider Posts: {stats?.riders?.total}</p>
            <p>Last 7 Days Posts: {stats?.riders?.newLast7Days}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Drivers</CardTitle>
            <CardDescription>
              {stats?.users?.byRole?.find((r: any) => r._id === "DRIVER")?.count || 0}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Total Driver Posts: {stats?.drivers?.total}</p>
            <p>Last 7 Days Posts: {stats?.drivers?.newLast7Days}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Bookings</CardTitle>
            <CardDescription>{stats?.bookings?.total}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Last 7 Days: {stats?.bookings?.last7Days}</p>
            <p>Last 30 Days: {stats?.bookings?.last30Days}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>{stats?.users?.total}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Last 7 Days: {stats?.users?.newLast7Days}</p>
            <p>Last 30 Days: {stats?.users?.newLast30Days}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users by Role */}
        <Card>
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" tick={{ fontSize: 12, fill: "#555" }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bookings by Status */}
        <Card>
          <CardHeader>
            <CardTitle>Bookings by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" tick={{ fontSize: 12, fill: "#555" }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
