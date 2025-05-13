"use client"
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { DecodedUser } from "@/types/auth.types";
import { useGetMyMealProviderQuery } from "@/redux/features/mealProviders/mealProvidersApi";
import { useGetAllMealQuery } from "@/redux/features/meals/mealApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { PieChart, Pie, Cell, PieLabelRenderProps } from 'recharts';
const ProviderDashboard = () => {
    const userInfo = useAppSelector(selectCurrentUser) as DecodedUser;
    const { data: providerData } = useGetMyMealProviderQuery(userInfo?.id)
    const id = providerData?.data[0]?._id;
    console.log(id);
    const { data: mealData } = useGetAllMealQuery(id ? [{ name: 'providerId', value: id }] : skipToken)
    console.log(mealData);
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
        const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
        const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
        const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > Number(cx) ? 'start' : 'end'} dominantBaseline="central">
                {`${((percent ?? 0) * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <div>
            <h1 className="text-3xl text-green-900 text-center font-bold mt-6 mb-10">Meal Provider Dashboard</h1>
            <div className="grid md:grid-cols-3 gap-4 px-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md shadow-gray-400 p-6">
                    <div className=" flex justify-between w-full">
                        <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Orders</h4>
                        <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">1,234</p>

                    </div>
                    <PieChart width={200} height={200} className="mx-auto">
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md shadow-gray-400 p-6 flex flex-col justify-between w-full max-w-xs">
                    <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Revenue</h4>
                    <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">1,234</p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md shadow-gray-400 p-6 flex flex-col justify-between w-full max-w-xs">
                    <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Completed Orders</h4>
                    <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">1,234</p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md shadow-gray-400 p-6 flex flex-col justify-between w-full max-w-xs">
                    <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Average Order Value</h4>
                    <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">1,234</p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md shadow-gray-400 p-6 flex flex-col justify-between w-full max-w-xs">
                    <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Average Meal Rating</h4>
                    <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">1,234</p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md shadow-gray-400 p-6 flex flex-col justify-between w-full max-w-xs">
                    <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Customers</h4>
                    <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">1,234</p>
                </div>



            </div>
        </div>
    )
};

export default ProviderDashboard;



