import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Filler } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const RevenueChart = ({
  monthlyRevenue,
}) => {

  const labels = monthlyRevenue.map(
    (item) =>
      `Month ${item._id.month}`
  );

  const revenueData =
    monthlyRevenue.map(
      (item) => item.revenue
    );


  const data = {
    labels,

    datasets: [
      {
        label: "Revenue",
        data: revenueData,
        borderColor: "#6D5DF6",
        backgroundColor:
          "rgba(109,93,246,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };


  return (
    <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Revenue Overview
      </h2>

      <Line
        data={data}
        options={options}
      />
    </div>
  );
};

export default RevenueChart;