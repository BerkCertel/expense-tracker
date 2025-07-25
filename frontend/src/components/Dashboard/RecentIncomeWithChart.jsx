import { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

function RecentIncomeWithChart({ data, totalIncome }) {
  const COLORS = ["#875CF5", "#FA2C37", "#4f39f6"];
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg"> Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label={"Total Income"}
        TotalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
}

export default RecentIncomeWithChart;
