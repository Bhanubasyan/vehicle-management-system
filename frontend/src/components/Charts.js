import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis,
  CartesianGrid, Tooltip
} from "recharts";

function ChartBox({ vehicles }) {

  // ✅ STATUS BASED PIE (FIXED)
  const statusCount = {};

  vehicles.forEach(v => {
    if (!v.status) return;
    statusCount[v.status] = (statusCount[v.status] || 0) + 1;
  });

  const statusData = Object.keys(statusCount).map(key => ({
    name: key,
    value: statusCount[key]
  }));

  const COLORS = {
    "Aging": "#ff4d4f",
    "In Stock": "#52c41a",
    "Sold": "#1890ff",
    "Reserved": "#faad14"
  };

  // ✅ MAKE-WISE (FIXED)
  const makeMap = {};

  vehicles.forEach(v => {
    if (!v.make) return;
    makeMap[v.make] = (makeMap[v.make] || 0) + 1;
  });

  const makeData = Object.keys(makeMap).map(key => ({
    make: key,
    count: makeMap[key]
  }));

  // ✅ YEAR-WISE (FIXED + SORTED)
  const yearMap = {};

  vehicles.forEach(v => {
    if (!v.year) return;
    yearMap[v.year] = (yearMap[v.year] || 0) + 1;
  });

  const yearData = Object.keys(yearMap)
    .sort((a, b) => a - b) // 🔥 sort years
    .map(year => ({
      year,
      count: yearMap[year]
    }));

  return (
    <div className="chart-grid">

      {/* 🔴 Pie */}
      <div className="chart-card">
        <h4>Status</h4>
        <PieChart width={250} height={250}>
          <Pie data={statusData} dataKey="value" outerRadius={80}>
            {statusData.map((entry, index) => (
              <Cell key={index} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* 🔵 Make */}
      <div className="chart-card">
        <h4>By Make</h4>
        <BarChart width={300} height={250} data={makeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="make" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#1890ff" />
        </BarChart>
      </div>

      {/* 🟣 Year */}
      <div className="chart-card">
        <h4>By Year</h4>
        <BarChart width={300} height={250} data={yearData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>

    </div>
  );
}

export default ChartBox;