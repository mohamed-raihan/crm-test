import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { TrendingUp, Users, IndianRupee, PercentSquare } from "lucide-react";
// import './managerdashboard.css';

const StatsCard = ({ title, value, change, Icon, color }) => (
  <div className={`stats-card`}>
    <div className="stats-card-content">
      <div>
        <p className="stats-title">{title}</p>
        <p className="stats-value">{value}</p>
        <p className={`stats-change ${color}`}>{change}</p>
      </div>
      <div className={`stats-icon ${color}`}>
        <Icon className="icon" />
      </div>
    </div>
  </div>
);

const ChartCard = ({ children, className }) => (
  <div className={`chart-card ${className}`}>{children}</div>
);

const ManagerDashboard = () => {
  const salesData = [
    { month: "May", value: 15000 },
    { month: "Jun", value: 20000 },
    { month: "Jul", value: 15000 },
    { month: "Aug", value: 25000 },
    { month: "Sep", value: 18000 },
    { month: "Oct", value: 35000 },
    { month: "Nov", value: 30000 },
    { month: "Dec", value: 60000 },
  ];

  const orderData = [
    { month: "Jul", orders: 15 },
    { month: "Aug", orders: 20 },
    { month: "Sep", orders: 12 },
    { month: "Oct", orders: 25 },
    { month: "Nov", orders: 18 },
    { month: "Dec", orders: 28 },
  ];

  return (
    <div className="manager-dashboard">
      {/* Stats Cards */}
      <div className="stats-cards">
        <StatsCard
          title="Total Claims Processed"
          value="0"
          change="↓ 0% Since last month"
          Icon={TrendingUp}
          color="red"
        />
        <StatsCard
          title="New Policyholders"
          value="0"
          change="↑ 0% Since last week"
          Icon={Users}
          color="orange"
        />
        <StatsCard
          title="Premium Collected"
          value="0"
          change="↓ 0% Since yesterday"
          Icon={IndianRupee}
          color="yellow"
        />
        <StatsCard
          title="Claim Processing Efficiency"
          value="0"
          change="↑ 0% Since last month"
          Icon={PercentSquare}
          color="blue"
        />
      </div>

      {/* Charts Section */}
      <div className="charts">
        {/* Sales Value Chart */}
        <ChartCard className="sales-chart">
          <div className="chart-header">
            <h3>Premium Collected Over Time</h3>
            <div className="chart-buttons">
              <button className="chart-button">Month</button>
              <button className="chart-button">Week</button>
            </div>
          </div>
          <div className="chart-container">
            <LineChart width={600} height={300} data={salesData}>
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4F46E5"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </div>
        </ChartCard>

        {/* Total Orders Chart */}
        <ChartCard className="orders-chart">
          <h3>Claims Processed</h3>
          <div className="chart-container">
            <BarChart width={300} height={300} data={orderData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#FF6B6B" />
            </BarChart>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default ManagerDashboard;
