"use client";

import React, { useEffect, useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Filler,
  Legend 
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IndianRupee, ShoppingBag, PackageSearch, AlertCircle } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading dashboard...</div>;
  }

  if (!stats || stats.error) {
    return <div className="text-red-500">Failed to load statistics.</div>;
  }

  const chartData = {
    labels: stats.chart.labels,
    datasets: [
      {
        fill: true,
        label: 'Orders',
        data: stats.chart.data,
        borderColor: 'rgb(20, 26, 47)', // Primary
        backgroundColor: 'rgba(20, 26, 47, 0.1)',
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-heading text-slate-800">Dashboard Overview</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-medium">Total Revenue</h3>
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">₹{stats.summary.totalRevenue.toLocaleString()}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-medium">Total Orders</h3>
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.summary.totalOrders}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-medium">Total Products</h3>
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              <PackageSearch className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.summary.totalProducts}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-medium">Pending Orders</h3>
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.summary.pendingOrdersCount}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-xl font-bold font-heading mb-6">Order Volume (Last 30 Days)</h2>
        <div className="h-[400px]">
          <Line options={chartOptions} data={chartData} />
        </div>
      </div>
    </div>
  );
}
